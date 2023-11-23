"use client";

type Props = {
  source: string;
  classNames: string;
  alt?: string;
};

export const LazyImage = ({ source, classNames, alt }: Props) => {
  return (
    <img
      className={classNames}
      loading="lazy"
      src={source}
      alt={alt || "Image"}
    />
  );
};
