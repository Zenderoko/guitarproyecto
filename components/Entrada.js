import Link from "next/link";
import Image from "next/image";
import { formatearFecha } from "../helpers";
import styles from "../styles/Entrada.module.css";

const Entrada = ({ entrada }) => {
  const { titulo, resumen, imagen, publishedAt, id , url} = entrada;

  return (
    <article>
      <Image
        src={imagen[0].url}
        alt={`Imagen entrada ${titulo}`}
        width={800}
        height={600}
        style={{width: 'auto', height: 'auto'}}
        priority
        
      />
      <div className={styles.contenido}>
        <h3>{`${titulo}`}</h3>
        <p className={styles.fecha}>{formatearFecha(publishedAt)}</p>
        <p className={styles.resumen}>{resumen}</p>
        <Link href={`/blog/${url}`} className={styles.enlace}>
          Leer Entrada
        </Link>
      </div>
    </article>
  );
};

export default Entrada;
