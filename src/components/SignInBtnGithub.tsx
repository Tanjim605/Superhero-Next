"use client"

import { githubLogin } from "@/utils/actions/auth";

export default function SignInBtnGithub() {
  return (
    <button
      onClick={() => githubLogin()}
      className="text-amber-100  text-2xl bg-green-700 rounded py-1 px-2"
    >
      Continue With Github
    </button>
  );
}
