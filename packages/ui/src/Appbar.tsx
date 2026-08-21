"use client"
import { Button } from "./button";
import { useRouter } from "next/navigation"

interface AppbarProps {
  user?: { name?: string | null };
  onSignoutAction: () => Promise<void>;
  onLoginAction?: () => void | Promise<void>; // custom login handler (e.g. OAuth)
  loginHref?: string; // fallback: route-based login
}

export const Appbar = ({ user, onSignoutAction, onLoginAction, loginHref = "/login" }: AppbarProps) => {
  const router = useRouter();

  const handleLogin = () => {
    if (onLoginAction) {
      onLoginAction();
    } else {
      router.push(loginHref);
    }
  };

  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="text-xl font-bold tracking-tight text-gray-900">
          PayFlow
        </div>
        <div className="flex items-center gap-4">
          <Button onClick={user ? () => onSignoutAction() : handleLogin}>
            {user ? "Logout" : "Login"}
          </Button>
        </div>
      </div>
    </header>
  );
};