import { useGlobalContext } from "../context/GlobalContext";

export default function CategoryFilter() {
    const { categories, selectedCategory, setSelectedCategory } = useGlobalContext();

    return (
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            {categories.map((category, index) => (
                <option key={index} value={category}>
                    {category}
                </option>
            ))}
        </select>
    );
}
