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
  const isSearch = React.useRef(false); // после первого рендера и изменении параметров сортировки меняется на true
  const isMounted = React.useRef(false);
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

  const fetchPizzaz = () => {
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
  };

  // отправить в redux, если при первом рендере забиты поисковые параметры
  React.useEffect(() => {
    // window.location.search возвращает поисковые параметры, включая "?" и далее
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortTypes.find(
        (obj) => obj.sortProperty === params.sortProperty
      );
      dispatch(setFilters({ ...params, sort }));
    }
    isSearch.current = true;
  }, []);

  // основной рендер, направляющий запросы на сервер при изменении параметров сортировки
  React.useEffect(() => {
    if (isSearch.current) {
      fetchPizzaz();
    }
    isSearch.current = true;
  }, [activeCategory, selectedSort, searchValue, currentPage]);

  // если изменили параметры и был первый рендер
  React.useEffect(() => {
    //  если был первый рендер, то вбивай данные в url
    if (isMounted.current) {
      // создаем строку с по типу api запроса, например: sortProperty=rating&activeCategory=3&currentPage=1
      const queryString = qs.stringify({
        sortProperty: selectedSort.sortProperty,
        activeCategory,
        currentPage,
      });
      // задаем url полученный от queryString путь
      navigate.push(`?${queryString}`);
    }

    isMounted.current = true; // меняем на true после первого рендера
  }, [activeCategory, selectedSort, currentPage]);

  // при изменении параметров сортировки менять текущую страницу на первую
  React.useEffect(() => {
    dispatch(setCurrentPage(1));
  }, [activeCategory, selectedSort, searchValue]);

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
