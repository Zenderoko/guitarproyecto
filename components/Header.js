import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Header.module.css";
import { useRouter } from "next/router";
import useCartStore from "store/cartStore";
import useStore from "hooks/useStore";
import {useState, useEffect} from "react"

export const Header = ({ guitarra }) => {
  const router = useRouter();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  
  const imagenUrl = guitarra?.imagen?.url || "/img/header_guitarra.png";
  const items = useStore(useCartStore,(state => state.itemsCount()));
  return (
    <header className={styles.header}>
      <div className="contenedor">
        <div className={styles.barra}>
          <Link href="/">
            <Image
              src="/img/logo.svg"
              width={400}
              height={100}
              alt="logo guitarla"
            />
          </Link>
          <nav className={styles.navegacion}>
            <Link href="/">Inicio</Link>
            <Link href="/nosotros">Nosotros</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/tienda">Tienda</Link>
            <Link href="/carrito">
              
                <Image
                  layout="fixed"
                  width={30}
                  height={25}
                  src="/img/carrito.png"
                  alt="Imagen carrito"
                ></Image>
                {mounted && items}
              
            </Link>
          </nav>
        </div>

        {guitarra && (
          <div className={styles.modelo}>
            <h2>Modelo {guitarra.nombre}</h2>
            <p className={styles.descripcion}>{guitarra.descripcion}</p>
            <p className={styles.precio}>{guitarra.precio}</p>
            <Link className={styles.enlace} href={`/guitarras/${guitarra.url}`}>
              Ver Producto
            </Link>
          </div>
        )}

        {router.pathname === "/" && guitarra && (
          <div className={styles.guitarra}>
            <Image
              fill
              style={{ objectFit: "contain" }}
              src={imagenUrl}
              alt="foto guitarra"
            />
          </div>
        )}
      </div>
    </header>
  );
};
