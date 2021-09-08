import React from "react";

const InputField = ({ handleChange, data, name, label, type, error }) => {
  return (
    <div className="form-group">
      <label id={name} htmlFor={name}>
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={data[name]}
        onChange={handleChange}
        placeholder={
          label === "Username" || label === "Password" || label === "Email"
            ? label
            : ""
        }
        className="form-control"
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default InputField;
