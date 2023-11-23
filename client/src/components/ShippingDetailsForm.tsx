"use client";
import axios from "axios";
import { Formik } from "formik";
import { ShippingFormControl } from "./ShippingFormControl";
import { ShippingFormCountrySelect } from "./ShippingFormCountrySelect";
import { shippingFormValidationSchema } from "@/data";
import { ShippingFormData } from "@/types";
import { getShippingFormDefaultValues } from "@/utilities";
import { PrimaryButton } from "./PrimaryButton";

export const ShippingDetailsForm = ({
  shippingInfo,
  cartId,
}: {
  shippingInfo: ShippingFormData;
  cartId: string;
}) => {
  return (
    <Formik
      validationSchema={shippingFormValidationSchema}
      initialValues={{...getShippingFormDefaultValues(shippingInfo)}}
      onSubmit={async (values) => {
        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}/checkout/session`,
            {
              cart: cartId,
              ...values,
            },
            {
              headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRIPE_API_KEY}`,
              },
            },
          );
          const url = res.data.url;
          if (!url) return;
          window.location = url;
        } catch (err) {
          console.error(err);
        }
      }}
    >
      {(formik) => (
        <form
          onSubmit={formik.handleSubmit}
          className="p-5 border-t my-3 flex flex-col gap-3 w-full items-baseline md:items-stretch text-gray-700"
        >
          <span className="mb-3">
            Fields marked with an <span className="text-red-500">*</span> are
            required
          </span>
          <ShippingFormControl
            label="Email Address"
            name="email"
            htmlFor="email"
            required={true}
          />
          <ShippingFormControl
            label="First Name"
            name="firstName"
            htmlFor="firstName"
            required={true}
          />
          <ShippingFormControl
            label="Last Name"
            name="lastName"
            htmlFor="lastName"
            required={true}
          />
          <ShippingFormControl
            label="Company"
            name="company"
            htmlFor="company"
            required={false}
          />
          <ShippingFormControl
            label="Address"
            name="streetAddressOne"
            htmlFor="streetAddressOne"
            required={true}
          />
          <ShippingFormControl
            label="Address line 2"
            name="streetAddressTwo"
            htmlFor="streetAddressTwo"
            required={false}
          />
          <ShippingFormControl
            label="Address line 3"
            name="streetAddressThree"
            htmlFor="streetAddressThree"
            required={false}
          />
          <ShippingFormCountrySelect
            value={formik.values.country}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            touched={formik.touched.country}
            error={formik.errors.country}
          />
          <ShippingFormControl
            label="City"
            name="city"
            htmlFor="city"
            required={true}
          />
          <ShippingFormControl
            label="Postcode"
            name="postcode"
            htmlFor="postcode"
            required={true}
          />
          <ShippingFormControl
            label="Phone Number"
            name="phoneNumber"
            htmlFor="phoneNumber"
            required={true}
          />
          <div className="w-full flex justify-end mt-6 gap-3 flex-col md:flex-row px-3">
            <PrimaryButton type="submit" text="Continue" />
          </div>
        </form>
      )}
    </Formik>
  );
};
