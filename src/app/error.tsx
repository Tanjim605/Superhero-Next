"use client";

import Link from "next/link";

export default function Error() {
  return (
    <div className="text-center">
      <h1 className="text-2xl text-red-500">Something went wrong</h1>
      <p className="dark:text-amber-50">
        Please, go back to <Link href={"/"} className="font-bold text-blue-500">Home page</Link>
      </p>
    </div>
  );
}
