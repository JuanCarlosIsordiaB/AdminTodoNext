"use client";

import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  currentIndex: number;
  tabOptions: number[];
}

export const TabBar = ({
  tabOptions = [1, 2, 3, 4],
  currentIndex = 1,
}: Props) => {
  const router = useRouter();
  const [selected, setSelected] = useState(currentIndex);

  const onTabSelected = (tab: number) => {
    setSelected(tab);
    setCookie("selectedTab", tab.toString());
    router.refresh();
  };
  return (
    <div
      className={`grid w-full ${
        "grid-cols-" + tabOptions.length
      } space-x-2 rounded-xl bg-gray-300 p-2`}
    >
      {tabOptions.map((tabOption) => (
        <div key={tabOption}>
          <input
            checked={selected === tabOption}
            type="radio"
            id={tabOption.toString()}
            className="peer hidden"
            onChange={() => {}}
          />
          <label
            onClick={() => onTabSelected(tabOption)}
            className="transition-all block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
          >
            {tabOption}
          </label>
        </div>
      ))}
    </div>
  );
};
