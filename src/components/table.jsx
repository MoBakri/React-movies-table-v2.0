import React from "react";
import HeadItemTable from "./headItemTable";
import BodyTable from "./bodyTable";
import Like from "./common/like";
import { Link } from "react-router-dom";

const Table = ({
  data,
  handleDelete,
  handleLike,
  handleHeadTable,
  sort,
  user,
}) => {
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
    {
      key: "del",
      content: (item) =>
        user && (
          <button
            className="btn btn-danger btn-sm"
            value={data.length}
            onClick={() => handleDelete(item, data.length)}
          >
            X
          </button>
        ),
    },
  ];
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
};

export default Table;
