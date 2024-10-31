import type { StructureResolver } from 'sanity/structure';
import { TagIcon, PackageIcon, UserIcon, DocumentIcon, DashboardIcon } from '@sanity/icons';

export const structure: StructureResolver = (S) =>
  S.list()
    .id('root')
    .title('Content')
    .items([
      // CMS (Pages) Group
      S.listItem()
        .title('CMS')
        .icon(DocumentIcon)
        .child(
          S.list()
            .title('Pages')
            .items([
              S.listItem().title('Pages').schemaType('page').child(S.documentTypeList('page').title('All Pages')),

              S.listItem()
                .title('Content Blocks')
                .schemaType('contentBlock')
                .child(S.documentTypeList('contentBlock').title('All Content Blocks')),
            ])
        ),

      S.divider(),

      // Mini CRM Group
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
                .child(
                  S.list()
                    .title('Categories')
                    .items([
                      S.listItem()
                        .title('All Categories')
                        .schemaType('category')
                        .child(S.documentTypeList('category').title('All Categories')),
                    ])
                ),

              // Customers
              S.listItem()
                .title('Customers')
                .icon(UserIcon)
                .child(
                  S.list()
                    .title('Customers')
                    .items([
                      S.listItem()
                        .title('All Customers')
                        .schemaType('customer')
                        .child(S.documentTypeList('customer').title('All Customers')),

                      S.listItem()
                        .title('Customers by Nationality')
                        .schemaType('customer')
                        .child(
                          S.documentList()
                            .title('Customers by Nationality')
                            .filter('_type == "customer" && nationality == $nationality')
                            .params({ nationality: 'malaysian' })
                        ),

                      S.listItem()
                        .title('Customers with Travel History')
                        .schemaType('customer')
                        .child(
                          S.documentList()
                            .title('Customers with Travel History')
                            .filter('_type == "customer" && travelHistory != null')
                        ),
                    ])
                ),

              // Point Rules
              S.listItem()
                .title('Point Rules')
                .icon(DashboardIcon)
                .child(
                  S.list()
                    .title('Point Rules')
                    .items([
                      S.listItem()
                        .title('All Point Rules')
                        .schemaType('pointRule')
                        .child(S.documentTypeList('pointRule').title('All Point Rules')),

                      S.listItem()
                        .title('Specific Point Rule')
                        .schemaType('pointRule')
                        .child(
                          S.documentList()
                            .title('Specific Point Rule')
                            .filter('_type == "pointRule" && pointsPerDollar >= 1')
                        ),
                    ])
                ),
            ])
        ),

      S.divider(),
    ]);
