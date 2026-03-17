import Link from "next/link";
import {cn} from "@/lib/utils";

interface AnimatedButtonProps {
  href?: string;
  children: React.ReactNode;
  className?: string;
  direction?: "left-to-right" | "top-to-bottom";
  variant?: "filled" | "outline";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
}

const AnimatedButton = ({
  href,
  children,
  className,
  direction = "left-to-right",
  variant = "filled",
  onClick,
  type = "button",
  disabled = false,
  size = "md",
}: AnimatedButtonProps) => {
  const directionClass =
    direction === "top-to-bottom" ? "-translate-y-full" : "-translate-x-full";
  const hoverClass =
    direction === "top-to-bottom" ?
      "group-hover/button:translate-y-0"
    : "group-hover/button:translate-x-0";

  const sizeClasses = {
    sm: "py-2 px-6 text-sm",
    md: "py-3 px-10 text-base",
    lg: "py-4 px-12 text-lg",
  };

  const variantClasses = {
    filled:
      "border border-primary bg-primary text-primary-foreground hover:border-primary",
    outline:
      "border border-primary/70 text-primary bg-transparent hover:border-primary",
  };
  const bgAnimationClass =
    variant === "filled" ? "bg-primary-foreground" : "bg-primary";
  const textColorClass =
    variant === "filled" ?
      "group-hover/button:text-primary"
    : "group-hover/button:text-primary-foreground";

  const baseClasses = cn(
    "inline-flex items-center justify-center font-bold rounded-full relative overflow-hidden group/button uppercase tracking-wide transition-all duration-300",
    sizeClasses[size],
    variantClasses[variant],
    disabled && "opacity-50 cursor-not-allowed",
    className,
  );
  const content = (
    <>
      <span
        className={cn(
          "absolute inset-0 transition-transform duration-300 ease-out",
          directionClass,
          bgAnimationClass,
          hoverClass,
          direction === "top-to-bottom" ? "rounded-full" : "",
        )}
      />
      <span
        className={cn(
          "relative z-10 transition-colors duration-300 flex items-center gap-2",
          textColorClass,
        )}>
        {children}
      </span>
    </>
  );

  if (href && !disabled) {
    return (
      <Link href={href} className={baseClasses} onClick={onClick}>
        {content}
      </Link>
    );
  }
  return (
    <button
      type={type}
      className={baseClasses}
      onClick={onClick}
      disabled={disabled}>
      {content}
    </button>
  );
};
export default AnimatedButton;
