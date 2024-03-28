"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function ProfilePage() {
  const { data: session } = useSession();

  useEffect(() => {
    console.log("Client Side");
  }, []);

  return (
    <div>
      <h1>Hello Page</h1>
      <hr />
      <div className="flex flex-col">
        <span>{session?.user?.name ?? "No Name"}</span>
      </div>
    </div>
  );
}
