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
      }
    },
    variants[]->{
      _id,
      title,
      slug
    }
  }
`;
