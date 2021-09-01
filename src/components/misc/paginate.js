import _ from "lodash";

export const Paginate = (items, currentPage, pageSize) => {
  return _(items)
    .slice((currentPage - 1) * pageSize) // [0-3] [4-8] [8-9]
    .take(pageSize) // take four arrays
    .value();
};
