// importing libraries for the radar chart from Chart.js and React-Chart.js-2
import { Chart, registerables } from "chart.js";
import { useContext, type JSX } from "react";
import { Radar } from "react-chartjs-2";
import { ThemeContext } from "../../context/index";
Chart.register(...registerables);

interface ThemeContextProps {
  darkMode: boolean;
}

export default function PowerStatsRadarChart({
  powerstats,
}: Hero): JSX.Element {
  // get dark mode from react context api
  const { darkMode } = useContext(ThemeContext) as ThemeContextProps;

  const labels: string[] = (powerstats &&
    Object.entries(powerstats).map(
      ([key, value]: [string, number]): string => key
    )) ?? [""];

  const labels_with_nonNull: string[] = Object.entries(powerstats!).map(
    ([key, value]: [string, number]): string => key
  );

  // I figured there is a non-null operator that tells typeScript that the value is never null or undefined.
  // So it removes the possibility of `could be undefined`
  // Solution of the error: `Type 'undefined' is not assignable to type '{}'`
  const values: number[] = Object.entries(powerstats!).map(
    ([key, value]: [string, number]): number => value
  );

  const data = {
    labels: labels,
    datasets: [
      {
        label: "",
        data: values,
        fill: true,
        backgroundColor: "rgba(255, 99, 132, 0.4)",
        borderColor: "rgb(255, 99, 132)",
        pointBackgroundColor: "rgb(255, 99, 132)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(255, 99, 132)",
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      r: {
        angleLines: {
          display: true,
          color: darkMode ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)",
        },
        grid: {
          color: darkMode ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)",
        },
        pointLabels: {
          color: darkMode ? "#fff" : "#000",
          font: { size: 14 },
        },
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: {
          display: false,
          stepSize: 20,
        },
      },
    },
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-4 border-b pb-2 text-gray-900 dark:text-amber-100">
        POWER STATS
      </h2>
      <div className="space-y-3 mb-6">
        <div className="flex justify-center items-center  text-sm w-full">
          {/* Display each power stat with a label and Radar */}
          <Radar data={data} options={options} />
        </div>
      </div>
    </>
  );
}
