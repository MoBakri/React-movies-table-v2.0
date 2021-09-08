import React, { Component } from "react";
import HeadItemTable from "./headItemTable";
import BodyTable from "./bodyTable";
import Like from "./common/like";
import { Link } from "react-router-dom";
import auth from "./services/authService";
class Table extends Component {
  render() {
    const { data, handleDelete, handleLike, handleHeadTable, sort } =
      this.props;

    const column = [
      {
        path: "title",
        label: "Title",
        content: (item) => <Link to={`/movies/${item._id}`}>{item.title}</Link>,
      },
      { path: "genre.name", label: "Genre" },
      { path: "dailyRentalRate", label: "Rate" },
      { path: "numberInStock", label: "Stock" },
      {
        key: "like",
        content: (item) => <Like handleLike={handleLike} liked={item} />,
      },
    ];
    const deleteColumn = {
      key: "del",
      content: (item) => (
        <button
          className="btn btn-danger btn-sm"
          value={data.length}
          onClick={() => handleDelete(item, data.length)}
        >
          Delete
        </button>
      ),
    };
    const users = auth.getCurrentUser();
    if (users && users.isAdmin) column.push(deleteColumn);
    return (
      <table className="table table-bordered">
        <thead className="thead-light">
          <HeadItemTable
            column={column}
            handleHeadTable={handleHeadTable}
            sort={sort}
          />
        </thead>
        <BodyTable data={data} column={column} />
      </table>
    );
  }
}
export default Table;
