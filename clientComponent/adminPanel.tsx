"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation'
// import Navigate from "next/navigate";

// import TRANSITION_WRAPPER from "../../clientComponents/transition";

const ADMINPANEL = () => {
  const router = useRouter()

  const [adminID, setAdminID] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const [adminVerifyStatus, setAdminVerifyStatus] = useState(false);

  const [errorMessageDisplay, setErrorMessageDisplay] = useState(false);
  const [successMessageDisplay, setSuccessMessageDisplay] = useState(false);

  const handleInputChangeAdminID = (e: any) => {
    setAdminID(e.target.value);
  };

  const handleInputChangeAdminPassword = (e: any) => {
    setAdminPassword(e.target.value);
  };

  const clearForm = () => {
    setAdminID("");
    setAdminPassword("");
  };

  const verifyAdmin = (e: any) => {
    e.preventDefault();
    console.log(adminID, adminPassword);
    if (
      adminID === process.env.NEXT_PUBLIC_ADMIN_PANEL_ID &&
      adminPassword === process.env.NEXT_PUBLIC_ADMIN_PANEL_PASSWORD
    ) {
      setSuccessMessageDisplay(true);
      setAdminVerifyStatus(true);
      setTimeout(() => {
        setSuccessMessageDisplay(false);
        setAdminVerifyStatus(false);
      }, 2000);
      router.push('/admin_panel')

    } else {
      setErrorMessageDisplay(true);
      setTimeout(() => {
        setErrorMessageDisplay(false);
      }, 2000);
    }
    clearForm();
  };

  return (
    <>
      <div className="w-full min-h-[100vh] flex justify-center items-center">
        <div className="w-full">
          <div className="text-center">
            <span className=" text-[42px] font-black">
              ADMIN PANEL - PRAVAH{"'"}24
            </span>
          </div>
          <form
            className="mt-[30px] flex justify-center"
            onSubmit={verifyAdmin}
          >
            <div className="w-[350px]">
              <div className="flex justify-center">
                <input
                  type="text"
                  name="adminID"
                  placeholder="Admin ID"
                  value={adminID}
                  required
                  className="w-full px-[10px] text-[14px] py-[8px] bg-white rounded-[10px] border border-black"
                  onChange={handleInputChangeAdminID}
                />
              </div>
              <div className="my-[10px] flex justify-center">
                <input
                  type="password"
                  name="adminPassword"
                  placeholder="Admin Password"
                  value={adminPassword}
                  required
                  className="w-full px-[10px] text-[14px] py-[8px] bg-white rounded-[10px] border border-black"
                  onChange={handleInputChangeAdminPassword}
                />
              </div>
              {/* <div className="my-[8px] text-[13px]">
                <Link href="">
                  <span className="underline text-blue-600 font-medium">
                    Forgot password ?
                  </span>
                </Link>
              </div> */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-full px-[10px] py-[8px] bg-black text-white text-[14px] font-semibold rounded-[10px]"
                >
                  Login
                </button>
              </div>
            </div>
          </form>
          {errorMessageDisplay && (
            <div className=" absolute left-[50%] rounded-[10px] -translate-x-[50%] bottom-0 my-[20px] p-[10px] bg-red-500">
              <span className="font-semibold text-[14px] text-white">
                Error in Login
              </span>
            </div>
          )}

          {successMessageDisplay && (
            <div className=" absolute left-[50%] rounded-[10px] -translate-x-[50%] bottom-0 my-[20px] p-[10px] bg-green-500 ">
              <span className="font-semibold text-[14px] text-white">
                Login Successfull
              </span>
            </div>
          )}

          {/* {adminVerifyStatus && (
            <div>
              <span>Admin Verified</span>
            </div>
          )} */}
        </div>
      </div>
    </>
  );
};

export default ADMINPANEL;
