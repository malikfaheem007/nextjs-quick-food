import {UserIcon} from "@sanity/icons";
import {defineField, defineType} from "sanity";

export default defineType({
  name: "user",
  title: "User",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "name",
      title: "Name",
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
      name: "password",
      title: "Password",
      type: "string",
      description: "Hashed password for email/password authentication",
      hidden: true,
    }),
    defineField({
      name: "image",
      title: "Profile Image",
      type: "url",
      description: "URL to the user's profile image",
    }),
    defineField({
      name: "emailVerified",
      title: "Email Verified",
      type: "datetime",
      description: "Timestamp of when the user's email was verified",
    }),
    defineField({
      name: "provider",
      title: "Auth Provider",
      type: "string",
      options: {
        list: [
          {title: "Credentials", value: "credentials"},
          {title: "Google", value: "google"},
        ],
      },
      initialValue: "credentials",
    }),
    defineField({
      name: "role",
      title: "User Role",
      type: "reference",
      to: [{type: "userRole"}],
      description: "The role assigned to this user (defaults to 'User' role)",
      options: {
        filter: "_type == 'userRole' && isActive == true",
      },
    }),
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
    defineField({
      name: "addresses",
      title: "Addresses",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{type: "address"}],
        },
      ],
      description: "User's saved addresses for delivery",
    }),
    defineField({
      name: "walletBalance",
      title: "Wallet Balance",
      type: "number",
      description: "User's wallet credit from refunds and credits",
      initialValue: 0,
      validation: (Rule) => Rule.min(0),
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "email",
      media: "image",
      roleName: "role.name",
    },
    prepare({title, subtitle, roleName}) {
      return {
        title: `${title}${roleName ? `(${roleName})` : ""}`,
        subtitle,
      };
    },
  },
});
