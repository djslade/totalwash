import { ParsedQs } from "./ParsedQs";

export interface SubcategoryQuery {
  categories?: string | ParsedQs | string[] | ParsedQs[];
}
