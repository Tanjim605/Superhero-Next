"use client";

import { useSession } from "next-auth/react";
import SignOutBtn from "./SignOutBtn";

export default function LoggedInUserInfo() {
  const { data: session } = useSession();

  if (session?.user) {
    // console.log(session);

    return (
      <div className="flex items-center justify-between w-auto mb-3 p-6 bg-amber-100 dark:bg-gray-400 rounded-2xl shadow-md">
        <div className="flex gap-3 items-center">
          <div>
            <img
              src={session?.user?.image ?? ""}
              alt={session?.user?.name ?? ""}
              className="w-8 rounded-full"
            />
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-800">
              Welcome {session?.user?.name}
            </p>
            <p className="text-sm text-gray-600">
              Mail: {session?.user?.email}
            </p>
          </div>
        </div>

        <SignOutBtn />
      </div>
    );
  }
}
