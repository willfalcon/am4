import { ComponentPropsWithRef } from "react";
import { Button } from "./ui/button";
import { signOut } from "@/auth";

export default function SignOut(props: ComponentPropsWithRef<typeof Button>) {
  return (
    <form
      action={async () => {
        'use server';
        await signOut();
      }}
      className="w-full"
    >
      <Button variant="ghost" className="w-full p-0" {...props}>
        Sign Out
      </Button>
    </form>
  );
}
