import { Product } from "@/types"

export const sortProductsArrayAlphabetically = ( a:Product, b:Product ) => {
    if ( a.name < b.name ){
      return -1;
    }
    if ( a.name > b.name ){
      return 1;
    }
    return 0;
  }