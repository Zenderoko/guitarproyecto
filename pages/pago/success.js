"use client";

import { Layout } from "@components/Layout";
import styles from "../../styles/Pago.module.css";
import { useEffect } from "react";
import useCartStore from "../../store/cartStore";
import { useRouter } from "next/router";

export default function Success() {
  const router = useRouter();
  const { token, buyOrder } = router.query;
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    if (token) {
      clearCart();
    }
  }, [token, clearCart]);

  return (
    <Layout pagina={"Pago Exitoso"}>
      <div className="contenedor">
        <div className={styles.resultadoContainer}>
          <div className={styles.successIcon}>✓</div>
          <h1 className="heading">¡Pago Realizado Exitosamente!</h1>
          <p className={styles.resultadoMensaje}>
            Tu pedido ha sido procesado correctamente.
          </p>
          {buyOrder && (
            <p className={styles.resultadoDetalle}>
              Número de orden: <strong>{buyOrder}</strong>
            </p>
          )}
          <p className={styles.resultadoDetalle}>
            Gracias por tu compra en My Guitarra LA
          </p>
          <button
            className={styles.pagarBtn}
            onClick={() => router.push("/")}
          >
            Volver a la tienda
          </button>
        </div>
      </div>
    </Layout>
  );
}