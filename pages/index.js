import { Layout } from "@components/Layout";
import Listado from "@components/Listado";
import Curso from "@components/Curso";
import ListadoBlog from "@components/ListadoBlog";

export default function Home({ guitarras, curso, entradas, guitarraHeader }) {
  
  return (
    <Layout pagina="Inicio" guitarra={guitarraHeader}>
      <main className="contenedor">
        <h1 className="heading">Nuestra Colección</h1>
        <Listado guitarras={guitarras} />
      </main>

      <Curso curso={curso} />
      
      <section className="contenedor">

      <ListadoBlog
        entradas={entradas}
      />

      </section>


    </Layout>
  );
}

export async function getServerSideProps() {
  const urlGuitarras = `${process.env.API_URL}/guitarras?populate=*`;
  const urlCursos = `${process.env.API_URL}/curso?populate=*`;
  const urlBlog = `${process.env.API_URL}/blogs?populate=*&sort=createdAt:desc&pagination[limit]=3`;

  const [resGuitarras, resCursos, resBlog] = await Promise.all([
    fetch(urlGuitarras),
    fetch(urlCursos),
    fetch(urlBlog),
  ]);

  const [guitarras, curso, entradas] = await Promise.all([
    resGuitarras.json(),
    resCursos.json(),
    resBlog.json(),
  ]);

  // elegir una guitarra aleatoria
  const guitarraHeader =
    guitarras.data[Math.floor(Math.random() * guitarras.data.length)]
  
  console.log(guitarras)
  return {
    props: {
      guitarras: guitarras.data,
      curso: curso.data,
      entradas: entradas.data,
      guitarraHeader
    },
  };
}
