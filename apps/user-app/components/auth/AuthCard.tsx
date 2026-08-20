import Link from "next/link";
import { ReactNode } from "react";

interface AuthCardProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footerText: string;
  footerLinkHref: string;
  footerLinkText: string;
}

export function AuthCard({
  title,
  subtitle,
  children,
  footerText,
  footerLinkHref,
  footerLinkText,
}: AuthCardProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
            <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
          </div>

          {children}
        </div>

        <p className="mt-6 text-center text-sm text-slate-500">
          {footerText}{" "}
          <Link
            href={footerLinkHref}
            className="font-medium text-slate-900 hover:underline"
          >
            {footerLinkText}
          </Link>
        </p>
      </div>
    </div>
  );
}