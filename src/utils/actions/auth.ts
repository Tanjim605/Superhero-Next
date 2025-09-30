"use server";

import { signIn, signOut } from "@/auth";

export const githubLogin = async () => {
  await signIn("github", { redirectTo: "/home" });
};

export const googleLogin = async () => {
    await signIn("google", { redirectTo: "/home" })
}

export const logout = async () => {
  await signOut({ redirectTo: "/" });
};
