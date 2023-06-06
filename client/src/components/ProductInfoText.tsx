import { useState } from "react"
import { AiOutlineRight, AiOutlineDown } from 'react-icons/ai'

export const ProductInfoText = ({
    heading,
    textArray,
    isList,
    textIsVisible,
}: {
    heading: string,
    textArray: string[],
    isList?: boolean,
    textIsVisible?: boolean;
}) => {
    const [showText, setShowText] = useState<boolean>(textIsVisible || false)

    const toggleShowText = () => {
        setShowText(!showText)
    }

    if (isList === true) {
        return (
            <div className="border w-full my-3 text-gray-800 border-gray-100">
                <button
                onClick={toggleShowText}
                className="flex w-full justify-between items-center px-3 bg-gray-100">
                    <h2 className="text-lg font-semibold">{heading}</h2>
                    {showText ? <AiOutlineDown /> : <AiOutlineRight />}
                </button>
                {showText &&
                <ul className="list-disc pl-8 py-3 px-3">
                    {textArray.map((text) =>
                    <li className="mb-3" key={text}>{text}</li>)}
                </ul>
                }
            </div>
        )
    } else {
        return (
            <div className="border w-full my-3 text-gray-800 border-gray-100">
                <button
                onClick={toggleShowText}
                className="flex w-full justify-between items-center px-3 bg-gray-100">
                    <h2 className="text-lg font-semibold">{heading}</h2>
                    {showText ? <AiOutlineDown /> : <AiOutlineRight />}
                </button>
                {showText &&
                <div className="py-3 px-3">
                    {textArray.map((text) =>
                    <p className="mb-3" key={text}>{text}</p>)}
                </div>
                }
            </div>
        )
    }
}
