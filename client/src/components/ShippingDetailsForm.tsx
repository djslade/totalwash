"use client"
import { useNavigate } from "@/hooks"
import { useState } from "react"
import { CountryDropdown, CountryRegionData } from "react-country-region-selector"

export const ShippingDetailsForm = () => {
    const [email, setEmail] = useState<string>("")

    const [firstName, setFirstName] = useState<string>("")

    const [lastName, setLastName] = useState<string>("")

    const [company, setCompany] = useState<string>("")

    const [streetAddressOne, setStreetAddressOne] = useState<string>("")

    const [streetAddressTwo, setStreetAddressTwo] = useState<string>("")

    const [streetAddressThree, setStreetAddressThree] = useState<string>("")

    const [country, setCountry] = useState<string>("")

    const [city, setCity] = useState<string>("")

    const [postcode, setPostcode] = useState<string>("")

    const [phoneNumber, setPhoneNumber] = useState<string>("")

    const [validationStatus, setValidationStatus] = useState({
        email: {
            checked: false,
            valid: true
        },
        firstName: {
            checked: false,
            valid: true,
        },
        lastName: {
            checked: false,
            valid: true,
        },
        streetAddressOne: {
            checked: false,
            valid: true,
        },
        country: {
            checked: false,
            valid: true,
        },
        city: {
            checked: false,
            valid: true,
        },
        postcode: {
            checked: false,
            valid: true,
        },
        phoneNumber: {
            checked: false,
            valid: true,
        },
    })

    const [validationWarningMessages, setValidationWarningMessages] = useState({
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
    })

    const navigate = useNavigate()

    const changeEmail = (evt:any) => {
        setEmail(evt.target.value)
    }

    const changeFirstName = (evt:any) => {
        setFirstName(evt.target.value)
    }

    const changeLastName = (evt:any) => {
        setLastName(evt.target.value)
    }

    const changeCompany = (evt:any) => {
        setCompany(evt.target.value)
    }

    const changeStreetAddressOne = (evt:any) => {
        setStreetAddressOne(evt.target.value)
    }

    const changeStreetAddressTwo = (evt:any) => {
        setStreetAddressTwo(evt.target.value)
    }

    const changeStreetAddressThree = (evt:any) => {
        setStreetAddressThree(evt.target.value)
    }

    const changeCountry = (val:string) => {
        setCountry(val)
    }

    const changeCity = (evt:any) => {
        setCity(evt.target.value)
    }

    const changePostcode = (evt:any) => {
        setPostcode(evt.target.value)
    }

    const changePhoneNumber = (evt:any) => {
        setPhoneNumber(evt.target.value)
    }

    const validateEmail = () => {
        let isValid = true
        let warningMessage = ""
        const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (email === "") {
            isValid = false
            warningMessage = "This is a required field"
        }
        if (isValid && email.match(mailformat) === null) {
            isValid = false
            warningMessage = "Please enter a valid email"
        }
        setValidationStatus((prevState) => ({
            ...prevState,
            email: {
                checked: true,
                valid: isValid
            }
        }))
        setValidationWarningMessages((prevState) => ({
            ...prevState,
            email: warningMessage
        }))
        return isValid
    }

    const validateFirstName = () => {
        let isValid = true
        let warningMessage = ""
        if (firstName === "") {
            isValid = false
            warningMessage = "This is a required field"
        }
        setValidationStatus((prevState) => ({
            ...prevState,
            firstName: {
                checked: true,
                valid: isValid
            }
        }))
        setValidationWarningMessages((prevState) => ({
            ...prevState,
            firstName: warningMessage
        }))
        return isValid
    }

    const validateLastName = () => {
        let isValid = true
        let warningMessage = ""
        if (lastName === "") {
            isValid = false
            warningMessage = "This is a required field"
        }
        setValidationStatus((prevState) => ({
            ...prevState,
            lastName: {
                checked: true,
                valid: isValid
            }
        }))
        setValidationWarningMessages((prevState) => ({
            ...prevState,
            lastName: warningMessage
        }))
        return isValid
    }

    const validateStreetAddress = () => {
        let isValid = true
        let warningMessage = ""
        if (streetAddressOne === "") {
            isValid = false
            warningMessage = "This is a required field"
        }
        setValidationStatus((prevState) => ({
            ...prevState,
            streetAddressOne: {
                checked: true,
                valid: isValid
            }
        }))
        setValidationWarningMessages((prevState) => ({
            ...prevState,
            streetAddressOne: warningMessage
        }))
        return isValid
    }

    const validateCountry = () => {
        let isValid = true
        let warningMessage = ""
        if (country === "") {
            isValid = false
            warningMessage = "This is a required field"
        }
        setValidationStatus((prevState) => ({
            ...prevState,
            country: {
                checked: true,
                valid: isValid
            }
        }))
        setValidationWarningMessages((prevState) => ({
            ...prevState,
            country: warningMessage
        }))
        return isValid
    }

    const validateCity = () => {
        let isValid = true
        let warningMessage = ""
        if (city === "") {
            isValid = false
            warningMessage = "This is a required field"
        }
        setValidationStatus((prevState) => ({
            ...prevState,
            city: {
                checked: true,
                valid: isValid
            }
        }))
        setValidationWarningMessages((prevState) => ({
            ...prevState,
            city: warningMessage
        }))
        return isValid
    }

    const validatePostcode = () => {
        let isValid = true
        let warningMessage = ""
        if (postcode === "") {
            isValid = false
            warningMessage = "This is a required field"
        }
        setValidationStatus((prevState) => ({
            ...prevState,
            postcode: {
                checked: true,
                valid: isValid
            }
        }))
        setValidationWarningMessages((prevState) => ({
            ...prevState,
            postcode: warningMessage
        }))
        return isValid
    }

    const validatePhoneNumber = () => {
        let isValid = true
        let warningMessage = ""
        if (phoneNumber === "") {
            isValid = false
            warningMessage = "This is a required field"
        }
        setValidationStatus((prevState) => ({
            ...prevState,
            phoneNumber: {
                checked: true,
                valid: isValid
            }
        }))
        setValidationWarningMessages((prevState) => ({
            ...prevState,
            phoneNumber: warningMessage
        }))
        return isValid
    }

    const validateAll = () => {
        const results:boolean[] = []
        results.push(validateEmail())
        results.push(validateFirstName())
        results.push(validateLastName())
        results.push(validateStreetAddress())
        results.push(validateCountry())
        results.push(validateCity())
        results.push(validatePostcode())
        results.push(validatePhoneNumber())
        return results.filter((result) => result === false).length === 0
    }

    const handleUseDemoData = () => {
        setEmail('example@email.com')
        setFirstName('Bobby')
        setLastName('Briggs')
        setCompany('Totalwash')
        setStreetAddressOne('64A East St')
        setCountry('United Kingdom')
        setCity('Taunton')
        setPostcode('TA1 3NH')
        setPhoneNumber('01823 300206')
    }

    const handleContinue = () => {
        if (validateAll() === false) return
        navigate('/catalog')
    }

    return (
        <form onSubmit={(evt) => evt.preventDefault()} className="p-5 border-t my-3 flex flex-col gap-3 w-full items-baseline md:items-stretch text-gray-700">
            <span className="mb-3">Fields marked with an <span className="text-red-500">*</span> are required</span>
            <div className="flex gap-2 md:gap-5 items-start justify-between flex-col md:flex-row w-full">
                <label
                htmlFor="email"
                className="whitespace-nowrap text-right">Email Address <span className="text-red-500">*</span></label>
                <div className="flex flex-col gap-3 md:max-w-xs w-full md:w-screen">
                    <input
                    value={email}
                    onChange={changeEmail}
                    onBlur={validateEmail}
                    placeholder="required"
                    id="email"
                    className="py-0.5 px-2 border rounded-sm bg-gray-50 border-gray-900 focus:form-input outline-none md:max-w-xs w-full md:w-screen" type="text" />
                    <span className="text-red-500">{validationWarningMessages.email}</span>
                </div>
            </div>
            <div className="flex gap-2 md:gap-5 items-start justify-between flex-col md:flex-row w-full">
                <label
                htmlFor="firstname"
                className="whitespace-nowrap text-right">First Name <span className="text-red-500">*</span></label>
                <div className="flex flex-col gap-3 md:max-w-xs w-full md:w-screen">
                    <input
                    value={firstName}
                    onChange={changeFirstName}
                    onBlur={validateFirstName}
                    placeholder="required"
                    id="firstname" 
                    className="bg-gray-50 py-0.5 px-2 border rounded-sm border-gray-900 focus:form-input outline-none md:max-w-xs w-full md:w-screen" type="text" />
                    <span className="text-red-500">{validationWarningMessages.firstName}</span>
                </div>

            </div>
            <div className="flex gap-2 md:gap-5 items-start justify-between flex-col md:flex-row w-full">
                <label
                htmlFor="lastname"
                className="whitespace-nowrap text-right">Last Name <span className="text-red-500">*</span></label>
                <div className="flex flex-col gap-3 md:max-w-xs w-full md:w-screen">
                    <input
                    value={lastName}
                    onChange={changeLastName}
                    onBlur={validateLastName}
                    placeholder="required"
                    id="lastname"
                    className="bg-gray-50 py-0.5 px-2 border rounded-sm border-gray-900 focus:form-input outline-none md:max-w-xs w-full md:w-screen" type="text" />
                    <span className="text-red-500">{validationWarningMessages.lastName}</span>
                </div>
            </div>
            <div className="flex gap-2 md:gap-5 items-start justify-between flex-col md:flex-row w-full">
                <label
                htmlFor="company"
                className="whitespace-nowrap text-right">Company</label>
                <div className="flex flex-col gap-3 md:max-w-xs w-full md:w-screen">
                    <input
                    value={company}
                    onChange={changeCompany}
                    placeholder="optional"
                    id="company"
                    className="bg-gray-50 py-0.5 px-2 border rounded-sm border-gray-900 focus:form-input outline-none md:max-w-xs w-full md:w-screen" type="text" />
                    <span className="text-red-500">{validationWarningMessages.company}</span>
                </div>
            </div>
            <div className="flex gap-2 md:gap-5 items-start justify-between flex-col md:flex-row w-full">
                <label
                htmlFor="address"
                className="whitespace-nowrap text-right">Street Address <span className="text-red-500">*</span></label>
                <div className="flex flex-col gap-3 md:max-w-xs w-full md:w-screen">
                    <input
                    value={streetAddressOne}
                    onChange={changeStreetAddressOne}
                    onBlur={validateStreetAddress}
                    placeholder="required"
                    id="address"
                    className="bg-gray-50 py-0.5 px-2 border rounded-sm border-gray-900 focus:form-input outline-none w-full" type="text" />
                    <span className="text-red-500">{validationWarningMessages.streetAddressOne}</span>
                    <input
                    value={streetAddressTwo}
                    onChange={changeStreetAddressTwo}
                    placeholder="optional"
                    className="bg-gray-50 py-0.5 px-2 border rounded-sm border-gray-900 focus:form-input outline-none w-full" type="text" />
                    <span className="text-red-500">{validationWarningMessages.streetAddressTwo}</span>
                    <input
                    value={streetAddressThree}
                    onChange={changeStreetAddressThree}
                    placeholder="optional"
                    className="bg-gray-50 py-0.5 px-2 border rounded-sm border-gray-900 focus:form-input outline-none w-full" type="text" />
                    <span className="text-red-500">{validationWarningMessages.streetAddressThree}</span>
                </div>
            </div>
            <div className="flex gap-2 md:gap-5 items-start justify-between flex-col md:flex-row w-full">
                <label
                htmlFor="country"
                className="whitespace-nowrap text-right">Country <span className="text-red-500">*</span></label>
                <div className="flex flex-col gap-3 md:max-w-xs w-full md:w-screen">
                    <CountryDropdown
                    id="country"
                    classes="bg-gray-50 py-0.5 px-2 border rounded-sm border-gray-900 focus:form-input outline-none md:max-w-xs w-full md:w-screen"
                    value={country}
                    onChange={(val) => changeCountry(val)}
                    onBlur={validateCountry}/>
                    <span className="text-red-500">{validationWarningMessages.country}</span>
                </div>
            </div>
            <div className="flex gap-2 md:gap-5 items-start justify-between flex-col md:flex-row w-full">
                <label
                htmlFor="city"
                className="whitespace-nowrap text-right">City <span className="text-red-500">*</span></label>
                <div className="flex flex-col gap-3 md:max-w-xs w-full md:w-screen">
                    <input
                    value={city}
                    onChange={changeCity}
                    onBlur={validateCity}
                    placeholder="required"
                    id="city"
                    className="bg-gray-50 py-0.5 px-2 border rounded-sm border-gray-900 focus:form-input outline-none md:max-w-xs w-full md:w-screen" type="text" />
                    <span className="text-red-500">{validationWarningMessages.city}</span>
                </div>
            </div>
            <div className="flex gap-2 md:gap-5 items-start justify-between flex-col md:flex-row w-full">
                <label
                htmlFor="postcode"
                className="whitespace-nowrap text-right">Postcode <span className="text-red-500">*</span></label>
                <div className="flex flex-col gap-3 md:max-w-xs w-full md:w-screen">
                    <input
                    value={postcode}
                    onChange={changePostcode}
                    onBlur={validatePostcode}
                    placeholder="required"
                    id="postcode"
                    className="bg-gray-50 py-0.5 px-2 border rounded-sm border-gray-900 focus:form-input outline-none md:max-w-xs w-full md:w-screen" type="text" />
                    <span className="text-red-500">{validationWarningMessages.postcode}</span>
                </div>
            </div>
            <div className="flex gap-2 md:gap-5 items-start justify-between flex-col md:flex-row w-full">
                <label
                htmlFor="phone"
                className="whitespace-nowrap text-right">Phone Number <span className="text-red-500">*</span></label>
                <div className="flex flex-col gap-3 md:max-w-xs w-full md:w-screen">
                    <input
                    value={phoneNumber}
                    onChange={changePhoneNumber}
                    onBlur={validatePhoneNumber}
                    placeholder="required"
                    id="phone"
                    className="bg-gray-50 py-0.5 px-2 border rounded-sm border-gray-900 focus:form-input outline-none md:max-w-xs w-full md:w-screen" type="text" />
                    <span className="text-red-500">{validationWarningMessages.phoneNumber}</span>
                </div>
            </div>
            <div className="w-full flex justify-end">

            </div>
            <div className="w-full flex justify-between mt-6 gap-3 flex-col md:flex-row">
                <button
                onClick={handleUseDemoData}
                className="w-full max-w-xxs border py-3 uppercase bg-green-400 rounded-md text-gray-100 font-sans font-bold hover:bg-green-500 focus:bg-green-500 transition-all text-sm">Use Demo Data</button>
                <button
                onClick={handleContinue}
                className="w-full max-w-xxs border py-3 uppercase bg-blue-400 rounded-md text-gray-100 font-sans font-bold hover:bg-blue-500 focus:bg-blue-500 transition-all text-sm">Continue</button>
            </div>
        </form>
    )
}
