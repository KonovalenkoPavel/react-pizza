import React from "react";
import { useSelector } from "react-redux";

import Categories from "../components/PizzaBlock/Categories";
import PizzaBlock from "../components/PizzaBlock";
import Sort from "../components/PizzaBlock/Sort";
import "../scss/app.scss";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";

const Home = ({ searchValue }) => {
  const { selectedSort, activeCategory } = useSelector((state) => state.filter);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  // const [selectedSort, setSelectedSort] = React.useState({
  //   name: "популярности Desc",
  //   sortProperty: "rating",
  // });
  // const [activeCategory, setActiveCategory] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsOnPage = 4;

  const allCategories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  React.useEffect(() => {
    const sortApi = selectedSort.sortProperty.replace("-", "");
    const sortApiType = selectedSort.sortProperty.includes("-")
      ? "asc"
      : "desc";
    const categoryApi = activeCategory ? `&category=${activeCategory}` : "";
    const serchedItems = searchValue ? `&search=${searchValue}` : "";
    setIsLoading(true);
    fetch(
      `https://638ebd189cbdb0dbe31391f2.mockapi.io/item?sortBy=${sortApi}${serchedItems}&order=${sortApiType}&page=${currentPage}&limit=${itemsOnPage}` +
        categoryApi
    )
      .then((resolve) => resolve.json())
      .then((data) => {
        setItems(data);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [activeCategory, selectedSort, searchValue, currentPage]);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, selectedSort, searchValue]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories allCategories={allCategories} />
        <Sort />
      </div>
      <h2 className="content__title">{allCategories[activeCategory]}</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
          : items.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        items={items}
        itemsOnPage={itemsOnPage}
      />
    </div>
  );
};

export default Home;
