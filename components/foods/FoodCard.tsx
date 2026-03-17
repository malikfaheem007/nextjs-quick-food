import {urlFor} from "@/sanity/lib/image";
import {FoodWithDetails} from "@/types/sanity-types";
import Image from "next/image";
import Link from "next/link";
import StarRating from "./StarRating";
import PriceFormatter from "./PriceFormatter";
import AddToCart from "./AddToCart";

const FoodCard = ({food}: {food: FoodWithDetails}) => {
  const hasRating = food.averageRating && food.totalReviews;
  const rating = food.averageRating || 0;
  const reviewCount = food.totalReviews || 0;
  return (
    <div className="group">
      <Link href={`/food/${food?.slug}`}>
        <div className="relative w-full h-56 overflow-hidden">
          {food?.images && food?.images[0] && (
            <Image
              src={urlFor(food?.images[0]).url()}
              alt="Food Image"
              width={500}
              height={300}
              className="w-full h-full object-cover group-hover:scale-110 hoverEffect"
            />
          )}
        </div>
      </Link>
      {/* {Content} */}
      <div className="py-2 space-y-1">
        <div>
          <div className="flex justify-start">
            {food.category && (
              <span className="text-xs font-medium">{food.category.name}</span>
            )}
          </div>
          <Link href={`/food/${food?.slug}`} className="block">
            <h3 className="text-lg font-semibold tracking-wide line-clamp-1 text-primary">
              {food?.name}
            </h3>
          </Link>
          {/* {Rating} */}
          <div className="flex items-center gap-2 my-1">
            {hasRating ?
              <>
                <StarRating rating={rating} showValue={false} size="sm" />
                <span className="text-xs text-muted-foreground">
                  {reviewCount} {reviewCount === 1 ? "review" : "reviews"}
                </span>
              </>
            : <div className="flex items-center gap-1">
                <StarRating rating={0} showValue={false} size="sm" />
                <span className="text-xs text-muted-foreground">
                  (No reviews yet)
                </span>
              </div>
            }
          </div>
          {/* {Price} */}
          <PriceFormatter amount={food.basePrice} className="text-foreground" />
        </div>
        <div className="mt-2">
          <AddToCart food={food} />
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
