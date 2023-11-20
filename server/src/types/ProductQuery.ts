import { ParsedQs } from "./ParsedQs";

type CurrentPriceQuery = {
  $lte: string | number | string[] | ParsedQs | ParsedQs[];
  $gte: string | number | string[] | ParsedQs | ParsedQs[];
};

type TextQuery = {
  $text: { $search: string | ParsedQs | string[] | ParsedQs[] };
};

export interface ProductQuery {
  ranges?: string | ParsedQs | string[] | ParsedQs[];
  isOnSale?: boolean;
  isFeatured?: boolean;
  currentPrice?: CurrentPriceQuery;
  text?: TextQuery;
}
