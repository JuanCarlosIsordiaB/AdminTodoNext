import { WidgetItem } from "@/components";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin"); //
  }
  return (
    <div>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        <WidgetItem title="Usuario Conectado Server Side">
          <div className="flex flex-col">
            <p>Usuario: {session.user?.name} </p>
            <img
              className="rounded-xl"
              src={session.user?.image ?? ""}
              alt={session.user?.name ?? ""}
            />
            <p>Email: {session.user?.email} </p>
          </div>
        </WidgetItem>
      </div>
    </div>
  );
}
