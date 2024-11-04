// components/chargesList/CategoryFilter.js
export default function CategoryFilter({ categories, selectedCategory, setSelectedCategory }) {
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
