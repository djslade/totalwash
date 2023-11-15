export const getNumberWithCommas = (number: number) => {
  return parseFloat(
    number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
  ).toFixed(2);
};
