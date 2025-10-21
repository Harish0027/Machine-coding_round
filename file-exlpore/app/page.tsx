"use client";
import List from "@/component/List";
import { fileData, fileDataType } from "@/public/dummyData";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [data, setData] = useState<fileDataType[]>(fileData);
  return (
    <div className="font-sans  items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <List data={data} />
    </div>
  );
}
