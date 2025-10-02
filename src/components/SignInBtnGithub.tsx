"use client"

import { githubLogin } from "@/utils/actions/auth";

export default function SignInBtnGithub() {
  return (
    <button
      onClick={() => githubLogin()}
      className="text-amber-100  text-2xl bg-green-700 hover:bg-green-800 rounded py-2 px-3"
    >
      Continue With Github
    </button>
  );
}
