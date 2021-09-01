import React from "react";
import _ from "lodash";

const Pagination = ({ data, page, handlePageSelected }) => {
  const pages = Math.ceil(data.length / page.pageSize + 1);
  const rangePages = _.range(1, pages); // [1,2,3]
  return (
    <ul className="pagination">
      {/* eslint-disable  */}
      {rangePages.map((num) => (
        <li
          key={num}
          onClick={() => handlePageSelected(num)}
          className={
            page.currentPage === num ? "page-item active" : "page-item"
          }
        >
          <a className="page-link">{num}</a>
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
