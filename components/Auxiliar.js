import {useEffect, useState } from "react";

export default function Auxiliar() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const peticion = async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await res.json();
      setItems(data);
    };
    peticion();
  }, []);

  return <div>
    {
        items.map(item => (
            <div key={item.id}>
                <h4>{item.name}</h4>
                <p>{item.username}</p>
            </div>
        ))    
    }
  </div>;
}
