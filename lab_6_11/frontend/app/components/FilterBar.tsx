"use client";

import { useState } from "react";
import { SearchBar } from "./SearchBar";

export function FilterBar() {
  const [filter1, setFilter1] = useState("");
  const [filter2, setFilter2] = useState("");
  const [filter3, setFilter3] = useState("");

  return (
    <div className="bg-white border-b-2 border-gray-300 py-6 mb-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          {/* Filter Dropdowns */}
          <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full md:w-auto">
            <select
              value={filter1}
              onChange={(e) => setFilter1(e.target.value)}
              className="px-6 py-3 border-2 border-gray-300 rounded-full focus:outline-none focus:border-gray-400 bg-white min-w-[180px] appearance-none cursor-pointer"
            >
              <option value="">Filter 1</option>
              <option value="option1">Опція 1</option>
              <option value="option2">Опція 2</option>
              <option value="option3">Опція 3</option>
            </select>

            <select
              value={filter2}
              onChange={(e) => setFilter2(e.target.value)}
              className="px-6 py-3 border-2 border-gray-300 rounded-full focus:outline-none focus:border-gray-400 bg-white min-w-[180px] appearance-none cursor-pointer"
            >
              <option value="">Filter 2</option>
              <option value="option1">Опція 1</option>
              <option value="option2">Опція 2</option>
              <option value="option3">Опція 3</option>
            </select>

            <select
              value={filter3}
              onChange={(e) => setFilter3(e.target.value)}
              className="px-6 py-3 border-2 border-gray-300 rounded-full focus:outline-none focus:border-gray-400 bg-white min-w-[180px] appearance-none cursor-pointer"
            >
              <option value="">Filter 3</option>
              <option value="option1">Опція 1</option>
              <option value="option2">Опція 2</option>
              <option value="option3">Опція 3</option>
            </select>
          </div>

          {/* Search Bar */}
          <div className="w-full md:w-80">
            <SearchBar />
          </div>

          {/* Apply Button */}
          <button className="px-8 py-3 bg-white border-2 border-gray-300 rounded-full hover:bg-gray-50 transition-colors font-medium whitespace-nowrap">
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
