import type {Restaurant} from "@/sanity.types";
import {client} from "@/sanity/lib/client";
import {urlFor} from "@/sanity/lib/image";
import {Clock3, MapPin, Star, Utensils} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {Badge} from "../ui/badge";
import {Card, CardContent} from "../ui/card";

const query = `*[_type == "restaurant" && isFeatured == true]{
...
}`;

type FeaturedRestaurant = {
  _id: string;
  name?: string;
  description?: string;
  image?: Restaurant["image"];
  rating?: number;
  deliveryFee?: number;
  estimatedDeliveryTime?: number;
  slug?: Restaurant["slug"];
  location?: Restaurant["location"];
  isActive?: boolean;
  minimumOrder?: number;
  totalReviews?: number;
  categoriesCount?: number;
  foodItemsCount?: number;
};

const FeaturedRestaurants = async () => {
  const restaurants = await client.fetch<FeaturedRestaurant[]>(query);

  if (restaurants.length === 0) {
    return null;
  }
  return (
    <section className="py-10 lg:py-16 bg-muted/30 p-5">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            FeaturedRestaurants
          </h2>
          <p className="text-muted-foreground mt-2">
            Hand-picked favorites just for you
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {restaurants.map((restaurant) => (
          <Link
            key={restaurant._id}
            href={
              restaurant.slug ?
                `/restaurants/${restaurant?.slug?.current}`
              : "/restaurants"
            }>
            <Card className="overflow-hidden py-0 h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hoverEffect">
              <div className="relative h-48 w-full overflow-hidden bg-muted">
                {restaurant.image ?
                  <Image
                    src={urlFor(restaurant?.image).width(900).height(600).url()}
                    alt={restaurant?.name || "Restaurant image"}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                : <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                    No Image Available
                  </div>
                }

                <Badge
                  variant={restaurant?.isActive ? "default" : "destructive"}
                  className={`absolute right-3 top-3 ${
                    restaurant?.isActive ?
                      "bg-green-600 text-white hover:bg-green-600"
                    : "bg-red-600 text-white hover:bg-red-600"
                  }`}>
                  {restaurant?.isActive ? "Open Now" : "Currently Closed"}
                </Badge>
              </div>

              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold line-clamp-1">
                    {restaurant?.name || "Unnamed Restaurant"}
                  </h3>

                  {restaurant.rating ?
                    <div className="flex items-center gap-1 text-sm shrink-0">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">
                        {restaurant?.rating.toFixed(1)}
                      </span>
                      <span>({restaurant?.totalReviews})</span>
                    </div>
                  : null}
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2">
                  {restaurant?.description ||
                    "Fresh food delivered to your door."}
                </p>

                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 shrink-0" />
                    <span className="line-clamp-1">
                      {restaurant?.location?.address ||
                        "Location not available"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock3 className="w-4 h-4 shrink-0" />
                    <span>
                      {restaurant.estimatedDeliveryTime || 30} min delivery
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Utensils className="w-4 h-4 " />
                    <span>
                      {restaurant.foodItemsCount} item .
                      {restaurant.categoriesCount} categories
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FeaturedRestaurants;
