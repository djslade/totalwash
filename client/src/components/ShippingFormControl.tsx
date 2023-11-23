"use client";

import { useField } from "formik";

interface FormControlProps {
  label: string;
  htmlFor: string;
  required: boolean;
  name: string;
  validate?: (value: any) => undefined | string | Promise<any>;
  type?: string;
  multiple?: boolean;
  value?: string;
}
export const ShippingFormControl = ({
  label, htmlFor, required, ...props
}: FormControlProps) => {
  const [field, meta] = useField(props);
  return (
    <div className="flex gap-2 md:gap-5 items-start justify-between flex-col md:flex-row w-full">
      <label htmlFor={htmlFor} className="whitespace-nowrap text-right">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <div className="flex flex-col gap-3 md:max-w-xs w-full md:w-screen">
        <input
          {...field}
          {...props}
          placeholder={required === true ? "required" : "optional"}
          className="py-0.5 px-2 border rounded-sm bg-gray-50 border-gray-900 focus:form-input outline-none md:max-w-xs w-full md:w-screen"
          type="text"
        />
        <span className="text-red-500">{meta.touched && (meta.error as string)}</span>
      </div>
    </div>
  );
};
