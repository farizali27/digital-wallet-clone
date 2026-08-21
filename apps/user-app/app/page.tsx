import { auth } from "../lib/auth";
import { headers } from "next/headers";
import { Appbar } from "@repo/ui/Appbar";
import { signOutAction } from "../actions/auth";

export default async function Home() {
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <div>
      <Appbar user={session?.user} onSignoutAction={signOutAction} />
    </div>
  );
}