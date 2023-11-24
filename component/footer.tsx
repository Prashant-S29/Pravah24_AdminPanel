import React from "react";
import Link from "next/link";

const FOOTER = () => {
  return (
    <>
      <div className="w-full text-center px-[20px] py-[5px] bg-black text-[#c9c9c9]">
        <span className="text-[12px] sm:text-[13px] font-medium">
          Made with ❤️ by{" "}
          <Link href="https://pravah.skit.ac.in/webTeam" target="blank">
            <span className="text-blue-500 font-semibold ">
              Pravah Web Team
            </span>
          </Link>
        </span>
      </div>
    </>
  );
};

export default FOOTER;
