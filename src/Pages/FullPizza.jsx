import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

const FullPizza = () => {
  const { id } = useParams();
  const [pizza, setPizza] = useState();
  const navigate = useHistory();

  useEffect(() => {
    async function fetchPizza() {
      try {
        // id, imageUrl, title, types, sizes, price
        const { data } = await axios.get(
          `https://638ebd189cbdb0dbe31391f2.mockapi.io/items/${id}`
        );
        setPizza(data);
      } catch (error) {
        console.log(error);
        navigate.push("/");
      }
    }
    fetchPizza();
  }, [id]);

  if (!pizza) {
    return "Загрузка...";
  }
  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="img" />
      <h2>{pizza.title}</h2>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum cum
        molestiae quidem culpa eveniet voluptatem nam est eum, alias quibusdam
        maiores ut quam inventore officia ex sequi iste dolor et?
      </p>
      <h4>250 ₽</h4>
    </div>
  );
};

export default FullPizza;
