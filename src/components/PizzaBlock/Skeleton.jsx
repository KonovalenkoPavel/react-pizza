import React from "react";
import ContentLoader from "react-content-loader";

const MyLoader = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="130" cy="130" r="130" />
    <rect x="0" y="284" rx="10" ry="10" width="280" height="27" />
    <rect x="0" y="322" rx="10" ry="10" width="280" height="74" />
    <rect x="8" y="412" rx="10" ry="10" width="89" height="27" />
    <rect x="128" y="410" rx="20" ry="20" width="150" height="44" />
  </ContentLoader>
);

export default MyLoader;
