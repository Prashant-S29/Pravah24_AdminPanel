"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

import EVENT_CARDS from "./eventCard";

// const getEventDetails = async () => {
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}`, {
//       cache: "no-store",
//     });
//     const allEventList = res.json();

//     if (!res.ok) {
//       throw new Error("Failed to fetch events");
//     }
//     // console.log(allEventList);
//     return allEventList;
//   } catch (error) {
//     console.log("Error:  ", error);
//   }
// };

import { getEventDetails } from "@/libs/fetchData";
import PRELOADER_CARD from "./preLoaderCard";

// export default async function EVENTS_LIST() {
const EVENTS_LIST = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState<any>({});

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const data = await getEventDetails();

      if (data["pravahEventsList"]) {
        // setTimeout(() => {
          setIsLoading(false);
        // }, 2000);
      }

      setEvents(data);
      console.log("data", data);
      // console.log("events", events);
    };
    fetchData();
  }, []);
  console.log("events", events);

  // const events = (await getEventDetails()) || undefined;

  return (
    <>
      <div className="w-full min-h-screen">
        <div className="mt-[20px] text-center">
          <span className="text-[32px] font-black">All Events</span>
        </div>
        <div className=" px-[20px] flex gap-5 flex-wrap justify-center my-[20px]">
          {isLoading ? (
            <>
              <PRELOADER_CARD />
              <PRELOADER_CARD />
              <PRELOADER_CARD />
            </>
          ) : (
            <>
              {events["pravahEventsList"] ? (
                events["pravahEventsList"].length === 0 ? (
                  <div>
                    <span className="text-[16px] sm:text-[18px] font-bold uppercase">
                      No events available
                    </span>
                  </div>
                ) : (
                  <>
                    {events["pravahEventsList"].map(
                      (eventDetail: any, index: number) => (
                        <EVENT_CARDS
                          key={index}
                          index={index}
                          eventDetail={eventDetail}
                        />
                      )
                    )}
                  </>
                )
              ) : (
                ""
              )}
            </>
          )}

          {events["pravahEventsList"] &&
            events["pravahEventsList"].length === 0 && (
              <div>
                <div className="text-center">
                  <div className="leading-tight">
                    <span className="font-black text-[28px] sm:text-[32px] md:text-[48px]">
                      Pravah 2024
                    </span>
                  </div>
                  <div>
                    <span className="text-[16px] sm:text-[18px] font-bold uppercase">
                      No events available
                    </span>
                  </div>
                </div>
              </div>
            )}
        </div>
      </div>
    </>
  );
};

export default EVENTS_LIST;
