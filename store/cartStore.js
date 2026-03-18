import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (product) => {
        const cart = get().cart;

        const exists = cart.find((item) => item.id === product.id);

        if (exists) {
          const updatedCart = cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + product.quantity }
              : item,
          );

          set({ cart: updatedCart });
        } else {
          set({
            cart: [...cart, product],
          });
        }
      },

      removeFromCart: (id) => {
        set({
          cart: get().cart.filter((item) => item.id !== id), // Filtra los elementos del carrito distintos al id, y devuelve un carrito con el resto
        });
      },

      clearCart: () => set({ cart: [] }),

      total: () => {
        return get().cart.reduce(
          (acc, item) => acc + item.precio * item.quantity,
          0,
        );
      },

      itemsCount: () => {
        return get().cart.reduce((acc, item) => acc + item.quantity, 0);
      },

      updateQuantity: (product) => {
        const cart = get().cart;

        const updatedCart = cart.map((item) => {
          if (item.id === product.id) {
            item.quantity = product.quantity;
          }
          return item;
        });
        set({ cart: updatedCart });
      },
    }),
    {
      name: "cart-storage",
    },
  ),
);

export default useCartStore;
