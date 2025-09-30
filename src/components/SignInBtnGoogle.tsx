"use client"

import { googleLogin } from "@/utils/actions/auth";

export default function SignInBtnGoogle() {
  return (
    <button
      onClick={() => googleLogin()}
      className="text-gray-800 text-2xl bg-white shadow rounded py-1 px-2"
    >
      Continue With Google
    </button>
  );
}
