export const getSearchParamsString = (searchParams:any) => {
    const { page, limit, sortby } = searchParams;
    let searchParamsString = "";
    if (page) searchParamsString += `&page=${page}`;
    if (limit) {
      searchParamsString += `&limit=${limit}`;
    } else {
      searchParamsString += `&limit=6`;
    }
    if (sortby) searchParamsString += `&sortby=${sortby}`;
    return searchParamsString;
}