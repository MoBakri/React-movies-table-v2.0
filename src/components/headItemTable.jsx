import React, { Component } from "react";

class HeadItemTable extends Component {
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
    const { column, handleHeadTable, sort } = this.props;
    return (
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
    );
  }
}

export default HeadItemTable;
