import {cn} from "@/lib/utils";
import {Star} from "lucide-react";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  className?: string;
}

const StarRating = ({
  rating,
  maxRating = 5,
  size = "md",
  showValue = true,
  className,
}: StarRatingProps) => {
  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };
  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex items-center">
        {Array.from({length: maxRating}).map((_, index) => {
          const isFilled = index < fullStars;
          const isHalf = index === fullStars && hasHalfStar;
          return (
            <div key={index} className="relative">
              {/* {Background Stars (gray)} */}
              <Star
                className={cn(
                  "text-gray-300 dark:text-gray-600",
                  sizeClasses[size],
                )}
              />
              {/* {Filled Stars} */}
              {isFilled ||
                (isHalf && (
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{width: isHalf ? "50%" : "100%"}}>
                    <Star
                      className={cn(
                        "text-yellow-500, fill-yellow-500",
                        sizeClasses[size],
                      )}
                    />
                  </div>
                ))}
            </div>
          );
        })}
      </div>
      {showValue && (
        <span
          className={cn(
            "text-muted-foreground font-medium",
            textSizeClasses[size],
          )}>
          ({rating.toFixed(1)})
        </span>
      )}
    </div>
  );
};
export default StarRating;
