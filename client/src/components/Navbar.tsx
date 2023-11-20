"use client";
import { useNavigate } from "@/hooks";
import { Category } from "@/types";
import { useState } from "react";

export const Navbar = ({
  categories,
}: {
  categories: Category[];
  subcategories: Category[];
}) => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
    if (path === "/catalog") return;
    setDropdownVisible(false);
  };

  const [dropdownVisible, setDropdownVisible] = useState<boolean>(true);

  return (
    <div className="max-w-screen bg-gray-200 text-gray-700 font-normal shadow-md">
      <nav className="hidden justify-between md:flex text-base flex-nowrap max-w-screen-lg mx-auto bg-inherit">
        {categories.map((category) => (
          <div
            className="relative group flex justify-center flex-col items-center w-full"
            key={category._id}
          >
            <button
              role="link"
              className="px-3 py-2 hover:bg-gray-100 transition-all w-full"
              onClick={() =>
                handleNavigate(`/catalog/categories/${category.slug}`)
              }
              onBlur={() => setDropdownVisible(true)}
              onMouseLeave={() => setDropdownVisible(true)}
              onFocus={() => setDropdownVisible(true)}
            >
              <span>{category.name}</span>
            </button>
          </div>
        ))}
        <div className="relative group flex justify-center flex-col items-center w-full bg-red-400 font-bold text-gray-100">
          <button
            role="link"
            className="px-3 py-2 hover:bg-red-500 transition-all w-full bg-red-400"
            onClick={() => handleNavigate(`/catalog/sale`)}
            onBlur={() => setDropdownVisible(true)}
            onMouseLeave={() => setDropdownVisible(true)}
            onFocus={() => setDropdownVisible(true)}
          >
            <span>{"Sale"}</span>
          </button>
        </div>
      </nav>
    </div>
  );
};
