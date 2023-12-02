"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import NEW_EVENT_CARD from "@/clientComponent/newEventCard";
import NAVBAR from "@/component/navbar";

const ADD_NEW_EVENT = () => {
  const router = useRouter();

  useEffect(() => {
    const user_data = localStorage.getItem("user_data");
    if (!user_data) {
      router.push("/");
    }
  });

  return (
    <>  
      <div className="w-full min-h-screen">
        <NAVBAR />
        <div className="mt-[20px] text-center">
          <span className="text-[28px] sm:text-[32px] font-black">Add New Event</span>
        </div>
        <NEW_EVENT_CARD />
      </div>
    </>
  );
};

export default ADD_NEW_EVENT;
