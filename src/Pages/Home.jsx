import React from "react";

import Categories from "../components/PizzaBlock/Categories";
import PizzaBlock from "../components/PizzaBlock";
import Sort from "../components/PizzaBlock/Sort";
import "../scss/app.scss";
import Skeleton from "../components/PizzaBlock/Skeleton";

const Home = () => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [selectedSort, setSelectedSort] = React.useState(0);
  const [activeCategory, setActiveCategory] = React.useState(0);

  const allCategories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  const sortTypes = ["популярности", "цене", "алфавиту"];

  React.useEffect(() => {
    const sortApi =
      selectedSort === 0
        ? "sortBy=rating&order=desc"
        : selectedSort === 1
        ? "sortBy=price&order=asc"
        : "sortBy=title&order=asc";
    const categoryApi = activeCategory ? `&category=${activeCategory}` : "";
    setIsLoading(true);
    fetch(
      `https://638ebd189cbdb0dbe31391f2.mockapi.io/item?` +
        sortApi +
        categoryApi
    )
      .then((resolve) => resolve.json())
      .then((data) => {
        setItems(data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [activeCategory, selectedSort]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          activeCategory={activeCategory}
          onCategorySelect={(id) => setActiveCategory(id)}
          allCategories={allCategories}
        />
        <Sort
          selectedSort={selectedSort}
          setSelectedSort={(id) => setSelectedSort(id)}
          sortTypes={sortTypes}
        />
      </div>
      <h2 className="content__title">{allCategories[activeCategory]}</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
          : items.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
      </div>
    </div>
  );
};

export default Home;
