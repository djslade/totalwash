export const formatPrice = (price:number) => {
    const formattedPrice = new Intl.NumberFormat('en-gb', { style: 'currency', currency: 'GBP'}).format(price)
    return formattedPrice
}
