"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const EVENT_REG_CARDS = ({
  index,
  eventDetail,
}: {
  index: number;
  eventDetail: any;
}) => {
  const remainingSlots =
    eventDetail.eventMaxParicipationLimit -
    eventDetail.eventCurrentParticipation;

  const [detailDisplay, setDetailDisplay] = useState(false);
  return (
    <div
      key={index}
      className="w-full sm:w-fit h-fit block gap-5 bg-white rounded-[20px] border border-black p-[10px]"
    >
      <div className="flex justify-center overflow-hidden w-full sm:w-[300px]  h-[200px]">
        <div
          className="duration-300 rounded-[17px] w-full sm:w-[300px]"
          style={
            detailDisplay
              ? { transform: "translateY(-100%)" }
              : {
                  transform: "translateY(0)",
                }
          }
        >
          <div>
            <Image
              src={eventDetail.eventPhotoLink}
              alt="lol"
              className="object-cover object-top rounded-[17px] w-full sm:w-[300px] h-[200px]"
            />
          </div>
          <div className="text-center font-medium  w-full sm:w-[300px] h-[200px] bg-slate-200 flex justify-center items-center rounded-[17px]   py-[10px] ">
            <div className="px-[10px] text-[14px]  sm:text-[16px]">
              <div>
                <span>
                  Registration Fee: <b>₹{eventDetail.eventRegistrationFee}</b>/-{" "}
                  {eventDetail.eventType}
                </span>
              </div>
              <div className="w-full h-[0.5px] bg-black rounded-full my-[5px]" />
              <div>
                <span>Date: {eventDetail.eventDate}</span>
              </div>
              <div className="w-full h-[0.5px] bg-black rounded-full my-[5px]" />

              <div>
                <span>Time: {eventDetail.eventTime}</span>
              </div>
              <div className="w-full h-[0.5px] bg-black rounded-full my-[5px]" />

              <div>
                <span>Venue: {eventDetail.eventVenue}</span>
              </div>
              <div className="w-full mt-[10px]">
                <Link href="/">
                  <button className="w-full px-[20px] py-[8px] text-[12px] sm:text-[14px] font-semibold text-white bg-black rounded-[8px]">
                    Download Brochure
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[10px]  text-center  ">
        <div>
          <span className="text-[20px] font-extrabold">
            {eventDetail.eventName}
          </span>
        </div>

        {remainingSlots <= 0 ? (
          <div>
            <span className="text-[14px] sm:text-[16px] font-medium">
              Registration Full
            </span>
          </div>
        ) : (
          <div>
            <span className="text-[14px] sm:text-[16px] font-medium">
              Slots Left: {remainingSlots}
              /80
            </span>
          </div>
        )}
      </div>
      <div className="text-center duration-300 "></div>

      <div className="w-full flex  justify-center gap-2 mt-[10px]">
        {remainingSlots > 0 ? (
          <div className="w-full">
            <Link href="">
              <button className="w-full px-[20px] py-[8px] text-[12px] sm:text-[14px] font-semibold text-white bg-black rounded-[8px]">
                Register
              </button>
            </Link>
          </div>
        ) : (
          ""
        )}

        <div className="w-full">
          <button
            className="w-full px-[20px] py-[8px] text-[12px] sm:text-[14px] font-semibold text-white bg-black rounded-[8px]"
            onClick={(e) => {
              setDetailDisplay(!detailDisplay);
            }}
          >
            {detailDisplay ? "Hide Details" : "Show Details"}
          </button>
        </div>
      </div>
      <div className="w-full flex  justify-center gap-2 mt-[8px]">
        <div className="w-full">
          <Link href="">
            <button
              className="w-full px-[20px] py-[8px] text-[12px] sm:text-[14px] font-semibold text-white bg-green-600 
            rounded-[8px]"
            >
              Update
            </button>
          </Link>
        </div>
        <div className="w-full">
          <Link href="">
            <button
              className="w-full px-[20px] py-[8px] text-[12px] sm:text-[14px] font-semibold text-white bg-red-600 
            rounded-[8px]"
            >
              Delete
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EVENT_REG_CARDS;
