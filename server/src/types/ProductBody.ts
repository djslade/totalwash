export interface ProductBody {
    name: string;
    categories: string[],
    subcategories: string[],
    brand: string,
    fullPrice: number,
    currentPrice: number,
    description: string[],
    features: string[],
    whatsIncluded: string[],
    isFeatured: boolean,
    isOnSale: boolean,
    photos: string[],
}