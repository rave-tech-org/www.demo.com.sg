// migration.ts
import { createClient, SanityDocument } from 'next-sanity';
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

const oldClient = createClient({
  projectId: 'z32ezmgu',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-10-24',
  token: 'skEvgMI4mjUJANLnyNtouqEWfzOTtcyg66S99uj6ru64Vk5tPdLYTsEiunEVQgsAhRNMxfdb4CzqRIUkPIB1KS3dDq3zVh3cLZYzaf6MSH95YfDQI5hmcLl362xpTFrcrSELILTDh1EofMOta6CvPvBQ50znqNPhGLLSwMN4Lvl03xSCKtRU'
});

const newClient = createClient({
  projectId: 'kv8wj1mc',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-10-24',
  token: 'skTyiQqJnC2NkNM8ivkq48GyAbuhaSyKcjfAup3UAOjbQOea5Jojz5pk6xNBKagWibzaG6PjpIi4EiYlXA9MjiA4mxJgqcc9HLO35W9yApupeoeXWrTcRoFwT6yhCOGrukt1mbK9Hs8MZAw3QRMmxih7vldqchsofTQ4eK0wYKyhg6uEDte4'
});

interface AssetDocument extends SanityDocument {
  url?: string;
  path?: string;
}

// Create a Map to store asset references
const assetMap = new Map<string, string>();

// Function to download asset
async function downloadAsset(url: string, assetId: string): Promise<string> {
  const response = await fetch(url);
  const buffer = await response.buffer();
  
  // Create temp directory if it doesn't exist
  const tempDir = path.join(__dirname, 'temp');
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
  }
  
  const filePath = path.join(tempDir, assetId);
  fs.writeFileSync(filePath, buffer);
  
  return filePath;
}

// Function to migrate assets
async function migrateAssets() {
  console.log('Starting asset migration...');
  
  try {
    // Fetch all image assets
    const imageQuery = '*[_type == "sanity.imageAsset"]';
    const images: AssetDocument[] = await oldClient.fetch(imageQuery);
    
    console.log(`Found ${images.length} images to migrate`);
    
    // Fetch all file assets
    const fileQuery = '*[_type == "sanity.fileAsset"]';
    const files: AssetDocument[] = await oldClient.fetch(fileQuery);
    
    console.log(`Found ${files.length} files to migrate`);
    
    // Migrate images
    for (const [index, image] of images.entries()) {
      try {
        if (image.url) {
          console.log(`Migrating image ${index + 1}/${images.length}: ${image._id}`);
          
          // Download the asset
          const filePath = await downloadAsset(image.url, image._id);
          
          // Upload to new project
          const newAsset = await newClient.assets.upload('image', fs.createReadStream(filePath));
          
          // Store the reference mapping
          assetMap.set(image._id, newAsset._id);
          
          // Clean up temp file
          fs.unlinkSync(filePath);
          
          console.log(`Successfully migrated image: ${image._id}`);
        }
      } catch (error) {
        console.error(`Failed to migrate image ${image._id}:`, error);
      }
    }
    
    // Migrate files
    for (const [index, file] of files.entries()) {
      try {
        if (file.url) {
          console.log(`Migrating file ${index + 1}/${files.length}: ${file._id}`);
          
          // Download the asset
          const filePath = await downloadAsset(file.url, file._id);
          
          // Upload to new project
          const newAsset = await newClient.assets.upload('file', fs.createReadStream(filePath));
          
          // Store the reference mapping
          assetMap.set(file._id, newAsset._id);
          
          // Clean up temp file
          fs.unlinkSync(filePath);
          
          console.log(`Successfully migrated file: ${file._id}`);
        }
      } catch (error) {
        console.error(`Failed to migrate file ${file._id}:`, error);
      }
    }
    
    console.log('Asset migration completed');
  } catch (error) {
    console.error('Asset migration failed:', error);
    throw error;
  }
}

// Function to update asset references in a document
function updateAssetRefs(doc: any): any {
  if (Array.isArray(doc)) {
    return doc.map(item => updateAssetRefs(item));
  }
  
  if (doc && typeof doc === 'object') {
    const updated = { ...doc };
    
    for (const [key, value] of Object.entries(updated)) {
      if (value && typeof value === 'object') {
        if (value._type === 'image' && value.asset && value.asset._ref) {
          const newAssetId = assetMap.get(value.asset._ref);
          if (newAssetId) {
            updated[key] = {
              ...value,
              asset: { _type: 'reference', _ref: newAssetId }
            };
          }
        } else if (value._type === 'file' && value.asset && value.asset._ref) {
          const newAssetId = assetMap.get(value.asset._ref);
          if (newAssetId) {
            updated[key] = {
              ...value,
              asset: { _type: 'reference', _ref: newAssetId }
            };
          }
        } else {
          updated[key] = updateAssetRefs(value);
        }
      }
    }
    
    return updated;
  }
  
  return doc;
}

// Main migration function
async function migrate() {
  const tempDir = path.join(__dirname, 'temp');
  
  try {
    console.log('Starting migration...');
    
    // Create temp directory
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }
    
    // First migrate all assets
    await migrateAssets();
    
    // Then migrate documents
    const query = '*[_type != "sanity.imageAsset" && _type != "sanity.fileAsset" && _type != "sanity.system.document"]';
    const documents: SanityDocument[] = await oldClient.fetch(query);
    
    console.log(`Found ${documents.length} documents to migrate`);
    
    // Create transaction for batch operations
    const transaction = newClient.transaction();
    
    for (const [index, doc] of documents.entries()) {
      try {
        console.log(`Migrating document ${index + 1}/${documents.length}: ${doc._id}`);
        
        // Prepare document
        const { _rev, _createdAt, _updatedAt, ...updatedDoc } = doc;
        
        // Update asset references
        const docWithUpdatedRefs = updateAssetRefs(updatedDoc);
        
        // Add to transaction
        transaction.createOrReplace(docWithUpdatedRefs);
        
        // Commit every 100 documents
        if ((index + 1) % 100 === 0) {
          await transaction.commit();
          console.log(`Committed batch of documents (${index + 1}/${documents.length})`);
        }
      } catch (error) {
        console.error(`Failed to migrate document ${doc._id}:`, error);
      }
    }
    
    // Commit any remaining documents
    await transaction.commit();
    
    console.log('Migration completed successfully');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    // Clean up temp directory
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true });
    }
  }
}

// Run the migration
migrate().catch(console.error);