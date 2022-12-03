import React from "react";

const Categories = () => {
  const [activeCategory, setActiveCategory] = React.useState(0);
  const allCategories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  const handleCategoryChange = (index) => {
    setActiveCategory(index);
  };

  return (
    <div className="categories">
      <ul>
        {allCategories.map((category, i) => (
          <li
            className={i === activeCategory ? "active" : ""}
            onClick={() => handleCategoryChange(i)}
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
