import {title} from "process";
import {defineType} from "sanity";

export default defineType({
  name: "orderStatus",
  title: "Order Status",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Status Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "value",
      title: "Status Value",
      type: "slug",
      description: "URL-friendly identifier for this status",
      options: {
        source: "title",
        maxLength: 50,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      description: "what this status means",
      rows: 2,
    },
    {
      name: "color",
      type: "string",
      title: "Status Color",
      description: "Enter hex color code (e.g., #3B82F6)",
      placeholder: "#3B82F6",
      initialValue: "#9CA3AF",
      validation: (Rule) =>
        Rule.custom((value: string | undefined) => {
          if (!value) return true;
          const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
          return (
            hexRegex.test(value) ||
            "Please enter a valid hex color code (e.g., #3B82F6)"
          );
        }),
    },
    {
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Order in which this status appears in lists",
      validation: (Rule) => Rule.required().min(0),
    },
    {
      name: "isDefault",
      title: "Is Default Status",
      type: "boolean",
      description: "Use this status as the default for new orders",
      initialValue: false,
    },
    {
      name: "isActive",
      title: "Is Active",
      type: "boolean",
      description: "Whether this status is currently in use",
      initialValue: true,
    },
  ],
  preview: {
    select: {
      title: "title",
      description: "description",
      isDefault: "isDefault",
      isActive: "isActive",
    },
    prepare({title, description, isDefault, isActive}) {
      return {
        title: `${title} ${isDefault ? "(Default)" : ""}${!isActive ? "InActive" : ""}`,
        subtitle: description,
      };
    },
  },
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{field: "order", direction: "asc"}],
    },
  ],
});
