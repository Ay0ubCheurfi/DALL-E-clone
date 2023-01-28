import React from "react";

const FormField = ({
  labelName,
  type,
  name,
  placeholder,
  value,
  handleChange,
  isSurpriseMe,
  handleSurpriseMe,
}) => {
  return (
    <div>
      <div className="mb-2 flex items-center gap-2 pb-1">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-900"
        >
          {labelName}
        </label>
        {isSurpriseMe && (
          <button
            type="button"
            onClick={handleSurpriseMe}
            className="rounded-[5px] bg-[#ECECF1] py-1 px-2 text-xs font-semibold text-black"
          >
            Surprise me
          </button>
        )}
      </div>
      <input
        required
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 outline-none focus:border-[#4669FF] focus:ring-[#4669FF] "
      />
    </div>
  );
};

export default FormField;
