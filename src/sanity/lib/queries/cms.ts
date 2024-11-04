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
      "imageUrl": image.asset->url,
      customAttributes,
      listItems[]{
        title,
        slug,
        description,
        image,
        "imageUrl": image.asset->url,
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

export const GET_MENU_LAYOUT = `
  *[_type == "page" && slug.current == "menu-layout"][0] {
    _id,
    title,
    slug,
    "imageUrl": image.asset->url,
    description,
    layout[]->{
      _id,
      slug,
      blockType,
      title,
      description,
      image,
      "imageUrl": image.asset->url,
      customAttributes,
      listItems[]{
        title,
        slug,
        description,
        image,
        "imageUrl": image.asset->url,
      },
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

export const GET_CONTENT_BLOCK_BY_SLUG = (slug: string) => `
  *[_type == "contentBlock" && slug.current == "${slug}"][0] {
    _id,
    slug,
    blockType,
    title,
    description,
    image,
    "imageUrl": image.asset->url,
    customAttributes,
    listItems[]{
      title,
      slug,
      description,
      image,
      "imageUrl": image.asset->url,
    },
    "categories": categoryBlock[]->{
      _id,
      slug,
    }
  }
`;
