import React from "react";

import { testEventDetails } from "@/constant";
import EVENT_REG_CARDS from "./eventCard";

const EVENTS_LIST = () => {
  return (
    <>
      <div className="w-full min-h-screen">
        <div className="mt-[20px] text-center">
          <span className="text-[32px] font-black">All Events</span>
        </div>
        <div className=" px-[20px] flex gap-5 flex-wrap justify-center my-[20px]">
          {testEventDetails.map((eventDetail, index) => (
            <EVENT_REG_CARDS
              key={index}
              index={index}
              eventDetail={eventDetail}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default EVENTS_LIST;
