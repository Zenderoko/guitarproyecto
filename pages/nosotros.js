import { Layout } from "../components/Layout";
import Image from "next/image";
import styles from '../styles/Nosotros.module.css'

export default function Nosotros() {
  return (
    <>
      <Layout pagina="Nosotros">
        <main className="contenedor">
          <h2 className="heading">Nosotros</h2>

          <div className={styles.contenido}>
            <Image layout="responsive"
              src="/img/nosotros.jpg"
              width={600}
              height={450}
              alt="imagen nosotros"
            />

            <div>
              <p>
               En Guitar LA, nos apasiona el mundo de la música y creemos en el poder transformador que tiene en nuestras vidas. Nuestro objetivo es proporcionarte recursos y conocimientos para ayudarte a desarrollar tu pasión por la guitarra y alcanzar tus metas musicales. 
              </p>
              <p>
                Nos enorgullecemos de ofrecer contenido educativo de alta calidad, desde tutoriales prácticos hasta guías informativas, diseñadas para satisfacer las necesidades de guitarristas de todos los niveles, desde principiantes hasta profesionales. 
              </p>
              <p>
                Con años de experiencia en la industria musical, nuestro equipo está formado por apasionados músicos y educadores comprometidos con tu éxito. Estamos aquí para brindarte el apoyo y la orientación que necesitas para mejorar tus habilidades, explorar nuevos estilos y descubrir tu propio sonido único. 
              </p>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
}

// export const getServerSideProps = async () => {
//   const res = await fetch(`${process.env.API_URL}/games`);
//   const games = await res.json();
//   return {
//     props: {
//       game: games,
//     },
//   };
// };
