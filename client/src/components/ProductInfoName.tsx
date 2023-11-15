export const ProductInfoName = ({
  productName,
  mobile,
}: {
  productName: string;
  mobile?: boolean;
}) => {
  return (
    <div
      className={`border-gray-800 p-3 ${
        mobile === true ? "sm:hidden" : "hidden sm:block"
      }`}
    >
      <h1 className="font-bold text-xl">{productName}</h1>
    </div>
  );
};
