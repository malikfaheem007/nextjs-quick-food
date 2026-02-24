import logo from "@/images/logo.png";
import Image from "next/image";
import Link from "next/link";
const Logo = () => {
  return (
    <Link href={"/"} className="flex items-center gap-0.5 group">
      <div className="relative w-12 h-12 group-hover:scale-110 hoverEffect">
        <Image
          src={logo}
          alt="Quickfood logo"
          className="object-cover"
          priority
        />
      </div>
      <span className="text-2xl font-bold text-foreground tracking-tight">
        Quick <span className="text-primary">Food</span>
      </span>
    </Link>
  );
};

export default Logo;
