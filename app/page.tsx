"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

import EVENTS_LIST from "@/clientComponent/events_list";
import NAVBAR from "@/component/navbar";

const HOME = () => {
  const router = useRouter();

  useEffect(() => {
    const user_data = localStorage.getItem("user_data");
    if (!user_data) {
      router.push("/login");
    }
  });

  return (
    <>
      <div className="w-full">
        <NAVBAR />
        <EVENTS_LIST />
      </div>
    </>
  );
};

export default HOME;
