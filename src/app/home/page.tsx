"use client";

import hero from "@/apis/heros/route";
import ErrorMessage from "@/components/ErrorMessage";
import HeroCard from "@/components/HeroCard";
import Pagination from "@/components/Pagination";
import PerPageSelection from "@/components/PerPageSelection";
import SearchField from "@/components/SearchField";
import SortButton from "@/components/SortButton";
import { ThemeContext } from "@/context/index"; // Importing the ThemeContext
import prepareAllFetchingUrl from "@/utils/prepareAllFetchingUrl"; // Utility function to prepare the fetching URL
import { Suspense, useContext, useEffect, useState } from "react";

interface ContextProps {
  perPage: number;
  setPerPage: React.Dispatch<React.SetStateAction<number>>;
  sortOrder: string;
  setSortOrder: React.Dispatch<React.SetStateAction<string>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

export default function HomePage() {
  // State variables to manage superheroes data, loading state, error state, and pagination
  const [superheroes, setSuperheroes] = useState<Hero[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<null | string>(null);
  const [totalPages, setTotalPages] = useState<number>(1);

  // Using ThemeContext to access the theme, pagination, and sorting states
  const { perPage, sortOrder, page, setPage, searchQuery } = useContext(
    ThemeContext
  ) as ContextProps;

  useEffect(() => {
    const fetchSuperheroes = async () => {
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
      console.log(fetchingUrl);
      try {
        // const data = await fetchAllSuperheroes(fetchingUrl);
        const data = await hero(fetchingUrl);

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
    };
    fetchSuperheroes();
  }, [page, perPage, searchQuery, sortOrder]);

  // If there's an error, display the error message
  if (error) {
    <ErrorMessage> Error: {error}</ErrorMessage>;
  }

  return (
    <div className="container mx-auto p-4 dark:bg-slate-900 min-h-screen">
      {/* <Header /> */}
      <div className="flex flex-col md:flex-row justify-between mb-4 space-y-4 md:space-y-0 dark:text-slate-300">
        {/* input field for search */}
        <SearchField />
        <div className="flex items-center space-x-2">
          {/* Per Page Selection */}
          <label className="text-sm">Show:</label>
          <PerPageSelection />
          {/* Sort Button */}
          <SortButton />
        </div>
      </div>

      {/* Displaying loading state while data is fetching from api */}
      {/* {loading ? (
        <Loading />
      ) : ( */}
      <>
        <Suspense>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ">
            {superheroes.map(
              (hero) =>
                hero.biography && (
                  <HeroCard
                    key={hero.id}
                    id={hero.id ?? ""}
                    image={hero.image ?? { url: "" }}
                    name={hero.name ?? ""}
                    biography={hero.biography}
                  />
                )
            )}
          </div>
        </Suspense>

        <Pagination totalPages={totalPages} />
      </>
      {/* )} */}
    </div>
  );
}
