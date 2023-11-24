import NEW_EVENT_CARD from "@/clientComponent/newEventCard";
import NAVBAR from "@/component/navbar";
import Image from "next/image";
import React from "react";

const ADD_NEW_EVENT = () => {
  return (
    <>
      <div className="w-full min-h-screen">
        <NAVBAR />
        {/* <div>
          <Image
            src="https://res.cloudinary.com/denl2iizs/image/upload/v1700624743/pravah2k24/gallery/qfpgbpf5z1luyd1rqwhp.png"
            alt="testImage"
            width={500}
            height={500}
          />
        </div> */}
        <div className="mt-[20px] text-center">
          <span className="text-[32px] font-black">Add New Event</span>
        </div>
        <NEW_EVENT_CARD />
      </div>
    </>
  );
};

export default ADD_NEW_EVENT;
