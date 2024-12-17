import {
  BlockContentIcon,
  CommentIcon,
  DashboardIcon,
  DocumentIcon,
  DocumentTextIcon,
  ImageIcon,
  ImagesIcon,
  PackageIcon,
  StringIcon,
  TagIcon,
} from '@sanity/icons';
import type { StructureResolver } from 'sanity/structure';

export const structure: StructureResolver = (S) =>
  S.list()
    .id('root')
    .title('Content')

    .items([
      S.listItem()
        .title('Pages')
        .icon(DocumentIcon)
        .schemaType('page')
        .child(S.documentTypeList('page').title('All Pages')),

      S.listItem()
        .title('Content Blocks')
        .schemaType('contentBlock')
        .icon(BlockContentIcon)
        .child(S.documentTypeList('contentBlock').title('All Content Blocks')),

      S.divider(),

      S.listItem()
        .title('Testimonial')
        .icon(CommentIcon)
        .schemaType('testimonial')
        .child(S.documentTypeList('testimonial').title('All Testimonials')),
      S.listItem()
        .title('Post')
        .schemaType('post')
        .icon(StringIcon)
        .child(S.documentTypeList('post').title('All Posts')),

      S.listItem()
        .title('Package Lists')
        .icon(PackageIcon)
        .child(
          S.list()
            .title('Package Lists')
            .items([
              // Products
              S.listItem()
                .title('Products')
                .icon(PackageIcon)
                .child(
                  S.list()
                    .title('Products')
                    .items([
                      S.listItem()
                        .title('All Products')
                        .schemaType('product')
                        .child(S.documentTypeList('product').title('All Products')),

                      S.listItem()
                        .title('Tour')
                        .schemaType('product')
                        .child(S.documentList().title('Tour').filter('_type == "product" && productType == "tour"')),

                      S.listItem()
                        .title('Transport')
                        .schemaType('product')
                        .child(
                          S.documentList().title('Transport').filter('_type == "product" && productType == "transport"')
                        ),

                      S.listItem()
                        .title('Destination')
                        .schemaType('product')
                        .child(
                          S.documentList()
                            .title('Destination')
                            .filter('_type == "product" && productType == "destination"')
                        ),

                      S.listItem()
                        .title('Ticket')
                        .schemaType('product')
                        .child(
                          S.documentList().title('Ticket').filter('_type == "product" && productType == "ticket"')
                        ),
                    ])
                ),

              // Categories
              S.listItem()
                .title('Categories')
                .icon(TagIcon)
                .schemaType('category')
                .child(S.documentTypeList('category').title('All Categories')),
            ])
        ),

      S.divider(),

      S.listItem()
        .title('Assets')
        .icon(ImageIcon)
        .child(
          S.list()
            .title('All Assets')
            .items([
              S.listItem()
                .title('Images')
                .icon(ImagesIcon)
                .child(S.documentList().title('All Images').filter('_type == "sanity.imageAsset"')),
              S.listItem()
                .icon(DocumentTextIcon)
                .title('Files')
                .child(S.documentList().title('All Files').filter('_type == "sanity.fileAsset"')),
            ])
        ),

      S.listItem()
        .title('Manage Assets')
        .icon(DashboardIcon)
        .child(
          S.component()
            .title('Assets Manager opened in a new tab')
            .component(() => {
              window.open('/studio/media');
              return null;
            })
        ),
    ]);
