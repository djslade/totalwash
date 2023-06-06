export const ProductInfoPrice = ({
    isOnSale,
    fullPrice,
    currentPrice,
}: {
    isOnSale: boolean,
    fullPrice: number,
    currentPrice: number,
}) => {
    return (
        <div className="my-3 text-2xl border-t border-gray-800 p-3">
            {!isOnSale ?
            <span className="font-semibold">{`£${currentPrice}`}</span>
            :
            <>
                <span className="line-through font-semibold">{`£${fullPrice}`}</span>
                <span className="text-blue-500 font-semibold">{` £${currentPrice}`}</span>
            </>  
            }
        </div>
    )
}
