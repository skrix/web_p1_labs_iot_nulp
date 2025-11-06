"use client";

import { useState } from "react";
import { SearchBar } from "./SearchBar";
import { FilterDropdown } from "./FilterDropdown";

interface FilterBarProps {
  onSearchChange: (search: string) => void;
}

export function FilterBar({ onSearchChange }: FilterBarProps) {
  const [filter1, setFilter1] = useState("");
  const [filter2, setFilter2] = useState("");
  const [filter3, setFilter3] = useState("");
  const [search, setSearch] = useState("");

  const handleSearchChange = (value: string) => {
    setSearch(value);
    onSearchChange(value);
  };

  const categoryOptions = [
    { value: "pourover", label: "Пуровери" },
    { value: "chemex", label: "Кемекси" },
    { value: "aeropress", label: "Аеропреси" },
    { value: "filters", label: "Фільтри" },
    { value: "kettles", label: "Чайники" },
    { value: "servers", label: "Сервери" },
    { value: "scales", label: "Ваги" },
    { value: "grinders", label: "Кавомолки" },
    { value: "accessories", label: "Аксесуари" },
  ];

  const materialOptions = [
    { value: "steel", label: "Нержавіюча сталь" },
    { value: "ceramic", label: "Кераміка" },
    { value: "glass", label: "Скло" },
    { value: "plastic", label: "Пластик" },
    { value: "copper", label: "Мідь" },
    { value: "aluminum", label: "Алюміній" },
    { value: "wood", label: "Дерево" },
    { value: "silicone", label: "Силікон" },
  ];

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
          {/* Filter Dropdowns */}
          <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full md:w-auto">
            <FilterDropdown
              value={filter1}
              onChange={setFilter1}
              label="Категорія"
              options={categoryOptions}
            />

            <FilterDropdown
              value={filter2}
              onChange={setFilter2}
              label="Матеріал"
              options={materialOptions}
            />

            <FilterDropdown
              value={filter3}
              onChange={setFilter3}
              label="Ціна"
              options={priceOptions}
            />
          </div>

          {/* Search Bar */}
          <div className="w-full md:w-80">
            <SearchBar value={search} onChange={handleSearchChange} />
          </div>

          {/* Apply Button */}
          <button className="px-8 py-3 bg-black hover:bg-black/50 dark:bg-white dark:hover:bg-white/50 text-white dark:text-black font-medium whitespace-nowrap transition-colors cursor-pointer">
            Застосувати
          </button>
        </div>
      </div>
    </div>
  );
}
