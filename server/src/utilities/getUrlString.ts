import slugify from "slugify";

export const getUrlString = (string: string) => {
  const options = {
    lower: true,
    strict: true,
  };
  return slugify(string, options);
};
