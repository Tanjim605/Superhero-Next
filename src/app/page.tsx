import Link from "next/link";
import { redirect } from "next/navigation";
export default function HomePage() {
  redirect("/home");
  return (
    <>
      <h1>HomePage</h1>
      <Link href={"/home"}>HOME</Link>
    </>
  );
}
