import { TabBar } from "@/components";
import { cookies } from "next/headers";

export const metadata = {
  title: "Cookies",
  description: "Cookies page",
};

export default function CookiesPage() {

  const cookieStore = cookies();
  const cookieTab = cookieStore.get("selectedTab")?.value ?? '1'; //si no tiene un valir es 1

  const allCookies =  cookieStore.getAll();

  

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div className="flex flex-col ">
        <span className="text-3xl ">Tabs</span>
        <TabBar currentIndex={+cookieTab} />
      </div>
    </div>
  );
}
