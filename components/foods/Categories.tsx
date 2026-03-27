import {getActiveCategories} from "@/lib/sanityFunctions";
import {Category} from "@/sanity.types";
import {urlFor} from "@/sanity/lib/image";
import {CategoryWithSlug} from "@/types/sanity-types";
import {ArrowRight, Sparkles} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Categories() {
  const categories = await getActiveCategories();

  return (
    <section className="relative py-10 lg:py-16">
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-background to-primary/5" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
      <div className="relative z-10">
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-primary uppercase font-semibold tracking-wide text-sm">
              Popular Categories
            </span>
          </div>
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
            What Are You Craving?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover your favorite dishes from our carefully curated categories
          </p>
        </div>
        {categories.length > 0 ?
          <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md: lg:grid-cols-5">
            {categories.map(
              (
                category: CategoryWithSlug | (Category & {itemCount: number}),
                index: number,
              ) => (
                <Link href={`/categories/${category?.slug}`} key={category._id}>
                  <div
                    className="group relative overflow-hidden rounded-2xl bg-card shadow-md hover:shadow-2xl transition-all duration-300 hoverEffect hover:-translate-y-2 border border-border"
                    style={{animationDelay: `${index * 50}ms`}}>
                    <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 " />
                    <div className="relative p-6 text-center">
                      <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-linear-to-br from-primary/20 to-primary/5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-sm group-hover:shadow-lg">
                        {category.image ?
                          <div>
                            <Image
                              src={urlFor(category.image).url()}
                              alt={category.name || "Category image"}
                              width={250}
                              height={250}
                              className="object-contain h-14 w-14 transition-transform duration-300 group-hover:scale-110"
                            />
                          </div>
                        : <span className="text-3xl">🥘</span>}
                      </div>
                      <h3 className="mb-2 font-bold text-sm text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2 h-10">
                        {category.name}
                      </h3>
                      <div className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-full bg-muted text-xs font-medium text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors duration-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {category.itemCount || 0} Items
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-linear-to-r from-transparent via-white/10 to-transparent" />
                </Link>
              ),
            )}
          </div>
        : <p className="text-center text-muted-foreground">
            No active categories found.
          </p>
        }
        <div className="mt-12 text-center">
          <Link
            href={"/categories"}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all duration-300 hover:gap-3 shadow-lg hover:shadow-xl group">
            <span>Explore All Categories</span>
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
