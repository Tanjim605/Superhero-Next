import { signIn, signOut } from "next-auth/react";

export const githubLogin = async () => {
  await signIn("github", { callbackUrl: "/home" });
};

export const googleLogin = async () => {
  await signIn("google", { callbackUrl: "/home" });
};

export const logout = async () => {
  await signOut({ callbackUrl: "/" });
};
