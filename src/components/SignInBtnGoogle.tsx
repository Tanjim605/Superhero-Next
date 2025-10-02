"use client"

import { googleLogin } from "@/utils/actions/auth";

export default function SignInBtnGoogle() {
  return (
    <button
      onClick={() => googleLogin()}
      className="text-gray-800 text-2xl bg-white hover:bg-gray-400 shadow rounded py-2 px-3"
    >
      Continue With Google
    </button>
  );
}
