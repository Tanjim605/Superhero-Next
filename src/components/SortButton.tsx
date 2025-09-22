"use client"

import { ThemeContext } from "@/context";
import { ArrowDownAZ, ArrowDownZA } from "lucide-react";
import { useContext } from "react";

interface ContextProps {
  sortOrder: string;
  setSortOrder: React.Dispatch<React.SetStateAction<string>>;
}

export default function SortButton() {
  const { sortOrder, setSortOrder } = useContext(ThemeContext) as ContextProps;

  // Function to handle sorting order change between ascending and descending by name
  const handleSortChange = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <button
      onClick={handleSortChange}
      className="flex bg-slate-500 text-white p-2 rounded shadow-sm border-1 dark:border-slate-100 dark:bg-slate-800 dark:text-slate-300 transition-colors"
    >
      Sort by
      {sortOrder === "asc" ? <ArrowDownAZ /> : <ArrowDownZA />}
    </button>
  );
}
