"use client"
export const RenderedProductButtons = ({
    handleUpdate,
    handleRemove,
}: {
    handleUpdate: () => void,
    handleRemove: () => void,
}) => {
    return (
        <div className="py-3 gap-3 w-full flex justify-between sm:justify-start">
            <button
            onClick={handleRemove}
            className="border py-1 bg-white text-gray-900 rounded-md border-gray-500 font-sans font-medium brightness-100 hover:brightness-90 focus:brightness-90 w-24 px-3">Remove</button>
            <button
            onClick={handleUpdate}
            className="border py-1 bg-white text-gray-900 rounded-md border-gray-500 font-sans font-medium brightness-100 hover:brightness-90 focus:brightness-90 w-24 px-3">Update</button>
        </div>
    )
}
