"use client";

import { useState } from "react";
import { SearchBar } from "./SearchBar";
import { FilterDropdown } from "./FilterDropdown";

export function FilterBar() {
  const [filter1, setFilter1] = useState("");
  const [filter2, setFilter2] = useState("");
  const [filter3, setFilter3] = useState("");

  const filterOptions = [
    { value: "option1", label: "Опція 1" },
    { value: "option2", label: "Опція 2" },
    { value: "option3", label: "Опція 3" },
  ];

  return (
    <div className="bg-white py-6 mb-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          {/* Filter Dropdowns */}
          <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full md:w-auto">
            <FilterDropdown
              value={filter1}
              onChange={setFilter1}
              label="Filter 1"
              options={filterOptions}
            />

            <FilterDropdown
              value={filter2}
              onChange={setFilter2}
              label="Filter 2"
              options={filterOptions}
            />

            <FilterDropdown
              value={filter3}
              onChange={setFilter3}
              label="Filter 3"
              options={filterOptions}
            />
          </div>

          {/* Search Bar */}
          <div className="w-full md:w-80">
            <SearchBar />
          </div>

          {/* Apply Button */}
          <button className="px-8 py-3 bg-black hover:bg-black/50 text-white font-medium whitespace-nowrap transition-colors cursor-pointer">
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
