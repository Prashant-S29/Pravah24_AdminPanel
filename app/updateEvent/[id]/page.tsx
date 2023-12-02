// "use client"

import UPDATE_EVENT_CARD from "@/clientComponent/updateEventCard";
import NAVBAR from "@/component/navbar";
import React from "react";

const getEventByID = async (id: any) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("error fetching events");
    }
    // console.log(res.json());
    // console.log("successfully fetched event");
    const eventData = await res.json();
    // console.log(eventData);
    return eventData;
  } catch (error) {
    console.log(error);
  }
};

const UPDATE_EVENT = async ({ params }: { params: any }) => {
  const { id } = params;
  // console.log("id", id);

  const data = await getEventByID(id);
  const particularEventDetails = data["particularEvent"];
  // console.log("event details", particularEventDetails);

  return (
    <>
      <div className="w-full min-h-screen">
        <NAVBAR />
        <div className="mt-[20px] text-center leading-none sm:leading-normal">
          <span className="text-[28px]  sm:text-[32px] font-black">
            Update {particularEventDetails["eventName"]} Events
          </span>
        </div>
        <UPDATE_EVENT_CARD particularEventDetails={particularEventDetails} />
      </div>
    </>
  );
};

export default UPDATE_EVENT;
