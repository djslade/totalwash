export const ProductInfoName = ({
    productName,
}: {
    productName: string,
}) => {
    return (
        <div className="border-gray-800 py-3">
            <h1 className="font-bold text-xl">{productName}</h1>
        </div>
    )
}
