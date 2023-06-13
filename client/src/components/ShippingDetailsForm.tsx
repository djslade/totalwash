"use client"
import { useNavigate } from "@/hooks"
import { useState } from "react"
import { CountryDropdown } from "react-country-region-selector"

export const ShippingDetailsForm = () => {
    const [country, setCountry] = useState<string>("")

    const navigate = useNavigate()

    return (
        <form action="" className="p-5 border-t my-3 flex flex-col gap-3 md:flex-1">
            <span>Fields marked with an <span className="text-red-500">*</span> are required</span>
            <div className="flex gap-2 md:gap-5 md:md:items-center items-start justify-between max-w-md flex-col md:flex-row">
                <label
                htmlFor="email"
                className="whitespace-nowrap flex-1">Email Address <span className="text-red-500">*</span></label>
                <input
                id="email"
                className="flex-[2] py-0.5 px-2 border rounded-sm border-gray-900 focus:form-input outline-none w-full" type="text" />
            </div>
            <div className="flex gap-2 md:gap-5 md:md:items-center items-start justify-between max-w-md flex-col md:flex-row">
                <label
                htmlFor="firstname"
                className="whitespace-nowrap flex-1">First Name <span className="text-red-500">*</span></label>
                <input
                id="firstname" 
                className="flex-[2] py-0.5 px-2 border rounded-sm border-gray-900 focus:form-input outline-none w-full" type="text" />
            </div>
            <div className="flex gap-2 md:gap-5 md:items-center items-start justify-between max-w-md flex-col md:flex-row">
                <label
                htmlFor="lastname"
                className="whitespace-nowrap flex-1">Last Name <span className="text-red-500">*</span></label>
                <input
                id="lastname"
                className="flex-[2] py-0.5 px-2 border rounded-sm border-gray-900 focus:form-input outline-none w-full" type="text" />
            </div>
            <div className="flex gap-2 md:gap-5 md:items-center items-start justify-between max-w-md flex-col md:flex-row">
                <label
                htmlFor="company"
                className="whitespace-nowrap flex-1">Company</label>
                <input
                id="company"
                className="flex-[2] py-0.5 px-2 border rounded-sm border-gray-900 focus:form-input outline-none w-full" type="text" />
            </div>
            <div className="flex gap-2 md:gap-5 items-start justify-between max-w-md flex-col md:flex-row">
                <label
                htmlFor="address"
                className="whitespace-nowrap flex-1">Street Address</label>
                <div className="flex-[2] w-full flex flex-col gap-3">
                    <input
                    id="address"
                    className="py-0.5 px-2 border rounded-sm border-gray-900 focus:form-input outline-none w-full" type="text" />
                    <input
                    className="py-0.5 px-2 border rounded-sm border-gray-900 focus:form-input outline-none w-full" type="text" />
                    <input
                    className="py-0.5 px-2 border rounded-sm border-gray-900 focus:form-input outline-none w-full" type="text" />
                </div>
            </div>
            <div className="flex gap-2 md:gap-5 md:items-center items-start justify-between max-w-md flex-col md:flex-row">
                <label
                htmlFor="country"
                className="whitespace-nowrap flex-1">Country</label>
                <CountryDropdown
                id="country"
                classes="flex-[2] py-0.5 px-2 border rounded-sm border-gray-900 focus:form-input outline-none w-full"
                value={country}
                onChange={(val) => setCountry(val)}/>
            </div>
            <div className="flex gap-2 md:gap-5 md:items-center items-start justify-between max-w-md flex-col md:flex-row">
                <label
                htmlFor="region"
                className="whitespace-nowrap flex-1">Region</label>
                <input
                id="region"
                className="flex-[2] py-0.5 px-2 border rounded-sm border-gray-900 focus:form-input outline-none w-full" type="text" />
            </div>
            <div className="flex gap-2 md:gap-5 md:items-center items-start justify-between max-w-md flex-col md:flex-row">
                <label
                htmlFor="city"
                className="whitespace-nowrap flex-1">City</label>
                <input
                id="city"
                className="flex-[2] py-0.5 px-2 border rounded-sm border-gray-900 focus:form-input outline-none w-full" type="text" />
            </div>
            <div className="flex gap-2 md:gap-5 md:items-center items-start justify-between max-w-md flex-col md:flex-row">
                <label
                htmlFor="postcode"
                className="whitespace-nowrap flex-1">Postcode</label>
                <input
                id="postcode"
                className="flex-[2] py-0.5 px-2 border rounded-sm border-gray-900 focus:form-input outline-none w-full" type="text" />
            </div>
            <div className="flex gap-2 md:gap-5 md:items-center items-start justify-between max-w-md flex-col md:flex-row">
                <label
                htmlFor="phone"
                className="whitespace-nowrap flex-1">Phone Number</label>
                <input
                id="phone"
                className="flex-[2] py-0.5 px-2 border rounded-sm border-gray-900 focus:form-input outline-none w-full" type="text" />
            </div>
            <button
                onClick={() => navigate('/checkout/shipping')}
                className="w-full max-w-xs border py-3 uppercase bg-blue-500 rounded-md text-white font-sans font-bold brightness-100 hover:brightness-90 focus:brightness-90 text-sm">Continue</button>
        </form>
    )
}
