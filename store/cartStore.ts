"use client";

import {create} from "zustand";
import {createJSONStorage, persist} from "zustand/middleware";

export interface CartItem {
  id: string;
  foodId: string;
  name: string;
  slug: string;
  price: number;
  quantity: number;
  maxQuantity?: number;
  image: string | null;
  category?: string;
  size?: string;
  variety?: string;
}

export interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  // Actions
  addItem: (item: Omit<CartItem, "quantity"> & {quantity: number}) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;

  //Computed Values
  getTotalItems: () => number;
  getUniqueItemCount: () => number;
  getTotalPrice: () => number;
  getItemQuantity: (id: string) => number;
}

// const normalizeQuantity = (quantity: number, maxQuantity?: number) => {
//   const safeQuantity =
//     Number.isFinite(quantity) ? Math.max(1, Math.floor(quantity)) : 1;

//   return typeof maxQuantity === "number" ?
//       Math.min(safeQuantity, maxQuantity)
//     : safeQuantity;
// };

// export const useCartStore = create<CartStore>((set, get) => ({
//   items: [],
//   isOpen: false,
//   addItem: (item) =>
//     set((state) => {
//       const existingItem = state.items.find(
//         (cartItem) => cartItem.id === item.id,
//       );
//       const incomingQuantity = normalizeQuantity(
//         item.quantity,
//         item.maxQuantity,
//       );

//       if (existingItem) {
//         return {
//           items: state.items.map((cartItem) =>
//             cartItem.id === item.id ?
//               {
//                 ...cartItem,
//                 ...item,
//                 quantity: normalizeQuantity(
//                   cartItem.quantity + incomingQuantity,
//                   item.maxQuantity ?? cartItem.maxQuantity,
//                 ),
//               }
//             : cartItem,
//           ),
//         };
//       }

//       return {
//         items: [...state.items, {...item, quantity: incomingQuantity}],
//       };
//     }),
//   removeItem: (id) =>
//     set((state) => ({
//       items: state.items.filter((item) => item.id !== id),
//     })),
//   updateQuantity: (id, quantity) =>
//     set((state) => {
//       if (quantity <= 0) {
//         return {
//           items: state.items.filter((item) => item.id !== id),
//         };
//       }

//       return {
//         items: state.items.map((item) =>
//           item.id === id ?
//             {...item, quantity: normalizeQuantity(quantity, item.maxQuantity)}
//           : item,
//         ),
//       };
//     }),
//   clearCart: () => set({items: []}),
//   toggleCart: () =>
//     set((state) => ({
//       isOpen: !state.isOpen,
//     })),
//   getTotalItems: () =>
//     get().items.reduce((total, item) => total + item.quantity, 0),
//   getUniqueItemCount: () => get().items.length,
//   getTotalPrice: () =>
//     get().items.reduce((total, item) => total + item.price * item.quantity, 0),
//   getItemQuantity: (id) =>
//     get().items.find((item) => item.id === id)?.quantity ?? 0,
// }));

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (item) => {
        const items = get().items;
        const existingItem = items.find((i) => i.id === item.id);
        if (existingItem) {
          //Update quantity if item is already exists
          set({
            items: items.map((i) =>
              i.id === item.id ?
                {...i, quantity: i.quantity + (item.quantity || 1)}
              : i,
            ),
          });
        } else {
          //Add new item
          set({items: [...items, {...item, quantity: item.quantity || 1}]});
        }
      },
      removeItem: (id) => {
        set({
          items: get().items.filter((i) => i.id !== id),
        });
      },
      updateQuantity: (id, quantity) => {
        if (quantity <= 1) {
          get().removeItem(id);
          return;
        }
        set({
          items: get().items.map((i) => (i.id === id ? {...i, quantity} : i)),
        });
      },
      clearCart: () => {
        set({items: []});
      },
      toggleCart: () => {
        set({isOpen: !get().isOpen});
      },
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      getUniqueItemCount: () => {
        return get().items.length;
      },
      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        );
      },
      getItemQuantity: (id) => {
        const item = get().items.find((i) => i.id === id);
        return item ? item.quantity : 0;
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
