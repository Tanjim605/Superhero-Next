import type { JSX } from "react";
import HomeLoadingCard from "./HomeLoadingCard";

export default function Loading({ perPage }: { perPage: number }): JSX.Element {
  const loaders = [];
  for (let i: number = 0; i < perPage; i++) {
    loaders.push(<HomeLoadingCard key={i} />);
  }
  return (
    <>
      {/* <div className="flex justify-center items-center h-screen">
        Loading...
      </div> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ">
        {loaders}
      </div>
    </>
  );
}
