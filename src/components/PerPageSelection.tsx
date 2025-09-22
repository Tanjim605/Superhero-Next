"use client";

import { ThemeContext } from "@/context";
import { ChangeEvent, useContext } from "react";

interface SelectionContextProps {
  perPage: number;
  setPerPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PerPageSelection() {
  const { perPage, setPerPage } = useContext(
    ThemeContext
  ) as SelectionContextProps;

  return (
    <select
      value={perPage}
      // e.target.value string return kore oitake number e convert korte hoilo state type er shate milate
      onChange={(e: ChangeEvent<HTMLSelectElement>) =>
        setPerPage(Number(e.target.value))
      }
      className="p-2 w-24 border rounded shadow-sm dark:bg-slate-800 dark:text-slate-300"
    >
      <option value={5}>5</option>
      <option value={10}>10</option>
      <option value={15}>15</option>
      <option value={20}>20</option>
      <option value={25}>25</option>
    </select>
  );
}
