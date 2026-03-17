import {groq} from "next-sanity";

export const BANNERS_QUERY = groq`*[_type == "banner" && active == true] | order(order asc ){
    _id,
    title,
    description,
    bannerImage,
    buttonTitle,
    buttonHref,
    order
    
}`;

export const FEATURED_FOODS_QUERY = groq`*[_type == "food" && featured == true && available == true] | order(order asc) [0...8] {
    _id,
    name,
    "slug": slug.current,
    description,
    basePrice,
    images,
    preparationTime,
    spiceLevel,
    available,
    featured,
    averageRating,
    totalReviews,
    category->{
      _id,
      name,
      "slug": slug.current
    },
    varieties[]->{
        _id,
      name
    }
}`;
