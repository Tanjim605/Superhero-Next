import SignInBtnGithub from "@/components/SignInBtnGithub";
import type { JSX } from "react";

export default function HomePage(): JSX.Element {
  // redirect("/home");
  return (
    <>
      <div className="flex-col flex justify-start align-content-center gap-10 lg:py-8 mx-8">
        <div className="text-gray-900 dark:text-green-200 flex flex-col gap-8 justify-center py-2 items-center w-full">
          <span className="text-6xl  lg:text-8xl">SuperHero</span>
          <div className="text-gray-600 dark:text-gray-300 flex flex-col gap-4 justify-center text-2xl font-bold text-center lg:text-3xl">
            <div>A Superhero database.</div>
            <div>For your daily super hero reference.</div>
          </div>
        </div>
        <div className="text-lg justify-center items-center flex gap-4">
          
          <SignInBtnGithub />
        </div>
      </div>
    </>
  );
}
