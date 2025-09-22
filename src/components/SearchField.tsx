"use client";

import { ThemeContext } from "@/context";
import { ChangeEvent, useContext } from "react";

interface SearchContextProps {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchField() {
  const { setPage, searchQuery, setSearchQuery } = useContext(
    ThemeContext
  ) as SearchContextProps;

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(1); // Reset to first page on new search
  };

  return (
    <input
      type="text"
      placeholder="Search by name..."
      value={searchQuery}
      onChange={handleSearchChange}
      className="p-2 border rounded shadow-sm w-full md:w-1/3 dark:bg-slate-800 dark:text-slate-300"
    />
  );
}
