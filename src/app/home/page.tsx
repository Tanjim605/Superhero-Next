import PerPageSelection from "@/components/PerPageSelection";
import SearchField from "@/components/SearchField";
import SortButton from "@/components/SortButton";
import SuperheroList from "@/components/SuperheroList";

export default function HomePage() {
  // State variables to manage superheroes data, loading state, error state, and pagination

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

      <SuperheroList />
    </div>
  );
}
