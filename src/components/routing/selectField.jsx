import React from "react";

const SelectOptionField = ({
  handleChange,
  data,
  name,
  label,
  error,
  option,
}) => {
  return (
    <div className="form-group">
      <label id={name} htmlFor={name}>
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={data[name]}
        onChange={handleChange}
        placeholder={
          label === "Username" || label === "Password" ? label : null
        }
        className="form-control"
      >
        <option value=""></option>
        {option.map((genreName) => (
          <option key={genreName._id} value={genreName._id}>
            {genreName.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default SelectOptionField;
