"use client";

import { fetchAllSuperheroes } from "@/apis/api";
import { ThemeContext } from "@/context";
import prepareAllFetchingUrl from "@/utils/prepareAllFetchingUrl";
import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import ErrorMessage from "./ErrorMessage";
import HeroCard from "./HeroCard";
import Loading from "./Loading";
import Pagination from "./Pagination";

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

export default function SuperheroList() {
  // const [superheroes, setSuperheroes] = useState<Hero[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);

  // Using ThemeContext to access the theme, pagination, and sorting states
  const { perPage, sortOrder, page, setPage, searchQuery } = useContext(
    ThemeContext
  ) as ContextProps;

  async function getSuperheroes() {
    const baseUrl: string =
      "https://superhero-api.innovixmatrixsystem.com/api/collections/superheros/records";

    const fetchingUrl: string = prepareAllFetchingUrl(
      baseUrl,
      page,
      perPage,
      searchQuery,
      sortOrder
    );
    const data = await fetchAllSuperheroes(fetchingUrl);
    return data;
  }

  const {
    data: superheroes,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["heroes", page, perPage, searchQuery, sortOrder, totalPages],
    queryFn: getSuperheroes,
  });

  if (error) {
    <ErrorMessage> Error: {error.message}</ErrorMessage>;
  }

  return (
    <>
      {/* <Suspense fallback={<div className="h-96 text-center bg-red-600">Loading.....</div>}> */}
      {isLoading ? (
        <Loading perPage={perPage}/>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ">
            {superheroes?.items?.map(
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
          <div>
            {superheroes?.items?.length! > 0 && (
              <Pagination totalPages={superheroes?.totalPages!} />
            )}
          </div>
        </>
      )}
    </>
  );
}
