import React from "react";

const Categories = ({ onCategorySelect, activeCategory, allCategories }) => {
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
