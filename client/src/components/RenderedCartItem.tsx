"use client";
import { RenderedCartProduct } from "./RenderedCartProduct";
import { RenderedProductButtons } from "./RenderedProductButtons";
import { formatPrice } from "@/utilities";
import { useCartItem } from "@/hooks";

export const RenderedCartItem = ({ cartItem }: { cartItem: any }) => {
  const {
    quantity,
    handleQuantityChange,
    updateQuantityInCart,
    removeItemFromCart,
  } = useCartItem(cartItem);

  return (
    <tr key={cartItem.product._id} className="border-b w-full text-gray-700">
      <td className="py-3 w-full">
        <div className="flex flex-col w-full">
          <RenderedCartProduct product={cartItem.product} />
          <RenderedProductButtons
            handleRemove={removeItemFromCart}
            handleUpdate={updateQuantityInCart}
          />
        </div>
      </td>
      <td className="px-3 py-3 align-top text-lg font-medium">
        {formatPrice(cartItem.product.currentPrice)}
      </td>
      <td className="p-1 align-top">
        <input
          className="w-10 p-2 text-center border bg-gray-50 text-gray-700"
          value={quantity}
          onChange={handleQuantityChange}
        />
      </td>
      <td className="px-3 py-3 align-top text-lg font-medium">
        {formatPrice(cartItem.subtotal)}
      </td>
    </tr>
  );
};
