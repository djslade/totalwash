import { Product } from "@/types";
import { proxy } from "valtio";

interface StateObject {
  showImageGallery: boolean;
  currentGalleryPhoto: string;
  currentProduct: Product;
  cartContents: Product[];
  cartId: string;
}

export const state: StateObject = proxy({
  showImageGallery: false,
  currentGalleryPhoto: "",
  currentProduct: {
    _id: "",
    name: "",
    categories: [],
    subcategories: [],
    fullPrice: 0,
    currentPrice: 0,
    description: [""],
    features: [""],
    whatsIncluded: [""],
    isFeatured: false,
    isOnSale: false,
    slug: "",
    photos: [],
  },
  cartContents: [],
  cartId: "",
});
