import * as yup from "yup";

const requiredValidationMessage: string = "This field is required";

export const shippingFormValidationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required(requiredValidationMessage),
  firstName: yup.string().required(requiredValidationMessage),
  lastName: yup.string().required(requiredValidationMessage),
  company: yup.string(),
  streetAddressOne: yup.string().required(requiredValidationMessage),
  streetAddressTwo: yup.string(),
  streetAddressThree: yup.string(),
  country: yup.string().required(requiredValidationMessage),
  city: yup.string().required(requiredValidationMessage),
  postcode: yup.string().required(requiredValidationMessage),
  phoneNumber: yup.string().required(requiredValidationMessage),
});
