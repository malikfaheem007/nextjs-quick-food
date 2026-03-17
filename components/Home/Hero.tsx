import {getBanners} from "@/lib/sanityFunctions";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import {Banner} from "@/sanity.types";
import Image from "next/image";
import {urlFor} from "@/sanity/lib/image";
import Container from "../common/Container";
import {cn} from "@/lib/utils";
import AnimatedButton from "../common/AnimatedButton";
import {ArrowRight} from "lucide-react";

const Hero = async () => {
  const banners = await getBanners();
  if (!banners || banners?.length === 0) {
    return null;
  }

  return (
    <section className="relative w-full overflow-hidden mb-16">
      <Carousel
        opts={{
          loop: true,
          align: "start",
        }}
        className="w-full ">
        <CarouselContent>
          {banners.map((banner: Banner, index: number) => {
            const isRightAligned = index === 1;
            return (
              <CarouselItem
                key={banner._id}
                className="relative w-full h-150 md:h-175 bg-">
                {/* {Full Width Background Image} */}
                {banner?.bannerImage && (
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={urlFor(banner?.bannerImage).width(1920).url()}
                      alt="BannerImage"
                      width={1920}
                      height={998}
                      className="w-full h-full object-cover"
                    />
                    {/* {Overlay for better text readability} */}
                    {/* <div className="absolute inset-0 bg-primary/10" /> */}
                  </div>
                )}
                {/* {Content Container} */}
                <Container
                  className={cn(
                    "relative z-10 h-full flex items-center",
                    isRightAligned ? "justify-end" : "justify-start",
                  )}>
                  <div
                    className={cn(
                      "max-w-2xl bg-transparent p-0 animate-in duration-700 fade-in-0 mt-10",
                      isRightAligned ?
                        "text-right slide-in-from-right"
                      : "text-left slide-in-from-left",
                    )}>
                    {/* {Badge} */}
                    <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold text-primary-foreground uppercase tracking-wider bg-primary rounded-full shadow-lg  ">
                      Fresh & Organic
                    </span>
                    <h1 className="text-4xl font-extrabold leading-tight text-foreground md:text-5xl lg:text-6xl mb-6 shadow-foreground drop-shadow-lg">
                      {banner?.title}
                    </h1>
                    <p
                      className={cn(
                        "text-lg md:text-xl text-foreground leading-relaxed font-medium mb-8 drop-shadow-md max-w-lg",
                        isRightAligned ? "ml-auto" : "mr-auto",
                      )}>
                      {banner?.description}
                    </p>
                    <div className={cn("flex gap-4")}>
                      <AnimatedButton href={banner?.buttonLink as string}>
                        {banner?.buttonTitle}{" "}
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </AnimatedButton>
                      <AnimatedButton href="/menu">View Menu</AnimatedButton>
                    </div>
                  </div>
                </Container>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="left-4 z-20 bg-background/20 border-background/40 text-background hover:text-primary hover:border-primary" />
        <CarouselNext className="right-4 z-20 bg-background/20 border-background/40 text-background hover:text-primary hover:border-primary" />
      </Carousel>
    </section>
  );
};

export default Hero;
