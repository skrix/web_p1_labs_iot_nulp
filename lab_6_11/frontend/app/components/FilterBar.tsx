import { useState, useEffect } from "react";
import { SearchBar } from "./SearchBar";
import { FilterDropdown } from "./FilterDropdown";
import { categoriesApi, type Category } from "../services/categories.api";
import { brandsApi, type Brand } from "../services/brands.api";

interface FilterBarProps {
  onSearchChange: (search: string) => void;
  onCategoryChange: (category: string) => void;
  onBrandChange: (brand: string) => void;
  onPriceChange: (price: string) => void;
}

export function FilterBar({ onSearchChange, onCategoryChange, onBrandChange, onPriceChange }: FilterBarProps) {
  const [filterCategory, setFilterCategory] = useState("");
  const [filterBrand, setFilterBrand] = useState("");
  const [filterPrice, setFilterPrice] = useState("");
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [categoriesData, brandsData] = await Promise.all([
          categoriesApi.getAll(),
          brandsApi.getAll()
        ]);
        setCategories(categoriesData);
        setBrands(brandsData);
      } catch (error) {
        console.error('Failed to fetch filters:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilters();
  }, []);

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  const handleApplySearch = () => {
    onSearchChange(search);
  };

  const handleCategoryChange = (value: string) => {
    setFilterCategory(value);
    onCategoryChange(value);
  };

  const handleBrandChange = (value: string) => {
    setFilterBrand(value);
    onBrandChange(value);
  };

  const handlePriceChange = (value: string) => {
    setFilterPrice(value);
    onPriceChange(value);
  };

  const categoryOptions = categories.map(category => ({
    value: category.slug,
    label: category.label
  }));

  const brandOptions = brands.map(brand => ({
    value: brand.slug,
    label: brand.name
  }));

  const priceOptions = [
    { value: "0-300", label: "До 300 ₴" },
    { value: "300-600", label: "300-600 ₴" },
    { value: "600-1000", label: "600-1000 ₴" },
    { value: "1000-1500", label: "1000-1500 ₴" },
    { value: "1500-2000", label: "1500-2000 ₴" },
    { value: "2000-3000", label: "2000-3000 ₴" },
    { value: "3000+", label: "Понад 3000 ₴" },
  ];

  return (
    <div className="bg-white dark:bg-gray-950 py-6 mb-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full md:w-auto">
            <FilterDropdown
              value={filterCategory}
              onChange={handleCategoryChange}
              label="Категорія"
              options={categoryOptions}
            />

            <FilterDropdown
              value={filterBrand}
              onChange={handleBrandChange}
              label="Бренд"
              options={brandOptions}
            />

            <FilterDropdown
              value={filterPrice}
              onChange={handlePriceChange}
              label="Ціна"
              options={priceOptions}
            />
          </div>

          <div className="w-full md:w-80">
            <SearchBar value={search} onChange={handleSearchChange} onSearch={handleApplySearch} />
          </div>

          <button
            onClick={handleApplySearch}
            className="px-8 py-3 bg-black hover:bg-black/50 dark:bg-white dark:hover:bg-white/50 text-white dark:text-black font-medium whitespace-nowrap transition-colors cursor-pointer"
          >
            Пошук
          </button>
        </div>
      </div>
    </div>
  );
}
