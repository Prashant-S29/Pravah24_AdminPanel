import React from "react";
import Link from "next/link";

import EVENT_CARDS from "./eventCard";

const getEventDetails = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}`, {
      cache: "no-store",
    });
    const allEventList = res.json();

    if (!res.ok) {
      throw new Error("Failed to fetch events");
    }
    // console.log(allEventList);
    return allEventList;
  } catch (error) {
    console.log("Error:  ", error);
  }
};

export default async function EVENTS_LIST() {
  const events = await getEventDetails();

  return (
    <>
      <div className="w-full min-h-screen">
        <div className="mt-[20px] text-center">
          <span className="text-[32px] font-black">All Events</span>
        </div>
        <div className=" px-[20px] flex gap-5 flex-wrap justify-center my-[20px]">
          {Object.keys(events["pravahEventsList"]).length === 0 ? (
            <div>
              <div>
                <span>Seem like there are no events</span>
              </div>
              <div className="mt-[10px] flex justify-center">
                <Link href="/addNew">
                  <button
                    type="button"
                    className=" w-[200px] px-[10px] py-[8px] bg-black text-white text-[14px] font-semibold rounded-[8px]"
                  >
                    Add an Event
                  </button>
                </Link>
              </div>
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
          )}
        </div>
      </div>
    </>
  );
}

// export default EVENTS_LIST;
