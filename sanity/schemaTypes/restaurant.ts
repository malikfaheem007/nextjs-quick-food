import {defineField, defineType} from "sanity";

export default defineType({
  name: "restaurant",
  title: "Restaurants",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Restaurant Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Restaurant Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "object",
      fields: [
        {
          name: "address",
          title: "Address",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "latitude",
          title: "Latitude",
          type: "number",
          validation: (Rule) => Rule.required().min(-90).max(90),
        },
        {
          name: "longitude",
          title: "Longitude",
          type: "number",
          validation: (Rule) => Rule.required().min(-180).max(180),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "phone",
      title: "Phone Number",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "openingHours",
      title: "Opening Hours",
      type: "reference",
      to: [{type: "openingHours"}],
      description:
        "Select the opening hours hours schedule for this restaurant",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "allFoodItmesAvailable",
      title: "Enable All Food Items",
      type: "boolean",
      initialValue: true,
      description:
        "If enabled, all food items will be available at this restaurant",
    }),
    defineField({
      name: "foodItems",
      title: "Available Food Items",
      type: "array",
      of: [{type: "reference", to: [{type: "food"}]}],
      description: "Select food items available at this restaurant",
      hidden: ({document}) => document?.allFoodItmesAvailable === true,
    }),
    defineField({
      name: "categories",
      title: "Food Categories",
      type: "array",
      of: [{type: "reference", to: [{type: "category"}]}],
      description: "Categories of food available at this restaurant",
    }),
    defineField({
      name: "rating",
      title: "Average Rating",
      type: "number",
      readOnly: true,
      validation: (Rule) => Rule.min(0).max(5),
    }),
    defineField({
      name: "totalReviews",
      title: "Total Reviews",
      type: "number",
      readOnly: true,
      initialValue: 0,
    }),
    defineField({
      name: "isActive",
      title: "Is Active",
      type: "boolean",
      description: "Is the restaurant currently accepting orders?",
      initialValue: true,
    }),
    defineField({
      name: "deliveryFee",
      title: "Delivery Fee",
      type: "number",
      initialValue: 0,
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "minimumOrder",
      title: "Minimum Order Amount",
      type: "number",
      initialValue: 0,
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "estimatedDeliveryTime",
      title: "Estimated Delivery Time (mins)",
      type: "number",
      initialValue: 30,
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "isFeatured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
      description: "Toggle to feature this restaurant on the home page",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Use for sorting restaurants",
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: "name",
      address: "location.address",
      media: "image",
      isActive: "isActive",
    },
    prepare({title, address, media, isActive}) {
      return {
        title,
        subtitle: `${address} ${isActive ? "✅" : "❌"}`,
        media,
      };
    },
  },
});
