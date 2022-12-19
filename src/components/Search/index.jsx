import React from "react";
import { SearchContaxt } from "../../App";
import style from "./Search.module.scss";
import debounce from "lodash.debounce";

const Search = () => {
  const { setSearchValue } = React.useContext(SearchContaxt);
  const [value, setValue] = React.useState("");
  const inputRef = React.useRef();

  const onClickClear = () => {
    setSearchValue("");
    setValue("");
    inputRef.current.focus();
  };

  const onFounChange = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  const updateSearchValue = React.useCallback(
    debounce((text) => {
      setSearchValue(text);
    }, 1000),
    []
  );

  return (
    <div className={style.root}>
      <svg
        className={style.icon}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title />
        <path
          d="M20.56,18.44l-4.67-4.67a7,7,0,1,0-2.12,2.12l4.67,4.67a1.5,1.5,0,0,0,2.12,0A1.49,1.49,0,0,0,20.56,18.44ZM5,10a5,5,0,1,1,5,5A5,5,0,0,1,5,10Z"
          fill="#464646"
        />
      </svg>
      <input
        ref={inputRef}
        value={value}
        onChange={(e) => onFounChange(e)}
        className={style.input}
        placeholder="Поиск пиццы..."
      />
      {value && (
        <svg
          className={style.close}
          onClick={onClickClear}
          height="48"
          viewBox="0 0 48 48"
          width="48"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M38 12.83l-2.83-2.83-11.17 11.17-11.17-11.17-2.83 2.83 11.17 11.17-11.17 11.17 2.83 2.83 11.17-11.17 11.17 11.17 2.83-2.83-11.17-11.17z" />
          <path d="M0 0h48v48h-48z" fill="none" />
        </svg>
      )}
    </div>
  );
};

export default Search;
