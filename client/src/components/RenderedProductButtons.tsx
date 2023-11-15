"use client";
export const RenderedProductButtons = ({
  handleUpdate,
  handleRemove,
}: {
  handleUpdate: () => void;
  handleRemove: () => void;
}) => {
  return (
    <div className="py-3 gap-3 w-full flex justify-between sm:justify-start">
      <button
        onClick={handleRemove}
        className="border py-1 bg-gray-50 text-gray-700 rounded-md border-gray-700 font-sans font-medium hover:bg-gray-200 focus:bg-gray-200 transition-all w-24 px-3"
      >
        Remove
      </button>
      <button
        onClick={handleUpdate}
        className="border py-1 bg-gray-50 text-gray-700 rounded-md border-gray-700 font-sans font-medium hover:bg-gray-200 focus:bg-gray-200 transition-all w-24 px-3"
      >
        Update
      </button>
    </div>
  );
};
