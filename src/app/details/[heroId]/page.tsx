"use client";

import { fetchSuperheroDetails } from "@/apis/api"; // Our API function
import HeroDetailsLoader from "@/components/DetailPageLoader";
import ErrorMessage from "@/components/ErrorMessage";
import Appearance from "@/components/heroDetails/Appearance";
import Biography from "@/components/heroDetails/Biography";
import ComicAndAlignment from "@/components/heroDetails/ComicAndAlignment";
import Connections from "@/components/heroDetails/Connections";
import CreatedAndUpdated from "@/components/heroDetails/CreatedAndUpdated";
import HeroImage from "@/components/heroDetails/HeroImage";
import Name from "@/components/heroDetails/Name";
import PowerStatsBarChart from "@/components/heroDetails/PowerStatsBarChart";
import PowerStatsRadarChart from "@/components/heroDetails/PowerStatsRadarChart";
import Work from "@/components/heroDetails/Work";
import { useQuery } from "@tanstack/react-query";
import { ChartBar, Hexagon } from "lucide-react"; // Importing the ChartBar icon
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState, type JSX } from "react";

export default function SuperheroDetails(): JSX.Element {
  const { heroId } = useParams() as { heroId: string };
  console.log(heroId);

  const [chartType, setChartType] = useState<string>("radar"); // State to toggle between bar and radar chart

  const {
    data: hero,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["hero"],
    queryFn: async () => {
      return await fetchSuperheroDetails(heroId);
    },
    gcTime:0  // this is used to prevent caching.
              // If there is cache it shows the previous hero data until the fetching is done.
              // Now it shows loading state. by useQuery
  });

  // Scroll to top when the component mounts
  // This ensures that when navigating to the details page, the view starts at the top
  // without this the page loads at the bottom if the user was scrolled down on the homepage
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // display the loader while the hero details are being fetched
  if (isLoading) {
    return <HeroDetailsLoader />; // Add spinner here
  }

  // If hero is not found, display an error message
  if (!hero) {
    <ErrorMessage>Hero not found!</ErrorMessage>;
  }

  return (
    <div className="relative container mx-auto p-4">
      {/* Back Button */}
      <Link href="/" className=" ">
        <div className="h-12 w-22 ml-4 lg:ml-10 hover:scale-110 transition-all bg-blue-950 rounded-xl shadow-lg mb-4 flex items-center justify-center text-white font-semibold">
          &larr; Back
        </div>
      </Link>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6 md:p-8 dark:bg-slate-900 rounded-lg shadow-lg">
        {/* Main card container */}

        {/* Hero Details Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full flex flex-col lg:flex-row font-inter">
          {/* Left Section: Image, Name and Appearance */}
          <div className="lg:w-1/2 bg-gray-200 dark:bg-slate-900 text-gray-900 dark:text-amber-50 p-6 flex flex-col items-center justify-start relative">
            {/* Main Hero Image */}
            <HeroImage
              image={hero?.image ?? { url: "" }}
              altText={hero?.name ?? ""}
            />

            {/* Name and Full Name */}
            <Name
              name={hero?.name ?? ""}
              fullName={hero?.biography?.["full-name"] ?? ""}
            />

            {/* Appearance Section */}
            <Appearance
              appearance={
                hero?.appearance ?? {
                  gender: "",
                  race: "",
                  height: [""],
                  weight: [""],
                  "eye-color": "",
                  "hair-color": "",
                }
              }
            />
          </div>

          {/* Right Section: Details */}
          <div className="lg:w-1/2 p-6 bg-white text-gray-800 dark:bg-slate-800 dark:text-gray-300">
            {/* Comic and Alignment Badges */}
            <ComicAndAlignment
              biography={
                hero?.biography ?? {
                  "full-name": "",
                  "alter-egos": "",
                  aliases: [""],
                  "place-of-birth": "",
                  "first-appearance": "",
                  publisher: "",
                  alignment: "",
                }
              }
            />

            {/* Toggle Button for Chart Type */}
            <div className="mb-4">
              <button
                onClick={() =>
                  setChartType(chartType === "bar" ? "radar" : "bar")
                }
              >
                {chartType === "bar" ? (
                  <div className="flex items-center gap-2">
                    <Hexagon />
                    <ChartBar className="bg-blue-400 rounded hover:bg-blue-500 h-8 w-8 p-1 transition-colors" />
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Hexagon className="bg-blue-400 rounded hover:bg-blue-500 h-8 w-8 p-1 transition-colors" />
                    <ChartBar />
                  </div>
                )}
              </button>
            </div>
            {/* Power Stats Section based on chart type */}
            {chartType === "bar" ? (
              <PowerStatsBarChart
                powerstats={
                  hero?.powerstats ?? {
                    intelligence: 0,
                    strength: 0,
                    speed: 0,
                    durability: 0,
                    power: 0,
                    combat: 0,
                  }
                }
              />
            ) : (
              <PowerStatsRadarChart
                powerstats={
                  hero?.powerstats ?? {
                    intelligence: 0,
                    strength: 0,
                    speed: 0,
                    durability: 0,
                    power: 0,
                    combat: 0,
                  }
                }
              />
            )}

            {/* Biography Section */}
            <Biography
              biography={
                hero?.biography ?? {
                  "full-name": "",
                  "alter-egos": "",
                  aliases: [""],
                  "place-of-birth": "",
                  "first-appearance": "",
                  publisher: "",
                  alignment: "",
                }
              }
            />

            {/* Work Section */}
            <Work work={hero?.work ?? { occupation: "", base: "" }} />

            {/* Connections Section */}
            <Connections
              connections={
                hero?.connections ?? {
                  "group-affiliation": "",
                  relatives: "",
                }
              }
            />

            {/* Created/Updated Dates */}
            <CreatedAndUpdated
              created={hero?.created ?? ""}
              updated={hero?.updated ?? ""}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
