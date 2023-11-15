import { Product } from "@/types";
import { proxy } from "valtio";

interface StateObject {
  darkTheme: boolean;
  showNavSidebar: boolean;
  showCartSidebar: boolean;
  showImageGallery: boolean;
  currentGalleryPhoto: string;
  currentProduct: Product;
  showAddedToCartModel: boolean;
  cartContents: Product[];
  cartId: string;
}

export const state: StateObject = proxy({
  darkTheme: false,
  showNavSidebar: false,
  showCartSidebar: false,
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
  showAddedToCartModel: false,
  cartContents: [],
  cartId: "",
});
