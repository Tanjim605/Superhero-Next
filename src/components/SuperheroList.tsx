"use client";

import { fetchAllSuperheroes } from "@/apis/api";
import { ThemeContext } from "@/context";
import prepareAllFetchingUrl from "@/utils/prepareAllFetchingUrl";
import { useContext, useEffect, useState } from "react";
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
  const [superheroes, setSuperheroes] = useState<Hero[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [error, setError] = useState<null | string>(null);

  // Using ThemeContext to access the theme, pagination, and sorting states
  const { perPage, sortOrder, page, setPage, searchQuery } = useContext(
    ThemeContext
  ) as ContextProps;
  console.log("super hero lenght", superheroes.length);
  useEffect(() => {
    async function getSuperheroes() {
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

    getSuperheroes();
  }, [page, perPage, searchQuery, sortOrder]);

  // If there's an error, display the error message
  if (error) {
    <ErrorMessage> Error: {error}</ErrorMessage>;
  }

  return (
    <>
      {/* <Suspense fallback={<div className="h-96 text-center bg-red-600">Loading.....</div>}> */}
      {loading ? (
        <Loading />
      ) : (
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
      )}

      {superheroes.length > 0 && <Pagination totalPages={totalPages} />}
    </>
  );
}
