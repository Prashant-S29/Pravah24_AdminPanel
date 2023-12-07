"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { dropdown } from "@/assets";

const NAVBAR = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [userType, setUserType] = useState("Guest");

  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("user_data")) {
      setUserType("Admin");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user_data");
    localStorage.removeItem("guest_data");
    router.refresh();
  };

  return (
    <>
      <div className="bg-white z-50 sticky top-0 w-full flex justify-between p-[20px] items-center border-b border-black ">
        <div>
          <Link href="/">
            <span className="font-extrabold text-[18px]">PRAVAH 24</span>
          </Link>
        </div>
        <div className="flex justify-center items-center gap-[10px] sm:gap-[20px] font-medium">
          <div className=" gap-[20px] hidden sm:flex items-center">
            <div>
              <Link
                href="https://pravah.skit.ac.in/events/testEvent"
                target="blank"
              >
                <span className="text-[15px] sm:text-[16px]">
                  Visit Website
                </span>
              </Link>
            </div>

            {userType === "Guest" ? (
              <div>
                <Link href="/addNew_dummy">
                  <span className="text-[15px] sm:text-[16px]">
                    Add New Event
                  </span>
                </Link>
              </div>
            ) : (
              <div>
                <Link href="/addNew">
                  <span className="text-[15px] sm:text-[16px]">
                    Add New Event
                  </span>
                </Link>
              </div>
            )}

            <div className="w-[1px] h-[20px]  bg-black" />
          </div>
          <div>
            <button
              type="button"
              className="px-[10px] py-[8px] bg-black text-white text-[12px] sm:text-[14px] font-medium rounded-[8px]"
              onClick={handleLogout}
            >
              Logout {`(${userType})`}
            </button>
          </div>
          <div
            className={`${
              showMenu ? "rotate-[180deg]" : "rotate-[0deg]"
            } duration-200 block sm:hidden`}
            onClick={(e) => {
              setShowMenu(!showMenu);
            }}
          >
            <Image src={dropdown} alt="dropdown" className=" w-[15px] " />
          </div>
        </div>
      </div>
      <div
        className={`w-full  h-[80px] duration-200 ${
          showMenu ? "mt-0" : "-mt-[80px] "
        } fixed  p-[10px] bg-black text-white`}
      >
        <div>
          <Link
            href="https://pravah.skit.ac.in/events/testEvent"
            target="blank"
          >
            <span className="text-[15px] sm:text-[16px]">Visit Website</span>
          </Link>
        </div>
        <div className="mt-[5px]">
          <Link href="/addNew">
            <span className="text-[15px] sm:text-[16px]">Add New Event</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NAVBAR;
