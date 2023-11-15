import { CountryDropdown } from "react-country-region-selector";

export const ShippingFormCountrySelect = ({
  value,
  onChange,
  onBlur,
  touched,
  error,
}: any) => {
  return (
    <div className="flex gap-2 md:gap-5 items-start justify-between flex-col md:flex-row w-full">
      <label htmlFor="country" className="whitespace-nowrap text-right">
        Country <span className="text-red-500">*</span>
      </label>
      <div className="flex flex-col gap-3 md:max-w-xs w-full md:w-screen">
        <CountryDropdown
          name="country"
          value={value}
          onChange={(_, e) => onChange(e)}
          onBlur={onBlur}
          id="country"
          classes="py-0.5 px-2 border rounded-sm bg-gray-50 border-gray-900 focus:form-input outline-none md:max-w-xs w-full md:w-screen"
        />
        <span className="text-red-500">{touched && (error as string)}</span>
      </div>
    </div>
  );
};
