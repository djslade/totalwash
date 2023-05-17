import { ParsedQs } from "./ParsedQs"

export interface ProductQuery {
    categories?: string | ParsedQs | string[] | ParsedQs[];
    subcategories?: string | ParsedQs | string[] | ParsedQs[];
    brand?: string | ParsedQs | string[] | ParsedQs[];
}