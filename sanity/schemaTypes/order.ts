import {defineType} from "sanity";

export default defineType({
  name: "order",
  title: "Order",
  type: "document",
  fields: [
    {
      name: "orderNumber",
      title: "Order Number",
      type: "string",
      description: "Unique order number (auto-generated)",
      readOnly: true,
    },
    {
      name: "user",
      title: "User",
      type: "reference",
      to: [{type: "user"}],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "userEmail",
      title: "User Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    },
    {name: "userName", title: "User Name", type: "string"},
    {
      name: "items",
      title: "Order Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "foodId",
              title: "Food ID",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "name",
              title: "Item Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "image",
              title: "Item Image",
              type: "image",
              description: "URL to the food item image",
            },
            {
              name: "price",
              title: "Price",
              type: "number",
              validation: (Rule) => Rule.required().min(0),
            },
            {
              name: "quantity",
              title: "Quantity",
              type: "number",
              validation: (Rule) => Rule.required().min(1),
            },
            {
              name: "size",
              title: "Size",
              type: "string",
            },
            {
              name: "variety",
              title: "Variety",
              type: "string",
            },
          ],
          preview: {
            select: {
              title: "name",
              quantity: "quantity",
              price: "price",
            },
            prepare({title, quantity, price}) {
              return {
                title: `${quantity}x ${title}`,
                subtitle: `Total: $${(quantity * price).toFixed(2)}`,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: "deliveryAddress",
      title: "Delivery Address",
      type: "object",
      fields: [
        {
          name: "type",
          title: "Type",
          type: "string",
        },
        {
          name: "label",
          title: "Label",
          type: "string",
        },
        {
          name: "street",
          title: "Street",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "apartment",
          title: "Apartment/Suite",
          type: "string",
        },
        {
          name: "city",
          title: "City",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "state",
          title: "State",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "zipCode",
          title: "Zip Code",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "country",
          title: "Country",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "phone",
          title: "Phone Number",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "instructions",
          title: "Delivery Instructions",
          type: "text",
          rows: 3,
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "subtotal",
      title: "Subtotal",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    },
    {
      name: "deliveryFee",
      title: "Delivery Fee",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    },
    {
      name: "tax",
      title: "Tax",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    },
    {
      name: "total",
      title: "Total Amount",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    },
    {
      name: "originalTotal",
      title: "Original Total (before discounts)",
      type: "number",
      description:
        "Original order total before modifications (for refund tracking)",
      readOnly: true,
    },
    {
      name: "paymentMethod",
      title: "Payment Method",
      type: "string",
      options: {
        list: [
          {title: "Online (Stripe)", value: "online"},
          {title: "Cash on Delivery", value: "cod"},
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "paymentStatus",
      title: "Payment Status",
      type: "string",
      options: {
        list: [
          {title: "Pending", value: "pending"},
          {title: "Paid", value: "paid"},
          {title: "Failed", value: "failed"},
        ],
      },
      initialValue: "pending",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "orderStatus",
      title: "Order Status",
      type: "reference",
      to: [{type: "orderStatus"}],
      validation: (Rule) => Rule.required(),
      options: {filter: "isActive == true"},
    },
    {
      name: "estimatedDeliveryTime",
      title: "Estimated Delivery Time",
      type: "string",
      description: "Estimated delivery time (e.g., '30-45 mins')",
    },
    {
      name: "notes",
      title: "Order Notes",
      type: "text",
      description: "Internal notes about the order",
      rows: 3,
    },
    {
      name: "stripeSessionId",
      title: "Stripe Session ID",
      type: "string",
      description: "Stripe checkout session ID ",
      readOnly: true,
    },
    {
      name: "sripePaymentIntent",
      title: "Stripe Payment Intent ID",
      type: "string",
      description: "Stripe payment intent ID (for refunds)",
      readOnly: true,
    },
  ],
  preview: {
    select: {
      orderNumber: "orderNumber",
      userEmail: "userEmail",
      total: "total",
      status: "status.title",
      createdAt: "_createdAt",
    },
    prepare({orderNumber, userEmail, total, status, createdAt}) {
      return {
        title: orderNumber || "New Order",
        subtitle: `${userEmail} $${total?.toFixed(2)} ${status || "No Status"}`,
        description: new Date(createdAt).toLocaleDateString(),
      };
    },
  },
  orderings: [
    {
      title: "Created Date (Newest First)",
      name: "createdAtDesc",
      by: [{field: "_createdAt", direction: "desc"}],
    },
    {
      title: "Total Amount (Highest First)",
      name: "totalDesc",
      by: [{field: "total", direction: "desc"}],
    },
  ],
});
