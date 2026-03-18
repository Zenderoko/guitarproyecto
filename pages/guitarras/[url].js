import Image from "next/image";
import { Layout } from "@components/Layout";
import styles from "@styles/Guitarra.module.css";
import { useState } from "react";
import useCartStore from "store/cartStore";
import toast from "react-hot-toast";

const Producto = ({ guitarra }) => {
  const {id, nombre, precio, descripcion, imagen } = guitarra;
  
  
  const [cantidad, setCantidad] = useState("")

  const addToCart = useCartStore(state => state.addToCart);
  
  // Al seleccionar la cantidad a agregar al carrito, se llama a esta función handleSubmit
  const handleSubmit = (e) => {

    e.preventDefault();

    if (cantidad === "") {
      toast.error("Debes seleccionar una cantidad")
      return;
    }

      // Se agrega al store, utilizando su funcion addToCart
    addToCart({
      id,
      nombre,
      precio,
      quantity: cantidad,
      imagen: imagen.url      
    });
    toast.success(`${nombre} agregado al carrito 🛒`);
  }

  return (
    <Layout pagina={`Guitarra ${nombre}`}>
      <div className={styles.guitarra}>
        <Image
          layout="responsive"
          width={500}
          height={350}
          src={imagen.url}
          alt={`Imagen Guitarra ${nombre}`}
        />
        <div className={styles.contenido}>
          <h3>{nombre}</h3>
          <p className={styles.descripcionCompleta}>{descripcion}</p>
          <p className={styles.precio}>${precio}</p>

          <form className={styles.formulario} onSubmit={handleSubmit}>
            <label>Cantidad</label>

            <select 
              value={cantidad}
              onChange={(e) => setCantidad(Number(e.target.value))}
            >
              <option value="">Seleccione</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
            </select>

            <input type="submit" value="Agregar al Carrito" />
          </form>
        </div>
      </div>
    </Layout>
  );
};

// Llamada a la api para obtener las guitarras
export async function getServerSideProps({ query: { url } }) {
  const urlGuitarra = `${process.env.API_URL}/guitarras?filters[url][$eq]=${url}&populate=*`;
  const respuesta = await fetch(urlGuitarra);
  const guitarra = await respuesta.json();

  
  return {
    props: {
      guitarra: guitarra.data[0] || null,
    },
  };
}

export default Producto;
