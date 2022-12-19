import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Categories from "../components/PizzaBlock/Categories";
import PizzaBlock from "../components/PizzaBlock";
import Sort from "../components/PizzaBlock/Sort";
import "../scss/app.scss";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";
import axios from "axios";
import { setCurrentPage, setFilters } from "../redux/slices/filterSlice";
import qs from "qs";
import { useHistory } from "react-router-dom";

const Home = ({ searchValue }) => {
  const { selectedSort, activeCategory } = useSelector((state) => state.filter);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.filter.currentPage);
  const itemsOnPage = 4;
  const navigate = useHistory();

  const allCategories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  const sortTypes = [
    { name: "популярности Desc", sortProperty: "rating" },
    { name: "популярности Asc", sortProperty: "-rating" },
    { name: "цене Desc", sortProperty: "price" },
    { name: "цене Asc", sortProperty: "-price" },
    { name: "алфавиту Desc", sortProperty: "title" },
    { name: "алфавиту Asc", sortProperty: "-title" },
  ];

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      console.log(params, "params");
      const sort = sortTypes.find(
        (obj) => obj.sortProperty === params.sortProperty
      );
      console.log(sort, "sort");
      dispatch(setFilters({ ...params, sort }));
    }
  }, []);

  React.useEffect(() => {
    const sortApi = selectedSort.sortProperty.replace("-", "");
    const sortApiType = selectedSort.sortProperty.includes("-")
      ? "asc"
      : "desc";
    const categoryApi = activeCategory ? `&category=${activeCategory}` : "";
    const serchedItems = searchValue ? `&search=${searchValue}` : "";
    setIsLoading(true);
    axios
      .get(
        `https://638ebd189cbdb0dbe31391f2.mockapi.io/items?sortBy=${sortApi}${serchedItems}&order=${sortApiType}&page=${currentPage}&limit=${itemsOnPage}` +
          categoryApi
      )
      .then((data) => {
        setItems(data.data);
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [activeCategory, selectedSort, searchValue, currentPage]);

  React.useEffect(() => {
    dispatch(setCurrentPage(1));
  }, [activeCategory, selectedSort, searchValue]);

  React.useEffect(() => {
    const queryString = qs.stringify({
      sortProperty: selectedSort.sortProperty,
      activeCategory,
      currentPage,
    });

    navigate.push(`?${queryString}`);
  }, [activeCategory, selectedSort, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories allCategories={allCategories} />
        <Sort sortTypes={sortTypes} />
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
