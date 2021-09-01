import React from "react";

const SearchField = ({ data, onSearch }) => {
  return (
    <input
      className="form-control my-3"
      type="text"
      placeholder="Search"
      aria-label="Search"
      name="text"
      value={data.value}
      onChange={(e) => onSearch(e.currentTarget.value)}
    />
  );
};

export default SearchField;
