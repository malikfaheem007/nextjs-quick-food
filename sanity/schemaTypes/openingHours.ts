import {describe} from "node:test";
import {defineField, defineType} from "sanity";

export default defineType({
  name: "openingHours",
  title: "Opening Hours",
  type: "document",
  initialValue: () => ({
    name: "Standard Hours",
    schedule: [
      {day: "monday", opens: "10:00", closes: "23:00", closed: false},
      {day: "tuesday", opens: "10:00", closes: "23:00", closed: false},
      {day: "wednesday", opens: "10:00", closes: "23:00", closed: false},
      {day: "thursday", opens: "10:00", closes: "23:00", closed: false},
      {day: "friday", opens: "10:00", closes: "23:00", closed: false},
      {day: "saturday", opens: "10:00", closes: "23:00", closed: false},
      {day: "sunday", opens: "10:00", closes: "23:00", closed: false},
    ],
  }),
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description: "e.g., 'Standard Hours', 'Holiday Hours', 'Weekend Hours'",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "schedule",
      title: "Schedule",
      type: "array",
      initialValue: [
        {
          day: "monday",
          opensTime: "10:00",
          closesTime: "23:00",
          isClosed: false,
        },
        {
          day: "tuesday",
          opensTime: "10:00",
          closesTime: "23:00",
          isClosed: false,
        },
        {
          day: "wednesday",
          opensTime: "10:00",
          closesTime: "23:00",
          isClosed: false,
        },
        {
          day: "thursday",
          opensTime: "10:00",
          closesTime: "23:00",
          isClosed: false,
        },
        {
          day: "friday",
          opensTime: "10:00",
          closesTime: "23:00",
          isClosed: false,
        },
        {
          day: "saturday",
          opensTime: "10:00",
          closesTime: "23:00",
          isClosed: false,
        },
        {
          day: "sunday",
          opensTime: "10:00",
          closesTime: "23:00",
          isClosed: false,
        },
      ],
      of: [
        {
          type: "object",
          fields: [
            {
              name: "day",
              title: "Day",
              type: "string",
              options: {
                list: [
                  {title: "Monday", value: "monday"},
                  {title: "Tuesday", value: "tuesday"},
                  {title: "Wednesday", value: "wednesday"},
                  {title: "Thursday", value: "thursday"},
                  {title: "Friday", value: "friday"},
                  {title: "Saturday", value: "saturday"},
                  {title: "Sunday", value: "sunday"},
                ],
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: "openTime",
              title: "Open Time",
              type: "string",
              description: "Format: HH:MM (24-hour format)",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "closeTime",
              title: "Close Time",
              type: "string",
              description: "Format: HH:MM (24-hour format)",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "isClosed",
              title: "Closed",
              type: "boolean",
            },
          ],
          preview: {
            select: {
              day: "day",
              openTime: "openTime",
              closeTime: "closeTime",
              isClosed: "isClosed",
            },
            prepare({day, openTime, closeTime, isClosed}) {
              return {
                title: day.charAt(0).toUpperCase() + day.slice(1),
                subtitle: isClosed ? "Closed" : `${openTime} - ${closeTime}`,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description: "Optional description for this schedule",
    }),
  ],
  preview: {
    select: {
      title: "name",
      description: "description",
    },
    prepare({title, description}) {
      return {
        title,
        subtitle: description || "Opening Hours Schedule",
      };
    },
  },
});
