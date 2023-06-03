import { Category } from "./Category"
import { Subcategory } from "./Subcategory"

export interface Product {
    name: string;
    categories: Category[];
    subcategories: Subcategory[];
    fullPrice: number;
    currentPrice: number;
    description: string[];
    features: string[];
    whatsIncluded: string[];
    isFeatured: boolean;
    isOnSale: boolean;
    slug: string;
    photos: string[];
}