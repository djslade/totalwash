import { emptyCategoryObject } from "@/data";
import { Category, Subcategory } from "@/types";
import { Dispatch, SetStateAction } from "react";
import { AiOutlineLeft } from "react-icons/ai";

export const SidebarSubcategories = ({
  subcategories,
  selectedCategory,
  setSelectedCategory,
  navigate,
}: {
  subcategories: Category[];
  selectedCategory: Category;
  setSelectedCategory: Dispatch<SetStateAction<Category>>;
  navigate: (path: string) => void;
}) => {
  return (
    <nav className="justify-between items-start flex flex-col text-base flex-nowrap w-full whitespace-nowrap">
      <div className="font-bold text-xl bg-gray-700 text-gray-100 w-full h-20 px-6 flex items-center justify-between">
        <h2>{selectedCategory.name}</h2>
        <button onClick={() => setSelectedCategory(emptyCategoryObject)}>
          <AiOutlineLeft />
        </button>
      </div>
      <div className="border-b-2">
        <button
          className="py-3 flex items-center justify-start w-72 px-6 h-20"
          role="link"
          onClick={() =>
            navigate(`/catalog/categories/${selectedCategory.slug}`)
          }
        >
          <span>All {selectedCategory.name}</span>
        </button>
      </div>
      {subcategories.map((subcategory) =>
        subcategory.parents.map(
          (savedCategory: any) =>
            savedCategory._id === selectedCategory._id && (
              <div key={subcategory._id} className="border-b-2">
                <button
                  className="py-3 flex items-center justify-start w-72 px-6 h-20"
                  role="link"
                  onClick={() =>
                    navigate(`/catalog/categories/${subcategory.slug}`)
                  }
                >
                  <span>{subcategory.name}</span>
                </button>
              </div>
            ),
        ),
      )}
    </nav>
  );
};
