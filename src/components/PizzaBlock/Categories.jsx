import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setActiveCategory } from "../../redux/slices/filterSlice";

const Categories = ({ allCategories }) => {
  const activeCategory = useSelector((state) => state.filter.activeCategory);
  const dispatch = useDispatch();

  const onCategorySelect = (index) => {
    dispatch(setActiveCategory(index));
  };

  return (
    <div className="categories">
      <ul>
        {allCategories.map((category, i) => (
          <li
            className={i === activeCategory ? "active" : ""}
            onClick={() => onCategorySelect(i)}
            key={category}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
