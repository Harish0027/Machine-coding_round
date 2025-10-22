"use client";
import List from "@/component/List";
import { CheckBoxData, CheckBoxDataType } from "@/public/checkbox";
import { useState } from "react";

export default function Home() {
  const [data, setData] = useState<CheckBoxDataType[]>(CheckBoxData);
  const [checked, setChecked] = useState<Record<string, number>>({});

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <List CheckBoxData={data} checked={checked} setChecked={setChecked} />
    </div>
  );
}
