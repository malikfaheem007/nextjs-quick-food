import {
  BasketIcon,
  CubeIcon,
  DocumentTextIcon,
  FolderIcon,
  TagIcon,
  TrolleyIcon,
  UserIcon,
} from "@sanity/icons";
import type {StructureResolver} from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Quick Food Admin")
    .items([
      // Food Management Section
      S.listItem()
        .title("Food Management")
        .icon(TrolleyIcon)
        .child(
          S.list()
            .title("Food Management")
            .items([
              S.listItem()
                .title("All Food Items")
                .icon(TrolleyIcon)
                .schemaType("food")
                .child(
                  S.documentTypeList("food")
                    .title("All Food Items")
                    .defaultOrdering([
                      {field: "_createdAt", direction: "desc"},
                    ]),
                ),
              S.listItem()
                .title("Categories")
                .icon(FolderIcon)
                .schemaType("category")
                .child(
                  S.documentTypeList("category")
                    .title("categories")
                    .defaultOrdering([{field: "order", direction: "asc"}]),
                ),
              S.listItem()
                .title("Food Varieties")
                .icon(TagIcon)
                .schemaType("foodVariety")
                .child(
                  S.documentTypeList("foodVariety")
                    .title("Food Varieties")
                    .defaultOrdering([{field: "name", direction: "asc"}]),
                ),
              S.listItem()
                .title("ingredient")
                .icon(CubeIcon)
                .schemaType("ingredient")
                .child(
                  S.documentTypeList("ingredient")
                    .title("Ingredients")
                    .defaultOrdering([{field: "order", direction: "asc"}]),
                ),
              S.listItem()
                .title("Sizes")
                .icon(CubeIcon)
                .schemaType("size")
                .child(
                  S.documentTypeList("size")
                    .title("Sizes")
                    .defaultOrdering([{field: "order", direction: "asc"}]),
                ),

              S.divider(),

              S.listItem()
                .title("Featured Items")
                .icon(TrolleyIcon)
                .schemaType("food")
                .child(
                  S.documentTypeList("food")
                    .title("Featured Items")
                    .filter("_type == 'food' && featured == true")
                    .defaultOrdering([{field: "order", direction: "asc"}]),
                ),
              S.listItem()
                .title("Available Items")
                .icon(TrolleyIcon)
                .schemaType("food")
                .child(
                  S.documentTypeList("food")
                    .title("Available Items")
                    .filter("_type == 'food' && available == true")
                    .defaultOrdering([{field: "name", direction: "asc"}]),
                ),
              S.listItem()
                .title("Unavailable Items")
                .icon(TrolleyIcon)
                .schemaType("food")
                .child(
                  S.documentTypeList("food")
                    .title("Unavailable Items")
                    .filter("_type == 'food' && available == false")
                    .defaultOrdering([{field: "name", direction: "asc"}]),
                ),
              S.divider(),

              S.listItem()
                .title("Produt Reviews")
                .icon(DocumentTextIcon)
                .schemaType("review")
                .child(
                  S.documentTypeList("review")
                    .title("Product Reviews")
                    .defaultOrdering([{field: "createdAt", direction: "desc"}]),
                ),
            ]),
        ),

      S.divider(),

      // Page Design Section
      S.listItem()
        .title("Page Management")
        .icon(DocumentTextIcon)
        .child(
          S.list()
            .title("Home Banner")
            .items([
              S.listItem()
                .title("Home Banner")
                .icon(DocumentTextIcon)
                .schemaType("banner")
                .child(
                  S.documentTypeList("banner")
                    .title("Home Banner")
                    .defaultOrdering([
                      {field: "_createdAt", direction: "desc"},
                    ]),
                ),
            ]),
        ),

      S.divider(),

      // Restaurants Section
      S.listItem()
        .title("Restaurants")
        .icon(FolderIcon)
        .child(
          S.list()
            .title("Restaurants")
            .items([
              S.listItem()
                .title("All Restaurants")
                .icon(FolderIcon)
                .schemaType("restaurant")
                .child(
                  S.documentTypeList("restaurant")
                    .title("All Restaurants")
                    .defaultOrdering([{field: "order", direction: "asc"}]),
                ),
              S.listItem()
                .title("Active Restaurants")
                .icon(FolderIcon)
                .schemaType("restaurant")
                .child(
                  S.documentTypeList("restaurant")
                    .title("Active Restaurants")
                    .filter("_type == 'restaurant' && isActive == true")
                    .defaultOrdering([{field: "order", direction: "asc"}]),
                ),
              S.listItem()
                .title("Inactive Restaurants")
                .icon(FolderIcon)
                .schemaType("restaurant")
                .child(
                  S.documentTypeList("restaurant")
                    .title("Inactive Restaurants")
                    .filter("_type == 'restaurant' && isActive == false")
                    .defaultOrdering([{field: "name", direction: "asc"}]),
                ),
              S.listItem()
                .title("Opening Hours")
                .icon(DocumentTextIcon)
                .schemaType("openingHours")
                .child(
                  S.documentTypeList("openingHours")
                    .title("Opening Hours")
                    .defaultOrdering([{field: "name", direction: "asc"}]),
                ),
            ]),
        ),

      S.divider(),

      // Menu Section

      S.listItem()
        .title("Menus")
        .icon(DocumentTextIcon)
        .child(
          S.list()
            .title("Menus")
            .items([
              S.listItem()
                .title("All Menus")
                .icon(DocumentTextIcon)
                .schemaType("menu")
                .child(
                  S.documentTypeList("menu")
                    .title("All Menus")
                    .defaultOrdering([{field: "order", direction: "asc"}]),
                ),
              S.listItem()
                .title("Active Menus")
                .icon(DocumentTextIcon)
                .schemaType("menu")
                .child(
                  S.documentTypeList("menu")
                    .title("Active Menus")
                    .filter("_type == 'menu' && active == true")
                    .defaultOrdering([{field: "order", direction: "asc"}]),
                ),
              S.listItem()
                .title("Featured Menus")
                .icon(DocumentTextIcon)
                .schemaType("menu")
                .child(
                  S.documentTypeList("menu")
                    .title("Featured Menus")
                    .filter("_type == 'menu' && featured == true")
                    .defaultOrdering([{field: "order", direction: "asc"}]),
                ),
            ]),
        ),

      S.divider(),

      // Order Section (placeholder for future)

      S.listItem()
        .title("Orders")
        .icon(BasketIcon)
        .child(
          S.list()
            .title("Orders")
            .items([
              S.listItem()
                .title("Orders")
                .icon(BasketIcon)
                .child(
                  S.documentList()
                    .title("Not orders yet")
                    .filter("_type == 'order'"),
                ),
            ]),
        ),

      S.divider(),

      // Customers Section (placeholder for future)

      S.listItem()
        .title("Customers")
        .icon(UserIcon)
        .child(
          S.list()
            .title("Customers")
            .items([
              S.listItem()
                .title("Coming Soon")
                .icon(UserIcon)
                .child(
                  S.documentList()
                    .title("Not customers yet")
                    .filter("_type == 'customer'"),
                ),
            ]),
        ),

      S.divider(),

      //Blog Section
      S.listItem()
        .title("Blog Management")
        .icon(DocumentTextIcon)
        .child(
          S.list()
            .title("Blog")
            .items([
              S.listItem()
                .title("All Posts")
                .icon(DocumentTextIcon)
                .schemaType("post")
                .child(
                  S.documentTypeList("post")
                    .title("All Posts")
                    .defaultOrdering([
                      {field: "publishedAt", direction: "desc"},
                    ]),
                ),
              S.listItem()
                .title("Authors")
                .icon(UserIcon)
                .schemaType("author")
                .child(
                  S.documentTypeList("author")
                    .title("Authors")
                    .defaultOrdering([{field: "name", direction: "asc"}]),
                ),
              S.listItem()
                .title("Blog Categories")
                .icon(FolderIcon)
                .schemaType("blogCategory")
                .child(
                  S.documentTypeList("blogCategory")
                    .title("Blog Categories")
                    .defaultOrdering([{field: "title", direction: "asc"}]),
                ),
            ]),
        ),
    ]);
