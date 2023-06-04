import { Category, Subcategory } from "@/types"

export const CategoryInfo = ({
    category,
}: {
    category: Category | Subcategory,
}) => {
  return (
    <section>
        <h1 className="font-bold text-2xl my-6">{category.name}</h1>
        <h2 className="text-xl my-6">{category.description}</h2>
    </section>
  )
}
