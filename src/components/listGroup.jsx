import React, { Component } from "react";
class ListGroup extends Component {
  selected(item, selectedGenre) {
    if (selectedGenre === undefined) {
      if (item._id === undefined) {
        return "list-group-item active";
      }
    }
    if (selectedGenre === item) {
      return "list-group-item active";
    }
    return "list-group-item";
  }
  render() {
    const { data, handleGenre, selectedGenre } = this.props;
    return (
      <ul className="list-group my-4 text-center">
        {data.map((item) => (
          <li
            style={{ cursor: "pointer" }}
            key={item._id || item.key}
            onClick={() => handleGenre(item)}
            className={this.selected(item, selectedGenre)}
          >
            {item.name}
          </li>
        ))}
      </ul>
    );
  }
}

export default ListGroup;
