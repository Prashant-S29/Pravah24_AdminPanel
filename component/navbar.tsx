import React from "react";
import Link from "next/link";

const NAVBAR = () => {
  return (
    <>
      <div className="bg-white z-50 sticky top-0 w-full flex p-[20px] items-center border-b border-black ">
        <div>
          <Link href="/admin_panel">
            <span className="font-extrabold text-[18px]">PRAVAH 24</span>
          </Link>
        </div>
        <div className="w-[1px] h-[20px] mx-[15px] bg-black" />
        <div className="flex justify-center gap-[30px] font-medium">
          <div>
            <Link
              href="https://pravah.skit.ac.in/events/testEvent"
              target="blank"
            >
              <span>Visit Website</span>
            </Link>
          </div>
          <div>
            <Link href="/admin_panel/addNew">
              <span>Add New Event</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NAVBAR;
