import {client} from "@/sanity/lib/client";
import {CategoryWithSlug} from "@/types/sanity-types";
import {BANNERS_QUERY, CATEGORIES_QUERY, FEATURED_FOODS_QUERY} from "./query";
import {Banner, Food} from "@/sanity.types";

// Function to fetch all the Banners
export async function getBanners(): Promise<Banner[]> {
  return client.fetch(BANNERS_QUERY);
}

// Get featured food (limited to 8)
export async function getFeaturedFoods(): Promise<Food[]> {
  return client.fetch(FEATURED_FOODS_QUERY);
}

// Get active categories ordered by display order
export async function getActiveCategories(): Promise<CategoryWithSlug[]> {
  return client.fetch(CATEGORIES_QUERY);
}
