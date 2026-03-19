import useCartStore from "../store/cartStore";
import { Layout } from "@components/Layout";
import styles from "@styles/Carrito.module.css";
import Image from "next/image";
import useStore from "../hooks/useStore";
import { IoTrashBinOutline } from "react-icons/io5";
import { useRouter } from "next/router";

const Carrito = () => {
  const router = useRouter();
  const cart = useStore(useCartStore, (state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const total = useCartStore((state) => state.total);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  if (!cart) return null;

  return (
    <Layout pagina={"Carrito de Compras"}>
      <h1 className="heading">Carrito</h1>

      <main className={`${styles.contenido} contenedor`}>
        <div className={styles.carrito}>
          <h2>Articulos</h2>
          {cart.length === 0 ? (
            <p>Tu carrito está vacío</p>
          ) : (
            cart.map((product) => (
              <div key={product.id} className={styles.producto}>
                <div>
                  <Image
                    src={product.imagen}
                    width={200}
                    height={200}
                    alt={`Imagen ${product.nombre}`}
                  />
                </div>
                <div>
                  <h3 className={styles.nombre}>Guitarra {product.nombre}</h3>
                  <div className={styles.cantidad}>
                    <p>Cantidad:</p>

                    <select
                      className={styles.select}
                      value={product.quantity}
                      onChange={(e) =>
                        updateQuantity({
                          quantity: Number(e.target.value),
                          id: product.id,
                        })
                      }
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                    </select>
                  </div>

                  <p className={styles.precio}>
                    {" "}
                    $<span>{product.precio}</span>
                  </p>
                  <p className={styles.subtotal}>
                    Subtotal: $<span>{product.precio * product.quantity}</span>
                  </p>
                </div>

                <button
                  className={styles.eliminar}
                  onClick={() => removeFromCart(product.id)}
                >
                  <IoTrashBinOutline />
                </button>
              </div>
            ))
          )}
          <h2>Total: ${total()}</h2>
        </div>
        <div className={styles.resumen}>
          <h3>Resumen del Pedido</h3>
          {total() > 0 ? (
            <>
              <ul>
                {cart.map((product) => (
                  <li key={product.id}>
                    {product.nombre} x {product.quantity} = $
                    {product.precio * product.quantity}
                  </li>
                ))}
              </ul>
              <p className={styles.total}>Total a pagar: ${total()}</p>
              <button
                className={styles.pagarBtn}
                onClick={() => router.push("/pago")}
              >
                Pagar
              </button>
            </>
          ) : (
            <p>No hay productos en el carrito</p>
          )}
        </div>
      </main>
    </Layout>
  );
};

export default Carrito;
