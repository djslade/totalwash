"use client";
import axios from "axios";
import { useFormik } from "formik";
import { ShippingFormControl } from "./ShippingFormControl";
import { ShippingFormCountrySelect } from "./ShippingFormCountrySelect";
import { shippingFormValidationSchema } from "@/data";

export const ShippingDetailsForm = ({
  shippingInfo,
  cartId,
}: {
  shippingInfo: any;
  cartId: string;
}) => {
  const formik = useFormik({
    validationSchema: shippingFormValidationSchema,
    initialValues: {
      email: shippingInfo?.email || "",
      firstName: shippingInfo?.firstName || "",
      lastName: shippingInfo?.lastName || "",
      company: shippingInfo?.company || "",
      streetAddressOne: shippingInfo?.streetAddressOne || "",
      streetAddressTwo: shippingInfo?.streetAddressTwo || "",
      streetAddressThree: shippingInfo?.streetAddressThree || "",
      country: shippingInfo?.country || "",
      city: shippingInfo?.city || "",
      postcode: shippingInfo?.postcode || "",
      phoneNumber: shippingInfo?.phoneNumber || "",
    },
    onSubmit: async (values) => {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/checkout/session`,
          {
            cart: cartId,
            ...values
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
    },
  });

  return (
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
        required={true}
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        touched={formik.touched.email}
        error={formik.errors.email}
      />
      <ShippingFormControl
        label="First Name"
        name="firstName"
        required={true}
        value={formik.values.firstName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        touched={formik.touched.firstName}
        error={formik.errors.firstName}
      />
      <ShippingFormControl
        label="Last Name"
        name="lastName"
        required={true}
        value={formik.values.lastName}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        touched={formik.touched.lastName}
        error={formik.errors.lastName}
      />
      <ShippingFormControl
        label="Company"
        name="company"
        required={false}
        value={formik.values.company}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        touched={formik.touched.company}
        error={formik.errors.company}
      />
      <ShippingFormControl
        label="Address"
        name="streetAddressOne"
        required={true}
        value={formik.values.streetAddressOne}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        touched={formik.touched.streetAddressOne}
        error={formik.errors.streetAddressOne}
      />
      <ShippingFormControl
        label="Address line 2"
        name="streetAddressTwo"
        required={false}
        value={formik.values.streetAddressTwo}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        touched={formik.touched.streetAddressTwo}
        error={formik.errors.streetAddressTwo}
      />
      <ShippingFormControl
        label="Address line 3"
        name="streetAddressThree"
        required={false}
        value={formik.values.streetAddressThree}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        touched={formik.touched.streetAddressThree}
        error={formik.errors.streetAddressThree}
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
        required={true}
        value={formik.values.city}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        touched={formik.touched.city}
        error={formik.errors.city}
      />
      <ShippingFormControl
        label="Postcode"
        name="postcode"
        required={true}
        value={formik.values.postcode}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        touched={formik.touched.postcode}
        error={formik.errors.postcode}
      />
      <ShippingFormControl
        label="Phone Number"
        name="phoneNumber"
        required={true}
        value={formik.values.phoneNumber}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        touched={formik.touched.phoneNumber}
        error={formik.errors.phoneNumber}
      />
      <div className="w-full flex justify-end"></div>
      <div className="w-full flex justify-between mt-6 gap-3 flex-col md:flex-row">
        <button
          type="submit"
          className="w-full max-w-xxs border py-3 uppercase bg-blue-400 rounded-md text-gray-100 font-sans font-bold hover:bg-blue-500 focus:bg-blue-500 transition-all text-sm"
        >
          Continue
        </button>
      </div>
    </form>
  );
};
