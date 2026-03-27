import Container from "@/components/common/Container";
import FeaturedFood from "@/components/Home/FeaturedFood";
import FeaturedRestaurants from "@/components/Home/FeaturedRestaurants";
import Hero from "@/components/Home/Hero";
import HowItWorks from "@/components/Home/HowItWorks";
import Categories from "@/components/foods/Categories";
import {Button} from "@/components/ui/button";
import {client} from "@/sanity/lib/client";
import BlogCard from "@/components/common/BlogCard";
import Link from "next/link";
import {Post} from "@/sanity.types";

export const revalidate = 60;

export default async function Home() {
  const query = `*[_type == "post" && isFeatured == true] | order(publishedAt desc)[0...4] {
    _id,
    title,
    slug,
    mainImage,
    publishedAt,
    author->{
      name,
      image
    },
    categories[]->{
      title,
      slug,
    }
  }`;

  const posts = await client.fetch<Post[]>(query);

  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <Container>
        <HowItWorks />
        <FeaturedFood />
        <FeaturedRestaurants />
        <Categories />
        {posts?.length > 0 && (
          <section className="py-10 lg:py-16 bg-muted/30 p-5">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">
                  Featured Posts
                </h2>
                <p className="text-muted-foreground mt-2">
                  Check out our latest blog posts and news
                </p>
              </div>
              <Button asChild variant="outline">
                <Link href="/blog">View All Posts</Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {posts.map((post) => (
                <BlogCard key={post._id} post={post} />
              ))}
            </div>
          </section>
        )}
      </Container>
    </div>
  );
}
