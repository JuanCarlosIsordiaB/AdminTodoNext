"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import React from "react";
import { CiLogout } from "react-icons/ci";

export const LogOutButton = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <button className="px-4 py-3 flex items-center space-x-4 rounded-md group text-gray-500 transition-colors">
        <span className="">Espere....</span>
      </button>
    );
  }
  if (status === "unauthenticated") {
    return (
      <button
        className="px-4 py-3 flex items-center space-x-4 rounded-md group text-gray-500 transition-colors"
        onClick={() => signIn()}
      >
        <span className="">Ingresar a la aplicación</span>
      </button>
    );
  }

  console.log({ status });

  return (
    <button
      className="px-4 py-3 flex items-center space-x-4 rounded-md text-white group bg-red-500 hover:bg-red-600 transition-colors"
      onClick={() => signOut()}
    >
      <CiLogout />
      <span className="">Logout</span>
    </button>
  );
};

export default LogOutButton;
