import {ArrowRight, CalendarDays} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import type {Post} from "@/sanity.types";
import {urlFor} from "@/sanity/lib/image";

const formatPublishedDate = (publishedAt?: string) => {
  if (!publishedAt) {
    return "Date not available";
  }

  const date = new Date(publishedAt);

  if (Number.isNaN(date.getTime())) {
    return "Date not available";
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const getAuthorInitials = (name?: string) => {
  if (!name) {
    return "AU";
  }

  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
};

export default function BlogCard({post}: {post: Post}) {
  const postHref = post.slug?.current ? `/blog/${post.slug.current}` : "/blog";
  const authorName = post.author?.name || "Quick Food Team";
  const publishedDate = formatPublishedDate(post.publishedAt);
  // const visibleCategories = post.categories?.slice(0, 2) || [];

  return (
    <Card className="group overflow-hidden py-0 h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hoverEffect">
      <Link href={postHref} className="block">
        <div className="relative h-48 w-full overflow-hidden bg-muted">
          {post.mainImage ?
            <Image
              src={urlFor(post.mainImage).width(900).height(600).url()}
              alt={post.title || "Blog post image"}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          : <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
              No Image Available
            </div>
          }

          {/* {visibleCategories.length > 0 && (
            <div className="absolute left-3 top-3 flex flex-wrap gap-2">
              {visibleCategories.map((category, index) => (
                <Badge
                  key={`${category.slug?.current || category.title || "category"}-${index}`}
                  className="bg-background/95 text-foreground shadow-sm hover:bg-background/95">
                  {category.title || "Category"}
                </Badge>
              ))}
            </div>
          )} */}
          {post.categories && post.categories.length > 0 && (
            <div className="absolute left-3 top-3 flex flex-wrap gap-2">
              {post.categories?.slice(0, 2).map((category, index) => (
                <Badge
                  key={index}
                  className="bg-background/95 text-foreground shadow-sm hover:bg-background/95">
                  {category.title}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </Link>
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarDays className="h-4 w-4 shrink-0" />
          <span>{publishedDate}</span>
        </div>

        <div className="space-y-3">
          <Link href={postHref} className="block">
            <h3 className="text-lg font-semibold line-clamp-2 transition-colors group-hover:text-primary">
              {post.title || "Untitled Post"}
            </h3>
          </Link>

          <div className="flex items-center gap-3">
            <Avatar size="sm" className="ring-1 ring-border/70">
              {post.author?.image ?
                <AvatarImage
                  src={urlFor(post.author.image).width(80).height(80).url()}
                  alt={authorName}
                />
              : null}
              <AvatarFallback>{getAuthorInitials(authorName)}</AvatarFallback>
            </Avatar>

            <p className="text-sm text-muted-foreground">
              By{" "}
              <span className="font-medium text-foreground">{authorName}</span>
            </p>
          </div>
        </div>

        <Button
          asChild
          variant="ghost"
          className="px-0 text-sm font-bold hover:bg-transparent text-primary hover:text-primary/90">
          <Link href={postHref}>
            Read More
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
