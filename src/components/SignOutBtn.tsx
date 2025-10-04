"use client";

import { logout } from "@/utils/actions/auth";

export default function SignOutBtn() {
  return (
    <button
      onClick={() => logout()}
      className={
        "text-red-400 font-bold text-2xl  rounded py-1 px-2 text-nowrap"
      }
    >
      Log Out
    </button>
  );
}
