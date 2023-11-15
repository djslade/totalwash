export const formatCartCount = (quantity: number) => {
  const itemOrItems = quantity === 1 ? "Item" : "Items";
  return `${quantity} ${itemOrItems} in Cart`;
};
