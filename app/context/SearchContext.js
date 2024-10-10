"use client";
import { createContext, useState } from "react";

export const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSeason, setSelectedSeason] = useState("");

  const updateSearchTerm = (term) => setSearchTerm(term);
  const updateYear = (year) => setSelectedYear(year);
  const updateSeason = (season) => setSelectedSeason(season);

  return (
    <SearchContext.Provider
      value={{ searchTerm, selectedYear, selectedSeason, updateSearchTerm, updateYear, updateSeason }}
    >
      {children}
    </SearchContext.Provider>
  );
}
