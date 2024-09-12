import { auth } from "@/auth";
import Dashboard from "@/components/Dashboard";
import SignIn from "@/components/SignIn";
import { Button, buttonVariants } from "@/components/ui/button";
import { prisma } from "@/prisma";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const session = await auth();
  
  const signedIn = !!session?.user;


  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {signedIn ? (
          <>
            <h2 className="text-xl font-bold">Hello, {session?.user?.name}</h2>
            <Link className={buttonVariants()} href='/dashboard'>Dashboard</Link>
            {session?.user?.role === 'ADMIN' && (
              <>
              <h3 className="text-lg font-bold">Edit Models</h3>
              <Link className={buttonVariants()} href="/models">Models</Link>
              </>
            )}
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold">Login to use the tool.</h2>
            <SignIn />
          </>
        )}
      </main>
    </div>
  );
}
