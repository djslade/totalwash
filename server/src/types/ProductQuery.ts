import { ParsedQs } from "./ParsedQs"

type CurrentPriceQuery = {
    $lte: string | number | string[] | ParsedQs | ParsedQs[];
    $gte: string | number | string[] | ParsedQs | ParsedQs[];
}

type TextQuery = {
    $text: { $search: string | ParsedQs | string[] | ParsedQs[]; };
}

export interface ProductQuery {
    categories?: string | ParsedQs | string[] | ParsedQs[];
    subcategories?: string | ParsedQs | string[] | ParsedQs[];
    isOnSale?: boolean;
    isFeatured?: boolean;
    currentPrice?: CurrentPriceQuery;
    text?: TextQuery;
    page?: string | ParsedQs | string[] | ParsedQs[];
    limit?: string | ParsedQs | string[] | ParsedQs[];
}