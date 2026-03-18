

import { Layout } from '../components/Layout'
import ListadoBlog from '@components/ListadoBlog'


 // Componente de blog que recibe las entradas como props para mostrar en el cliente
 const Blog = ({entradas}) => {
  
  
  return (
    
    <Layout pagina='Blog'>
        <main className='contenedor'>
          <ListadoBlog entradas={entradas}/>
           

        </main>
    </Layout>
    
    
  )
}

  // Consulta a la API de Strapi para obtener las entradas del blog 
  export async function getStaticProps() {

      const url = `${process.env.API_URL}/blogs?populate=*&sort=createdAt:desc`
      const respuesta = await fetch(url)
      const entradas = await respuesta.json()
     

      return {
        props: {
          entradas: entradas.data
        
        },
      }
  }

export default Blog
