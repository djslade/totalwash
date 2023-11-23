"use client";

import { PlainButton } from "./PlainButton";

export const RenderedProductButtons = ({
  handleUpdate,
  handleRemove,
}: {
  handleUpdate: () => void;
  handleRemove: () => void;
}) => {
  return (
    <div className="py-3 gap-3 w-full flex justify-between sm:justify-start">
      <PlainButton
        action={handleRemove}
        text="Remove"
      />
      <PlainButton
        action={handleUpdate}
        text="Update"
      />
    </div>
  );
};
