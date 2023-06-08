export interface ProductBody {
    name: string;
    ranges: string[],
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