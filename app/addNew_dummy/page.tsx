"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import NEW_EVENT_CARD from "@/clientComponent/newEventCard";
import NAVBAR from "@/component/navbar";
import DUMMY_EVENT_CARD from "@/clientComponent/dummyEventCard";

const ADDNEW_DUMMY = () => {
  const router = useRouter();

  useEffect(() => {
    const guest_data = localStorage.getItem("guest_data");
    const user_data = localStorage.getItem("user_data");
    if (!guest_data || user_data) {
      router.push("/");
    }
  });

  return (
    <>
      <div className="w-full min-h-screen">
        <NAVBAR />
        <div className="mt-[20px] text-center">
          <span className="text-[28px] sm:text-[32px] font-black">
            Add New Event
          </span>
        </div>
        <div className="text-center mb-[20px]">
          <span className="text-[16px] font-semibold">
            This is a dummy form showcasing how we manage to uplaod new events.
          </span>
        </div>
        <DUMMY_EVENT_CARD />
      </div>
    </>
  );
};

export default ADDNEW_DUMMY;
