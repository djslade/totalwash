import { ShippingFormData } from "@/types";

export const getShippingFormDefaultValues = (shippingInfo: ShippingFormData) => {
    if (shippingInfo) return shippingInfo;
    return {
      email: "",
      firstName: "",
      lastName: "",
      company: "",
      streetAddressOne: "",
      streetAddressTwo: "",
      streetAddressThree: "",
      country: "",
      city: "",
      postcode: "",
      phoneNumber: "",
    };
  };