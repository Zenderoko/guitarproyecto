"use client";

import useCartStore from "../store/cartStore";
import { Layout } from "@components/Layout";
import styles from "../styles/Pago.module.css";
import Image from "next/image";
import useStore from "../hooks/useStore";
import { IoTrashBinOutline } from "react-icons/io5";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";

export default function Pago() {
  const router = useRouter();
  const cart = useStore(useCartStore, (state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const total = useCartStore((state) => state.total);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const handlePagar = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/pago/init", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: total(),
          cart: cart,
        }),
      });

      const data = await response.json();

      if (data.url && data.token) {
        window.location.href = `${data.url}?token_ws=${data.token}`;
      } else if (data.error) {
        alert("Error: " + data.error);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error al iniciar pago:", error);
      alert("Error al procesar el pago");
      setLoading(false);
    }
  };

  const handleVolver = () => {
    router.push("/carrito");
  };

  if (!cart) return null;

  return (
    <Layout pagina={"Checkout - Resumen del Pedido"}>
      <h1 className="heading">Resumen del Pedido</h1>

      <main className={`${styles.contenido} contenedor`}>
        <div className={styles.carrito}>
          <div className={styles.headerButtons}>
            <button
              className={styles.editarBtn}
              onClick={() => setEditMode(!editMode)}
            >
              <FaEdit /> {editMode ? "Finalizar edición" : "Editar pedido"}
            </button>
          </div>

          <h2>Articulos</h2>
          {cart.length === 0 ? (
            <p>Tu carrito está vacío</p>
          ) : (
            cart.map((product) => (
              <div key={product.id} className={styles.producto}>
                <div>
                  <Image
                    src={product.imagen}
                    width={120}
                    height={120}
                    alt={`Imagen ${product.nombre}`}
                  />
                </div>
                <div>
                  <h3 className={styles.nombre}>Guitarra {product.nombre}</h3>
                  
                  {editMode ? (
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
                  ) : (
                    <p className={styles.cantidadFija}>
                      Cantidad: {product.quantity}
                    </p>
                  )}

                  <p className={styles.precio}>
                    $<span>{product.precio}</span>
                  </p>
                  <p className={styles.subtotal}>
                    Subtotal: $<span>{product.precio * product.quantity}</span>
                  </p>
                </div>

                {editMode && (
                  <button
                    className={styles.eliminar}
                    onClick={() => removeFromCart(product.id)}
                  >
                    <IoTrashBinOutline />
                  </button>
                )}
              </div>
            ))
          )}
        </div>

        <div className={styles.resumen}>
          <h3>Total a Pagar</h3>
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
              <p className={styles.total}>Total: ${total()}</p>
              
              <div className={styles.metodoPago}>
                <h4>Método de Pago</h4>
                <p className={styles.webpayBadge}>
                  🇨🇱 Pagado con Webpay (Transbank)
                </p>
              </div>

              <div className={styles.acciones}>
                <button
                  className={styles.pagarBtn}
                  onClick={handlePagar}
                  disabled={loading || cart.length === 0}
                >
                  {loading ? "Procesando..." : "Pagar con Webpay"}
                </button>
                <button
                  className={styles.volverBtn}
                  onClick={handleVolver}
                  disabled={loading}
                >
                  Volver al Carrito
                </button>
              </div>

              <p className={styles.seguro}>
                🔒 Pago seguro con Transbank - Tus datos están protegidos
              </p>
            </>
          ) : (
            <p>No hay productos en el carrito</p>
          )}
        </div>
      </main>
    </Layout>
  );
};