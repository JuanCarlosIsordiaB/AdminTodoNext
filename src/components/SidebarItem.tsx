"use client";
import { useRouter } from "next/router";
import Link from "next/link";
import React from "react";
import { CiBookmarkCheck } from "react-icons/ci";
import { usePathname } from "next/navigation";

// Define Props interface
interface Props {
  title: string;
  path: string;
  icon: React.ReactNode;
}

// SidebarItem component
export const SidebarItem = ({ title, path, icon }: Props) => {
  const pathName = usePathname();
  return (
    <Link
      href={path}
      className={` px-4 py-3 flex items-center space-x-4 rounded-md bg-white hover:bg-blue-500 hover:text-white ${
        path === pathName ? "text-white bg-blue-500" : ""
      }
        `}
    >
      {icon}
      <span className="-mr-1 font-medium">{title}</span>
    </Link>
  );
};
