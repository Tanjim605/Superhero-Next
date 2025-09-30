"use client"

import { login } from "@/utils/actions/auth";

export default function SignInBtnGithub() {
  return (
    <button
      onClick={() => login()}
      className="text-amber-100  text-2xl bg-green-700 rounded py-1 px-2"
    >
      Continue With Github
    </button>
  );
}
