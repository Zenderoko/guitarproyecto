import Link from "next/link";

import styles from "../styles/Footer.module.css";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`contenedor ${styles.contenido}`}>
        <nav className={styles.navegacion}>
          <Link href="/">Inicio</Link>
          <Link href="/nosotros">Nosotros</Link>
          <Link href="/Blog">Blog</Link>
          <Link href="/tienda">Tienda</Link>
        </nav>

        <p className={styles.copyright}>Todos los derechos Reservados</p>
      </div>
    </footer>
  );
};
