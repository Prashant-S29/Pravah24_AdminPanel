import EVENTS_LIST from "@/clientComponent/events_list";
import NAVBAR from "@/component/navbar";
import React from "react";

const ADMIN_PANEL = () => {
  return (
    <>
      <div className="w-full">
          <NAVBAR />
          <EVENTS_LIST/>
      </div>
    </>
  );
};

export default ADMIN_PANEL;
