export const GET_HOME_PAGE_META = `
  *[_type == "page" && slug.current == "home-page"][0] {
    _id,
    slug,
    metaTitle,
    metaDescription,
    metaKeywords
  }
`;

export const GET_HOME_PAGE = `
  *[_type == "page" && slug.current == "home-page"][0] {
    _id,
    title,
    slug,
    pageType,
    layout[]->{
      _id,
      slug,
      blockType,
      title,
      description,
      image,
      customAttributes,
      listItems[]{
        title,
        slug,
        description,
        image
      },
      "categories": categoryBlock[]->{
        _id,
        slug,
      }
    },
    variants[]->{
      _id,
      title,
      slug
    }
  }
`;

export const GET_CATEGORIES_BY_PARENT_CATEGORY = (slug: string) => `
  *[_type == "category" && parentCategory->slug.current == "${slug}"] {
    _id,
    name,
    slug,
    description
  }
`;

export const GET_CATEGORIES_BY_PARENT_CATEGORIES = (slugs: string[]) => `
  *[_type == "category" && parentCategory->slug.current in ${JSON.stringify(slugs)}] {
    _id,
    name,
    slug,
    description,
    parentCategory-> {
      _id,
      slug,
    }
  }
`;

export const GET_PRODUCTS_BY_PARENT_CATEGORIES = (slugs: string[]) => `
  *[_type == "product" && references(
    *[_type == "category" && parentCategory->slug.current in ${JSON.stringify(slugs)}]._id
  )] {
    _id,
    name,
    slug,
    price,
    "imageUrl": image.asset->url,
    categories[]-> {
      _id,
      name,
      slug,
      customAttributes
    },
    features,
    customPrices
  }
`;
