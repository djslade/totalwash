// Importing the 'state' object from the "@/store" module
import { state } from "@/store";
import { Product } from "@/types";

// Importing the 'useSnapshot' hook from the "valtio" library
import { useSnapshot } from "valtio";

// Custom React hook to process the contents of the shopping cart
export const useProcessCartContents = (products?: Product[]) => {
  // Get a snapshot of the current state using 'useSnapshot'
  const snap = useSnapshot(state);
  const array = products ? products : snap.cartContents;

  // Find unique products in the cart based on '_id' property
  const uniqueProducts = array.reduce((accumulator, product) => {
    if (!accumulator.find((item) => item._id === product._id)) {
      accumulator.push(product);
    }
    return accumulator;
  }, [] as any[]);

  // Process cart contents to include quantity and subtotals
  const processedCartContents: any[] = uniqueProducts.map((product) => {
    // Calculate the quantity of each unique product in the cart
    const quantity = array.filter(
      (otherProduct) => product._id === otherProduct._id,
    ).length;

    // Calculate the subtotal for the current price of the product
    const subtotal = +parseFloat(`${product.currentPrice * quantity}`).toFixed(
      2,
    );

    // Calculate the subtotal for the full price of the product
    const subtotalFull = +parseFloat(`${product.fullPrice * quantity}`).toFixed(
      2,
    );

    // Return an object with product details, quantity, and subtotals
    return {
      product,
      quantity,
      subtotal,
      subtotalFull,
    };
  });

  // Sort the processed cart contents based on the 'name' property
  return processedCartContents.sort((a, b) => a.name - b.name);
};
