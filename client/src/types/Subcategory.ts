import { Category } from "./Category"

export interface Subcategory {
    _id: string;
    name: string;
    description: string;
    categories: Category[];
    slug: string;
    photo: string;
}