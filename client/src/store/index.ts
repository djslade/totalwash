import { Product } from "@/types";
import { proxy } from "valtio"

interface StateObject {
    darkTheme: boolean;
    showNavSidebar: boolean;
    showCartSidebar: boolean;
    cartContents: Product[];
}

export const state:StateObject = proxy({
    darkTheme: false,
    showNavSidebar: false,
    showCartSidebar: false,
    cartContents: [],
})
