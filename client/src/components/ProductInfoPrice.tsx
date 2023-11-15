import { formatPrice } from "@/utilities";

export const ProductInfoPrice = ({
  isOnSale,
  fullPrice,
  currentPrice,
}: {
  isOnSale: boolean;
  fullPrice: number;
  currentPrice: number;
}) => {
  return (
    <div className="my-3 text-2xl border-t border-gray-800 p-3">
      {!isOnSale ? (
        <span className="font-semibold">{`${formatPrice(currentPrice)}`}</span>
      ) : (
        <>
          <span className="line-through font-semibold">{`${formatPrice(
            fullPrice,
          )}`}</span>
          <span className="text-blue-500 font-semibold">{` ${formatPrice(
            currentPrice,
          )}`}</span>
        </>
      )}
    </div>
  );
};
