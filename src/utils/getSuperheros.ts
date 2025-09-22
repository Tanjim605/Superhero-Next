"use client";

import fetchAllSuperheroes from "@/apis/heros/route";
import { ThemeContext } from "@/context";
import { useContext, useState } from "react";
import prepareAllFetchingUrl from "./prepareAllFetchingUrl";

interface fetchAllSuperheroesContextProps {
  perPage: number;
  sortOrder: string;
  page: number;
  searchQuery: string;
}

export async function getSuperheroes() {
  const { page, perPage, sortOrder, searchQuery } = useContext(
    ThemeContext
  ) as fetchAllSuperheroesContextProps;

  const [superheroes, setSuperheroes] = useState<Hero[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<null | string>(null);
  const [totalPages, setTotalPages] = useState<number>(1);

  setLoading(true);

  const baseUrl: string =
    "https://superhero-api.innovixmatrixsystem.com/api/collections/superheros/records";

  const fetchingUrl: string = prepareAllFetchingUrl(
    baseUrl,
    page,
    perPage,
    searchQuery,
    sortOrder
  );
  try {
    const data = await fetchAllSuperheroes(fetchingUrl);

    setSuperheroes(data.items);
    setTotalPages(data.totalPages);
  } catch (err) {
    if (err instanceof Error) {
      setError(err.message);
    } else {
      console.log("Unknown Error type: ", err);
    }
  } finally {
    setLoading(false);
  }
}
