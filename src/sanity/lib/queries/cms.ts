import { defineQuery } from 'next-sanity';

export const GET_PAGE_META = defineQuery(`
  *[_type == "page" && slug.current == $name][0] {
    _id,
    slug,
    metaTitle,
    metaDescription,
    metaKeywords
  }
`);

export const GET_PAGE = defineQuery(`
  *[_type == "page" && slug.current == $name][0] {
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
`);

export const GET_POSTS = defineQuery(`
  *[_type == "post"] {
    _id,
    title,
    slug,
    publishedDate,
    excerpt,
    "imageUrl": image.asset->url,
    content,
    tags
  }
`);

export const GET_TESTIMONIALS = defineQuery(`
  *[_type == "testimonial"]{
    name,
    slug,
    testimonialText,
    "imageUrl": image.asset->url,
    rating,
    dateTime,
    product->{
      name,
      slug
    }
  }
`);

export const GET_HEADER_LAYOUT = defineQuery(`
  *[_type == "page" && slug.current == "header-layout"][0] {
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
`);

export const GET_FOOTER_LAYOUT = defineQuery(`
  *[_type == "page" && slug.current == "footer-layout"][0] {
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
`);

export const GET_CATEGORIES_BY_PARENT_CATEGORY = defineQuery(`
  *[_type == "category" && parentCategory->slug.current == $slug] {
    _id,
    name,
    slug,
    description
  }
`);

export const GET_CATEGORIES_BY_PARENT_CATEGORIES = defineQuery(`
  *[_type == "category" && parentCategory->slug.current in $slugs] {
    _id,
    name,
    slug,
    description,
    parentCategory-> {
      _id,
      slug,
    }
  }
`);

export const GET_PRODUCTS_BY_PARENT_CATEGORIES = defineQuery(`
  *[_type == "product" && references(
    *[_type == "category" && parentCategory->slug.current in $categories]._id
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
`);

export const GET_CONTENT_BLOCK_BY_SLUG = defineQuery(`
  *[_type == "contentBlock" && slug.current == $slug][0] {
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
`);

export const GET_PRODUCT_BY_SLUG = defineQuery(`
  *[_type == "product" && slug.current == $slug && productType == $type][0]{
    name,
    productType,
    slug,
    price,
    customPrices,
    availableDate,
    duration,
    description,
    "imageUrl": image.asset->url,
    landArea,
    averageClimate,
    travelDuration,
    peakSeason,
    midSeason,
    monsoonSeason,
    travelGuide,
    bookingUrl,
    features,
    overview,
    itinerary[]{
      title,
      "imageUrls": images[].asset->url,
      description
    },
    accommodation,
    thingsToNote,
    tourSummary[]{
      "imageUrl": image.asset->url,
      isActive,
      title,
      description
    },
    categories[]-> {
      _id,
      name,
      slug,
      customAttributes
    }
  }
`);

export const GET_PRODUCTS_BY_TYPE = defineQuery(`
  *[_type == "product" && productType == $type]{
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
`);

export const GET_POST_BY_SLUG = defineQuery(`
  *[_type == "post" && slug.current == $slug][0]{
    title,
    slug,
    price,
    publishedDate,
    excerpt,
    "imageUrl": image.asset->url,
    content,
    tags,
  }
`);

export const GET_PRODUCTS_BY_CATEGORY = defineQuery(`
  *[_type == "product" && references(*[_type == "category" && slug.current == $categorySlug]._id)] {
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
`);
