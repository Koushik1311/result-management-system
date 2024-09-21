"use client";

import { DashboardLinksData } from "@/constants/dashboard-link";
import cn from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardTab() {
  const pathname = usePathname();

  return (
    <ul className="flex items-center gap-6">
      {DashboardLinksData.map((link, index) => (
        <li key={index}>
          <Link
            href={link.uri}
            className={cn(
              "font-medium text-gray-500",
              pathname === link.uri
                ? "text-violet-600 underline underline-offset-[12px] decoration-2"
                : "hover:text-gray-700 hover:underline underline-offset-[12px] decoration-2"
            )}
          >
            {/* <link.icon /> */}
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
