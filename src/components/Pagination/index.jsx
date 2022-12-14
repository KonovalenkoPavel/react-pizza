import { useDispatch } from "react-redux";
import styles from "./Pagination.module.scss";

const Pagination = ({ currentPage, setCurrentPage, itemsOnPage }) => {
  const pageCount = Math.ceil(10 / itemsOnPage);
  const pagesArray = [];
  const dispatch = useDispatch();

  for (let i = 1; i <= pageCount; i++) {
    pagesArray.push(i);
  }
  return (
    <div className={styles.container}>
      {currentPage !== 1 && (
        <div
          onClick={() => dispatch(setCurrentPage(currentPage - 1))}
          className={styles.item}
        >
          {"<"}
        </div>
      )}

      {pagesArray.map((page) => (
        <div
          onClick={() => dispatch(setCurrentPage(page))}
          key={page}
          className={
            styles.item + " " + (currentPage === page ? styles.active : "")
          }
        >
          {page}
        </div>
      ))}
      {currentPage !== pageCount && (
        <div
          onClick={() => dispatch(setCurrentPage(currentPage + 1))}
          className={styles.item}
        >
          {">"}
        </div>
      )}
    </div>
  );
};

export default Pagination;
