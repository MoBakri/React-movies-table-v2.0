import React, { Component } from "react";
import _ from "lodash";

class BodyTable extends Component {
  onColumn(item, columnHead) {
    if (columnHead.content) return columnHead.content(item);
    else return _.get(item, columnHead.path);
  }
  render() {
    const { data, column } = this.props;
    return (
      <tbody className="text-center">
        {data.map((item) => (
          <tr key={item._id || item.key}>
            {column.map((columnHead) => (
              <td key={columnHead.path || columnHead.key}>
                {this.onColumn(item, columnHead)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}
export default BodyTable;
