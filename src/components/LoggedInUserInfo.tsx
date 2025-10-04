import { auth } from "@/auth";
import SignOutBtnGithub from "./SignOutBtnGithub";
import Image from "next/image";

export default async function LoggedInUserInfo() {
  const session = await auth();

  if (session?.user) {
    console.log(session);

    return (
      <div className="flex items-center justify-between w-auto mb-3 p-6 bg-amber-100 dark:bg-gray-400 rounded-2xl shadow-md">
        <div className= "flex gap-3 items-center">
          <div>
            <Image
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

        <SignOutBtnGithub />
      </div>
    );
  }
}
