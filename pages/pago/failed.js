"use client";

import { Layout } from "@components/Layout";
import styles from "../../styles/Pago.module.css";
import { useRouter } from "next/router";

export default function Failed() {
  const router = useRouter();
  const { error, code } = router.query;

  return (
    <Layout pagina={"Pago Fallido"}>
      <div className="contenedor">
        <div className={styles.resultadoContainer}>
          <div className={styles.errorIcon}>✗</div>
          <h1 className="heading">Pago No Completado</h1>
          <p className={styles.resultadoMensaje}>
            Hubo un problema al procesar tu pago.
          </p>
          {error && (
            <p className={styles.resultadoDetalle}>
              Error: <strong>{decodeURIComponent(error)}</strong>
            </p>
          )}
          {code && (
            <p className={styles.resultadoDetalle}>
              Código de error: <strong>{code}</strong>
            </p>
          )}
          <div className={styles.acciones}>
            <button
              className={styles.pagarBtn}
              onClick={() => router.push("/pago")}
            >
              Intentar nuevamente
            </button>
            <button
              className={styles.volverBtn}
              onClick={() => router.push("/carrito")}
            >
              Volver al carrito
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}