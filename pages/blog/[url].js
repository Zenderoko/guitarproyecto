import { Layout } from "../../components/Layout";
import Image from "next/image";
import { formatearFecha } from "../../helpers";
import styles from '../../styles/Entrada.module.css'

const EntradaBlog = ({ entrada }) => {
  if (!entrada) return <p>No existe la entrada</p>;

  const { contenido, imagen, publishedAt, titulo } = entrada;

  return (
    <Layout
      pagina={titulo}
    >
      <main className="contenedor">
        <h1 className="heading">{titulo}</h1>
        <article className={styles.entrada}>
          
          <Image
            layout='responsive'
            loading="eager"
            src={imagen[0].url}
            alt={`Imagen entrada ${titulo}`}
            width={600}
            height={400}
          />

          <div className={styles.contenido}>
            <p className={styles.fecha}>{formatearFecha(publishedAt)}</p>
            <p className={styles.texto}>{contenido}</p>
          </div>

        </article>
      </main>
    </Layout>
  );
};

export async function getStaticPaths() {
  const url = `${process.env.API_URL}/blogs`;

  const respuesta = await fetch(url);
  const entradas = await respuesta.json();

  const paths = entradas.data.map((entrada) => ({
    params: { url: entrada.url },
  }));
    

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { url } }) {
  const urlBlog = `${process.env.API_URL}/blogs?filters[url][$eq]=${url}&populate=*`;

  const respuesta = await fetch(urlBlog);
  const resultado = await respuesta.json();

  return {
    props: {
      entrada: resultado.data[0] || null,
    },
  };
}

// export async function getServerSideProps({ query: { id } }) {

//        const url = `http://localhost:1337/api/blogs?filters[id][$eq]=${id}&populate=*`;

//       const respuesta = await fetch(url);
//       const resultado = await respuesta.json();

//     return {
//         props: {
//             entrada: resultado.data[0] || null
//         }
//     }
// }

export default EntradaBlog;
