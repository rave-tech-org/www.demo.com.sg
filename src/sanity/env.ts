export const apiVersion = process.env.SANITY_STUDIO_SANITY_API_VERSION || '2024-10-21';

console.log('ENV Project ID:', process.env.SANITY_STUDIO_SANITY_PROJECT_ID);
console.log('ENV Dataset:', process.env.SANITY_STUDIO_SANITY_DATASET);

// export const dataset = assertValue(
//   process.env.SANITY_STUDIO_SANITY_DATASET,
//   'Missing environment variable: SANITY_STUDIO_SANITY_DATASET'
// );

// export const projectId = assertValue(
//   process.env.SANITY_STUDIO_SANITY_PROJECT_ID,
//   'Missing environment variable: SANITY_STUDIO_SANITY_PROJECT_ID'
// );

// function assertValue<T>(v: T | undefined, errorMessage: string): T {
//   if (v === undefined) {
//     throw new Error(errorMessage);
//   }

//   return v;
// }
