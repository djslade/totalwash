import { ParsedQs } from "./ParsedQs"

type CurrentPriceQuery = {
    $lte: string | number | string[] | ParsedQs | ParsedQs[];
    $gte: string | number | string[] | ParsedQs | ParsedQs[];
}

export interface ProductQuery {
    categories?: string | ParsedQs | string[] | ParsedQs[];
    subcategories?: string | ParsedQs | string[] | ParsedQs[];
    isOnSale?: boolean;
    isFeatured?: boolean;
    currentPrice?: CurrentPriceQuery;
}