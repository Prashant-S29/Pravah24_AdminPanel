"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ADMINPANEL_LOGIN = () => {
  const router = useRouter();

  const [loginButtonText, setLoginButtonText] = useState("Login");
  const [loginButtonStatus, setLoginButtonStatus] = useState(false);

  useEffect(() => {
    const user_data = localStorage.getItem("user_data");
    if (user_data) {
      setLoginButtonStatus(true);
      setLoginButtonText("Redirecting.....");
      router.push("/");
    } else {
      setLoginButtonStatus(false);
      setLoginButtonText("Login");
    }
  }, [router]);

  const [adminID, setAdminID] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

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
    setLoginButtonStatus(true);
    // console.log(adminID, adminPassword);
    if (
      adminID === process.env.NEXT_PUBLIC_ADMIN_PANEL_ID &&
      adminPassword === process.env.NEXT_PUBLIC_ADMIN_PANEL_PASSWORD
    ) {
      setSuccessMessageDisplay(true);
      setTimeout(() => {
        setSuccessMessageDisplay(false);
      }, 2000);
      setLoginButtonStatus(true);
      setLoginButtonText("Redirecting.....");
      router.push("/");
      localStorage.setItem("user_data", JSON.stringify({ adminID }));
    } else {
      setErrorMessageDisplay(true);
      setTimeout(() => {
        setErrorMessageDisplay(false);
      }, 2000);
    }
    clearForm();
    setLoginButtonStatus(false);
  };

  return (
    <>
      <div className="w-full min-h-[100vh] flex justify-center items-center">
        <div className="w-full">
          <div className="text-center leading-none ">
            <span className=" text-[20px] font-extrabold">PRAVAH{"'"}24</span>
          </div>
          <div className="text-center leading-none ">
            <span className="uppercase text-[28px] sm:text-[32px] font-black">
              Admin Panel
            </span>
          </div>
          <form
            className="mt-[30px] flex justify-center w-full px-[20px]"
            onSubmit={verifyAdmin}
          >
            <div className=" w-full sm:w-[350px]">
              <div className="flex justify-center">
                <input
                  type="text"
                  name="adminID"
                  placeholder="Admin ID"
                  value={adminID}
                  required
                  className={`w-full px-[10px] text-[14px] py-[8px]  rounded-[10px] border border-black`}
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
                  className={`w-full px-[10px] text-[14px] py-[8px] rounded-[10px] border border-black`}
                  onChange={handleInputChangeAdminPassword}
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={loginButtonStatus ? true : false}
                  className={`w-full px-[10px] py-[8px]  text-white text-[14px] font-semibold rounded-[10px]`}
                  style={
                    loginButtonStatus
                      ? { backgroundColor: "gray" }
                      : { backgroundColor: "black" }
                  }
                >
                  {loginButtonText}
                </button>
              </div>
            </div>
          </form>
          
          {errorMessageDisplay && (
            <div className=" w-[calc(100%-40px)] sm:w-fit text-center fixed left-[50%] z-[48] rounded-[10px] -translate-x-[50%] bottom-0 my-[20px] px-[10px] py-[7px] bg-red-500">
              <span className="font-semibold text-[12px] sm:text-[13px] text-white">
                Error in Login{" "}
              </span>
            </div>
          )}

          {successMessageDisplay && (
            <div className=" w-[calc(100%-40px)] sm:w-fit text-center fixed left-[50%] z-[48] rounded-[10px] -translate-x-[50%] bottom-0 my-[20px] px-[10px] py-[7px] bg-green-500 ">
              <span className="font-semibold text-[12px] sm:text-[13px] text-white">
                Login Successfull
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ADMINPANEL_LOGIN;
