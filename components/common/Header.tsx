import {NAVIGATION_LINKS} from "@/constants/data";
import Container from "./Container";
import Logo from "./Logo";
import Link from "next/link";

const Header = () => {
  return (
    <>
      {/* Main Header - Hidden when scrolling */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/60 backdrop-blur-md supports-backdrop-blur:bg-backdrop-filter:bg-background/60">
        <Container className="h-24 flex items-center justify-between">
          {/* Logo */}
          <div>
            <Logo />
          </div>
          {/* navigation */}
          <div className="hidden lg:flex gap-8 items-center">
            {NAVIGATION_LINKS?.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="relative text-sm font-semibold text-foreground hover:text-primary uppercase tracking-wide hoverEffect group">
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full hoverEffect" />
              </Link>
            ))}
          </div>
          {/* icons bar */}
          <div>
            <div className="flex items-center gap-3">
              <Link href={"/auth/signin"}>
                <button className="border border-primary py-2.5 px-5 rounded-full text-xs font-medium relative overflow-hidden group">
                  <span className="absolute inset-0 bg-primary -translate-y-full group-hover:translate-y-0 hoverEffect" />
                  <span className="relative z-10 text-primary group-hover:text-primary-foreground hoverEffect">
                    Sign In
                  </span>
                </button>
              </Link>{" "}
              <Link href={"/auth/signup"}>
                <button className="border border-primary bg-primary py-2.5 px-5 rounded-full text-xs font-medium text-primary-foreground relative overflow-hidden group hover:border-primary transition-colors">
                  <span className="absolute inset-0 bg-background -translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded"></span>
                  <span className="relative z-10 group-hover:text-primary transition-colors duration-300">
                    Sign Up
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </Container>
      </header>
      {/* Sticky Scrolled Header - Appears on scroll */}
      {/* Mobile Sidebar Overlay */}
      {/* Search Modal */}
    </>
  );
};

export default Header;
