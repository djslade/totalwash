"use client";

export const ShippingFormControl = ({
  label,
  name,
  required,
  value,
  onChange,
  onBlur,
  touched,
  error,
}: any) => {
  return (
    <div className="flex gap-2 md:gap-5 items-start justify-between flex-col md:flex-row w-full">
      <label htmlFor={name} className="whitespace-nowrap text-right">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <div className="flex flex-col gap-3 md:max-w-xs w-full md:w-screen">
        <input
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={required === true ? "required" : "optional"}
          id={name}
          className="py-0.5 px-2 border rounded-sm bg-gray-50 border-gray-900 focus:form-input outline-none md:max-w-xs w-full md:w-screen"
          type="text"
        />
        <span className="text-red-500">{touched && (error as string)}</span>
      </div>
    </div>
  );
};
