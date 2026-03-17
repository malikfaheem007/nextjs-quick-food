import Link from "next/link";
import Container from "./Container";
import Logo from "./Logo";
import {Facebook, Instagram, Mail, MapPin, Phone, Twitter} from "lucide-react";
import {NAVIGATION_LINKS} from "@/constants/data";

const Footer = () => {
  return (
    <footer className="bg-muted border-t border-border">
      <Container className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 py-12 lg:py-16">
        <div>
          <Logo />
          <p className="text-muted-foreground leading-relaxed max-w-xs">
            We deliver organic, fresh, and healthy food to your doorstep. Our
            mission is to provide the best quality food for your healthy life.
          </p>
          <div className="flex space-x-3 pt-2">
            <Link
              href={"#"}
              className="h-10 w-10 flex items-center justify-center rounded-full bg-card text-muted-foreground shadow-sm hover:text-primary hover:bg-primary/10 hover:shadow-md hoverEffect"
              aria-label="facebook">
              <Facebook className="h-5 w-5" />
            </Link>
            <Link
              href={"#"}
              className="h-10 w-10 flex items-center justify-center rounded-full bg-card text-muted-foreground shadow-sm hover:text-primary hover:bg-primary/10 hover:shadow-md hoverEffect"
              aria-label="twitter">
              <Twitter className="h-5 w-5" />
            </Link>
            <Link
              href={"#"}
              className="h-10 w-10 flex items-center justify-center rounded-full bg-card text-muted-foreground shadow-sm hover:text-primary hover:bg-primary/10 hover:shadow-md hoverEffect"
              aria-label="instagram">
              <Instagram className="h-5 w-5" />
            </Link>
          </div>
        </div>
        <div>
          <h3 className="mb-4 lg:mb-6 text-base lg:text-lg font-bold text-foreground uppercase tracking-wide">
            Quick Links
          </h3>
          <ul className="flex flex-col gap-2">
            {NAVIGATION_LINKS?.map((item) => (
              <li
                key={item.label}
                className="text-muted-foreground hover:text-primary inline-block hoverEffect font-medium">
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-4 lg:mb-6 text-base lg:text-lg font-bold text-foreground uppercase tracking-wide">
            Opening Hours
          </h3>
          <ul className=" space-y-2 lg:space-y-3 text-sm lg:text-base">
            <li className="flex justify-between gap-4">
              <span className="text-muted-foreground">Mon - Fri</span>
              <span className="font-semibold text-foreground whitespace-nowrap">
                8:00 - 20:00
              </span>
            </li>
            <li className="flex justify-between gap-4">
              <span className="text-muted-foreground">Saturday</span>
              <span className="font-semibold text-foreground whitespace-nowrap">
                9:00 - 21:00
              </span>
            </li>
            <li className="flex justify-between gap-4">
              <span className="text-muted-foreground">Sunday</span>
              <span className="font-semibold text-foreground whitespace-nowrap">
                10:00 - 22:00
              </span>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-4 lg:mb-6 text-base lg:text-lg font-bold text-foreground uppercase tracking-wide">
            Contect Us
          </h3>
          <ul className="space-y-3 lg:space-y-4">
            <li className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary shrink-0 my-0.5" />
              <span className="text-muted-foreground text-sm lg:text-base">
                123 Food Street, Green City, New York, USA
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-primary shrink-0 " />
              <Link
                href={"tel:+123456789"}
                className="text-foreground font-semibold hover:text-primary transition-colors ">
                +1 234 567 890
              </Link>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-primary shrink-0" />
              <Link
                href={"mailto:hello@quickfood.com"}
                className="text-muted-foreground hover:text-primary transition-colors ">
                hello@quickfood.com
              </Link>
            </li>
          </ul>
        </div>
      </Container>
      <Container className="py-10 border-t border-border pt-6 lg:pt-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p className="text-center sm:text-left">
            &copy; {new Date().getFullYear()} QuickFood. All rights reserved
          </p>
          <div className="flex gap-6">
            <Link
              href={"/privacy"}
              className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link
              href={"/terms"}
              className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
};
export default Footer;
