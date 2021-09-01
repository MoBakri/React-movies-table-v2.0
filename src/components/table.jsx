import React, { Component } from "react";
import Like from "./common/like";
import { Link } from "react-router-dom";

class Table extends Component {
  sortOrder(headItem, sort) {
    if (headItem.path === sort.path) {
      if (sort.order === "asc") {
        return <i className="fa fa-sort-up"></i>;
      }
      if (sort.order === "desc") {
        return <i className="fa fa-sort-down"></i>;
      }
    }
  }
  render() {
    const { data, handleDelete, handleLike, handleHeadTable, sort } =
      this.props;
    const column = [
      { path: "title", label: "Title", content: "" },
      { path: "genre.name", label: "Genre", content: "" },
      { path: "dailyRentalRate", label: "Rate", content: "" },
      { path: "numberInStock", label: "Stock", content: "" },
      { key: "like", content: "" },
      { key: "del", content: "" },
    ];
    return (
      <table className="table table-bordered">
        <thead className="thead-light">
          <tr className="text-center">
            {column.map((headItem) => (
              <th key={headItem.path || headItem.key}>
                <label
                  style={{ cursor: "pointer" }}
                  onClick={() => handleHeadTable(headItem)}
                >
                  {headItem.label}{" "}
                  {headItem.label ? this.sortOrder(headItem, sort) : ""}
                </label>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-center">
          {data.map((item) => (
            <tr key={item._id}>
              <td>
                <Link to={`/movies/${item._id}`}>{item.title}</Link>
              </td>
              <td>{item.genre.name}</td>
              <td>{item.dailyRentalRate}</td>
              <td>{item.numberInStock}</td>
              <td>
                <Like handleLike={handleLike} liked={item} />
              </td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  value={data.length}
                  onClick={() => handleDelete(item, data.length)}
                >
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default Table;
