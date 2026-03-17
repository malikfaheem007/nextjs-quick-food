import {FoodWithDetails} from "@/types/sanity-types";
import {Check, ShoppingCart} from "lucide-react";

interface Props {
  food: FoodWithDetails;
  className?: string;
  variant?: "default" | "icon";
}

const AddToCart = ({food, className, variant = "default"}: Props) => {
  const isAdded = false;
  return (
    <button
      // onClick={handleAddToCart}
      disabled={isAdded}
      className={`w-full border px-10 py-2 relative overflow-hidden group/button transition-all duration-300 ${isAdded ? "border-green-500 bg-green-500 cursor-default" : "border-primary/70 hover:border-primary"} ${className}`}>
      <span
        className={`absolute inset-0 bg-primary transition-transform duration-300 ease-out ${isAdded ? "translate-y-0" : "-translate-y-full group-hover/button:translate-y-0"}`}></span>
      <span
        className={`relative z-10 transition-all duration-300 font-semibold text-sm uppercase tracking-wider flex items-center justify-center gap-2 ${isAdded ? "text-white scale-105" : "text-primary group-hover/button:text-primary-foreground"}`}>
        {isAdded ?
          <>
            <Check className="h-4 w-4 animate-in zoom-in duration-300" />
            Add to cart
          </>
        : <>
            <ShoppingCart className="w-4 h-4" />
            Add to cart
          </>
        }
      </span>
    </button>
  );
};
export default AddToCart;
