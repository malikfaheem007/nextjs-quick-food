import {CommentIcon} from "@sanity/icons";
import {defineField, defineType} from "sanity";

export default defineType({
  name: "review",
  title: "Reviews",
  type: "document",
  icon: CommentIcon,
  fields: [
    defineField({
      name: "food",
      title: "Food Item",
      type: "reference",
      to: [{type: "food"}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "user",
      title: "User",
      type: "reference",
      to: [{type: "user"}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "rating",
      title: "Rating",
      type: "number",
      validation: (Rule) => Rule.required().min(1).max(5).integer(),
    }),
    defineField({
      name: "comment",
      title: "Comment",
      type: "text",
      validation: (Rule) => Rule.required().min(1).max(1000),
    }),
    defineField({
      name: "approved",
      title: "Approved",
      type: "boolean",
      initialValue: false,
      description: "Approved this review to make it visible on the website",
    }),
    defineField({
      name: "likes",
      title: "Likes",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{type: "user"}],
        },
      ],
      description: "User who liked this review",
    }),
    defineField({
      name: "dislikes",
      title: "Dislikes",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{type: "user"}],
        },
      ],
      description: "User who disliked this review",
    }),
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      readOnly: true,
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      userName: "user.name",
      foodName: "food.name",
      rating: "rating",
      comment: "comment",
      approved: "approved",
      createdAt: "createdAt",
    },
    prepare({userName, foodName, rating, comment, approved, createdAt}) {
      const approvalMark = approved ? "✅" : "⏳";
      return {
        title: `${approvalMark} ${userName || "Unknown User"} - ${rating}/5 ⭐`,
        subtitle: foodName || "Food Item",
        description:
          comment?.substring(0, 60) +
          (comment?.length > 60 ? "..." : "") +
          ` ${new Date(createdAt).toLocaleDateString()}`,
      };
    },
  },
  orderings: [
    {
      title: "Created Date (Newest First)",
      name: "createdAtDesc",
      by: [{field: "createdAt", direction: "desc"}],
    },
    {
      title: "Rating (Highest First)",
      name: "ratingDesc",
      by: [{field: "rating", direction: "desc"}],
    },
  ],
});
