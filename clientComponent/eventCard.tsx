"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const EVENT_CARDS = ({
  index,
  eventDetail,
}: {
  index: number;
  eventDetail: any;
}) => {
  const axios = require("axios");
  const qs = require("qs");
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);

  const [adminNotFoundMessage, setAdminNotFoundMessage] = useState(false);
  const [showRegistrationConfirmation, setRegistrationConfirmation] =
    useState(false);

  const [registrationTeamType, setRegistrationTeamType] = useState(1);

  const [registrationLinkAndPrice, setRegistrationLinkAndPrice] = useState({
    link: "",
    price: "",
  });

  useEffect(() => {
    const admin = localStorage.getItem("user_data");
    if (admin) {
      setIsAdmin(true);
    }
  }, []);

  const [detailDisplay, setDetailDisplay] = useState(false);
  const [adminSecretKey, setAdminSecretKey] = useState("");
  const [userConfirmationCardDisplay, setUserConfirmationCardDisplay] =
    useState(false);

  const [errorMessageDisplay, setErrorMessageDisplay] = useState({
    display: false,
    message: "",
  });
  const [successMessageDisplay, setSuccessMessageDisplay] = useState({
    display: false,
    message: "",
  });

  const deleteEvent = async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}?id=${eventDetail._id}`,
      {
        method: "DELETE",
      }
    );
    setSuccessMessageDisplay({
      display: true,
      message: "Successfully deleted the event",
    });
    setTimeout(() => {
      setSuccessMessageDisplay({
        display: false,
        message: "",
      });
    }, 2000);
    router.refresh();
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (adminSecretKey === process.env.NEXT_PUBLIC_ADMIN_SERCET_KEY) {
      setUserConfirmationCardDisplay(false);
      deleteEvent();
      router.refresh();
      // sendUpdate();
      setAdminSecretKey("");
    } else {
      setAdminSecretKey("");
      setUserConfirmationCardDisplay(false);
      setErrorMessageDisplay({
        display: true,
        message: "Admin Secret Key Invalid",
      });
      setTimeout(() => {
        setErrorMessageDisplay({
          display: false,
          message: "",
        });
      }, 2000);
    }
  };

  const sendUpdate = () => {
    const message = `
*ADMIN PANEL UPDATE*
EVENT DELETED
EVENT NAME: ${eventDetail.eventName}
    `;

    const data = qs.stringify({
      token: process.env.NEXT_PUBLIC_WHATSAPP_TOKEN,
      to: process.env.NEXT_PUBLIC_WHATSAPP_GROUP_ID,
      body: message,
    });

    const config = {
      method: "post",
      url: process.env.NEXT_PUBLIC_WHATSAPP_URL,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    axios(config)
      .then(function (response: any) {
        // console.log(JSON.stringify(response.data));
        setSuccessMessageDisplay({
          display: true,
          message: "upadate sent on whatsapp",
        });
        setTimeout(() => {
          setSuccessMessageDisplay({
            display: false,
            message: "",
          });
        }, 2000);
      })
      .catch(function (error: any) {
        // console.log("whatsapp error", error);
        setErrorMessageDisplay({
          display: true,
          message: "Unable to send upadate on whatsapp",
        });
        setTimeout(() => {
          setErrorMessageDisplay({
            display: false,
            message: "",
          });
        }, 2000);
      });
  };

  const handleCancel = () => {
    setAdminSecretKey("");
    setUserConfirmationCardDisplay(false);
  };

  const remainingSlots =
    eventDetail.eventMaxParicipationLimit -
    eventDetail.eventCurrentParticipation;

  return (
    <>
      {/* user confirmation card */}
      <div
        className={`w-full min-h-[100vh] fixed top-0 z-[50] flex justify-center items-center
          bg-[#00000069] backdrop-blur-sm  duration-300 p-[20px]  ${
            userConfirmationCardDisplay ? "flex" : "hidden"
          } `}
      >
        <div className="p-[20px] w-full sm:w-fit border border-black rounded-[20px] bg-white shadow-xl ">
          <form onSubmit={handleSubmit}>
            <div>
              <span className="text-[15px] sm:text-[16px]">
                Confirm your <span className="font-bold">Admin Secret Key</span>{" "}
                to add{" "}
                <span className="font-bold">{eventDetail.eventName} Event</span>
              </span>
            </div>
            <div className="mt-[10px]">
              <input
                type="password"
                name="adminSecretKey"
                placeholder="Secret Key"
                required
                tabIndex={-1}
                value={adminSecretKey}
                className="w-[250px] sm:w-[350px] placeholder:text-gray-500    px-[10px] text-[14px] py-[8px] bg-white rounded-[8px] border border-black"
                onChange={(e) => {
                  setAdminSecretKey(e.target.value);
                }}
              />
            </div>
            <div className="flex gap-[15px] mt-[10px]">
              <div>
                <button
                  type="submit"
                  className=" px-[10px] py-[8px] bg-red-600 text-white text-[13px] sm:text-[14px] font-semibold rounded-[8px]"
                >
                  Confirm & Delete
                </button>
              </div>
              <div>
                <button
                  type="button"
                  className=" px-[10px] py-[8px] bg-black text-white text-[13px] sm:text-[14px] font-semibold rounded-[8px]"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div
        className={`w-full min-h-[100vh] fixed top-0 z-[50] flex justify-center items-center
          bg-[#000000ac] backdrop-blur-sm  duration-300 p-[20px]  ${
            adminNotFoundMessage ? "flex" : "hidden"
          } `}
      >
        <div className="p-[20px] w-full sm:w-fit border border-black rounded-[20px] bg-white shadow-xl ">
          <div>
            <span>
              <span className="font-bold">You are in Guest Mode.</span>
              <br />
              <span>To make these changes, please login as admin.</span>
            </span>
          </div>
          <div className="mt-[10px]">
            <button
              type="button"
              className=" px-[10px] py-[8px] bg-black text-white text-[12px] sm:text-[13px] font-semibold rounded-[8px]"
              onClick={() => {
                setAdminNotFoundMessage(false);
              }}
            >
              Ok got it !
            </button>
          </div>
        </div>
      </div>

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
                src={eventDetail.eventPhoto}
                alt="lol"
                className="object-cover object-top rounded-[17px] w-full sm:w-[300px] h-[200px]"
                width={300}
                height={100}
                priority={true}
              />
            </div>
            <div className="text-center font-medium  w-full sm:w-[300px] h-[200px] bg-slate-100 flex justify-center items-center rounded-[17px]   py-[10px] ">
              <div className="px-[10px] text-[14px]  sm:text-[16px]">
                {/* <div>
                  <span>
                    Registration Fee:{" "}
                    <b>₹{eventDetail.eventRegistrationFeeOne}</b>
                    /- {eventDetail.eventType}
                  </span>
                </div> */}
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
                  <Link
                    href={eventDetail.eventBrochure.replace("http", "https")}
                    // target="blank"
                    tabIndex={-1}
                  >
                    <button
                      className="w-full px-[20px] py-[8px] text-[12px] sm:text-[14px] font-semibold text-white bg-black rounded-[8px]"
                      tabIndex={-1}
                    >
                      See Brochure
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
                Slots Left: {remainingSlots}/
                {eventDetail.eventMaxParicipationLimit}
              </span>
            </div>
          )}
        </div>
        <div className="text-center duration-300 "></div>

        <div className="w-full flex  justify-center gap-2 mt-[10px]">
          {remainingSlots > 0 ? (
            <div className="w-full">
              <button
                className="w-full px-[20px] py-[8px] text-[12px] sm:text-[14px] font-semibold text-white bg-black rounded-[8px]"
                tabIndex={-1}
                onClick={() => {
                  setRegistrationConfirmation(true);
                  setRegistrationLinkAndPrice({
                    link: eventDetail.eventRegistrationLinkOne,
                    price: eventDetail.eventRegistrationFeeOne,
                  });
                }}
              >
                Register
              </button>
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
              tabIndex={-1}
            >
              {detailDisplay ? "Hide Details" : "Show Details"}
            </button>
          </div>
        </div>
        {isAdmin ? (
          <div className="w-full flex  justify-center gap-2 mt-[8px]">
            <div className="w-full">
              <Link href={`/updateEvent/${eventDetail._id}`} tabIndex={-1}>
                <button
                  className="w-full px-[20px] py-[8px] text-[12px] sm:text-[14px] font-semibold text-white bg-green-600 
            rounded-[8px]"
                  tabIndex={-1}
                >
                  Update Event
                </button>
              </Link>
            </div>
            <div className="w-full">
              {/* <Link href=""> */}
              <button
                className="w-full px-[20px] py-[8px] text-[12px] sm:text-[14px] font-semibold text-white bg-red-600 
            rounded-[8px]"
                onClick={(e) => {
                  setUserConfirmationCardDisplay(true);
                }}
                tabIndex={-1}
              >
                Delete Event
              </button>
              {/* </Link> */}
            </div>
          </div>
        ) : (
          <div className="w-full flex  justify-center gap-2 mt-[8px]">
            <div className="w-full">
              <button
                className="w-full px-[20px] py-[8px] text-[12px] sm:text-[14px] font-semibold text-white bg-green-600 rounded-[8px]"
                tabIndex={-1}
                onClick={() => {
                  setAdminNotFoundMessage(true);
                }}
              >
                Update Event
              </button>
            </div>
            <div className="w-full">
              <button
                className="w-full px-[20px] py-[8px] text-[12px] sm:text-[14px] font-semibold text-white bg-red-600 
            rounded-[8px]"
                tabIndex={-1}
                onClick={() => {
                  setAdminNotFoundMessage(true);
                }}
              >
                Delete Event
              </button>
            </div>
          </div>
        )}
        {errorMessageDisplay["display"] && (
          <div className=" w-[calc(100%-40px)] sm:w-fit text-center fixed left-[50%] z-[48] rounded-[10px] -translate-x-[50%] bottom-0 my-[20px] px-[10px] py-[7px] bg-red-500">
            <span className="font-semibold text-[12px] sm:text-[13px] text-white">
              {errorMessageDisplay["message"]}
            </span>
          </div>
        )}

        {successMessageDisplay["display"] && (
          <div className=" w-[calc(100%-40px)] sm:w-fit text-center fixed left-[50%] z-[48] rounded-[10px] -translate-x-[50%] bottom-0 my-[20px] px-[10px] py-[7px] bg-green-500 ">
            <span className="font-semibold text-[12px] sm:text-[13px] text-white">
              {successMessageDisplay["message"]}
            </span>
          </div>
        )}
      </div>

      {showRegistrationConfirmation && (
        <div
          className="z-[100] w-full min-h-screen top-0 left-0 fixed flex justify-center p-[20px] items-center bg-[#00000048] 
        backdrop-blur-[5px] select-none"
        >
          <div className="p-[20px] bg-white border border-gray-500 rounded-[20px]">
            <div>
              <div>
                <span className="text-[14px]">
                  Confirm my Registration in{" "}
                  <span className="font-bold">{eventDetail.eventName} </span>
                  as
                </span>
              </div>
              <div className="text-[14px]">
                {eventDetail.eventRegistrationLinkOne != "" && (
                  <div
                    className={`w-full px-[10px] py-2  cursor-pointer rounded-[7px] border-[2px]  leading-snug mt-2
                    ${
                      registrationTeamType === 1
                        ? "border-green-500 bg-white"
                        : " bg-gray-100"
                    }
                    `}
                    onClick={() => {
                      setRegistrationTeamType(1);

                      setRegistrationLinkAndPrice({
                        link: eventDetail.eventRegistrationLinkOne,
                        price: eventDetail.eventRegistrationFeeOne,
                      });
                    }}
                  >
                    <div>
                      <span className="font-bold capitalize">
                        {eventDetail.eventRegistrationTeamTypeOne.split("-")[0]}
                      </span>
                    </div>
                    <div>
                      <span>
                        Team Size -{" "}
                        {eventDetail.eventRegistrationTeamTypeOne.split("-")[1]}
                      </span>
                    </div>
                    <div>
                      <span>
                        Registration Fee - ₹
                        {eventDetail.eventRegistrationFeeOne}/-
                      </span>
                    </div>
                  </div>
                )}
                {eventDetail.eventRegistrationLinkTwo != "" && (
                  <div
                    className={`w-full px-[10px] py-2  cursor-pointer rounded-[7px] border-[2px]  leading-snug mt-2  ${
                      registrationTeamType === 2
                        ? "border-green-500 bg-white"
                        : " bg-gray-100"
                    }`}
                    onClick={() => {
                      setRegistrationTeamType(2);

                      setRegistrationLinkAndPrice({
                        link: eventDetail.eventRegistrationLinkTwo,
                        price: eventDetail.eventRegistrationFeeTwo,
                      });
                    }}
                  >
                    <div>
                      <span className="font-bold capitalize">
                        {eventDetail.eventRegistrationTeamTypeTwo.split("-")[0]}
                      </span>
                    </div>
                    <div>
                      <span>
                        Team Size -{" "}
                        {eventDetail.eventRegistrationTeamTypeTwo.split("-")[1]}
                      </span>
                    </div>
                    <div>
                      <span>
                        Registration Fee - ₹
                        {eventDetail.eventRegistrationFeeTwo}/-
                      </span>
                    </div>
                  </div>
                )}
                {eventDetail.eventRegistrationLinkThree != "" && (
                  <div
                    className={`w-full px-[10px] py-2  cursor-pointer rounded-[7px] border-[2px]  leading-snug mt-2  ${
                      registrationTeamType === 3
                        ? "border-green-500 bg-white"
                        : " bg-gray-100"
                    }`}
                    onClick={() => {
                      setRegistrationTeamType(3);

                      setRegistrationLinkAndPrice({
                        link: eventDetail.eventRegistrationLinkThree,
                        price: eventDetail.eventRegistrationFeeThree,
                      });
                    }}
                  >
                    <div>
                      <span className="font-bold capitalize">
                        {
                          eventDetail.eventRegistrationTeamTypeThree.split(
                            "-"
                          )[0]
                        }
                      </span>
                    </div>
                    <div>
                      <span>
                        Team Size -{" "}
                        {
                          eventDetail.eventRegistrationTeamTypeThree.split(
                            "-"
                          )[1]
                        }
                      </span>
                    </div>
                    <div>
                      <span>
                        Registration Fee - ₹
                        {eventDetail.eventRegistrationFeeThree}/-
                      </span>
                    </div>
                  </div>
                )}
                {eventDetail.eventRegistrationLinkFour != "" && (
                  <div
                    className={`w-full px-[10px] py-2  cursor-pointer rounded-[7px] border-[2px]  leading-snug mt-2  ${
                      registrationTeamType === 4
                        ? "border-green-500 bg-white"
                        : " bg-gray-100"
                    }`}
                    onClick={() => {
                      setRegistrationTeamType(4);

                      setRegistrationLinkAndPrice({
                        link: eventDetail.eventRegistrationLinkFour,
                        price: eventDetail.eventRegistrationFeeFour,
                      });
                    }}
                  >
                    {" "}
                    <div>
                      <span className="font-bold">
                        {
                          eventDetail.eventRegistrationTeamTypeFour.split(
                            "-"
                          )[0]
                        }
                      </span>
                    </div>
                    <div>
                      <span>
                        Team Size -{" "}
                        {
                          eventDetail.eventRegistrationTeamTypeFour.split(
                            "-"
                          )[1]
                        }
                      </span>
                    </div>
                    <div>
                      <span>
                        Registration Fee - ₹
                        {eventDetail.eventRegistrationFeeFour}/-
                      </span>
                    </div>
                  </div>
                )}
                {eventDetail.eventRegistrationLinkFive != "" && (
                  <div
                    className={`w-full px-[10px] py-2  cursor-pointer rounded-[7px] border-[2px]  leading-snug mt-2  ${
                      registrationTeamType === 5
                        ? "border-green-500 bg-white"
                        : " bg-gray-100"
                    }`}
                    onClick={() => {
                      setRegistrationTeamType(5);

                      setRegistrationLinkAndPrice({
                        link: eventDetail.eventRegistrationLinkFive,
                        price: eventDetail.eventRegistrationFeeFive,
                      });
                    }}
                  >
                    {" "}
                    <div>
                      <span className="font-bold">
                        {
                          eventDetail.eventRegistrationTeamTypeFive.split(
                            "-"
                          )[0]
                        }
                      </span>
                    </div>
                    <div>
                      <span>
                        Team Size -{" "}
                        {
                          eventDetail.eventRegistrationTeamTypeFive.split(
                            "-"
                          )[1]
                        }
                      </span>
                    </div>
                    <div>
                      <span>
                        Registration Fee - ₹
                        {eventDetail.eventRegistrationFeeFive}/-
                      </span>
                    </div>
                  </div>
                )}
                {eventDetail.eventRegistrationLinkSix != "" && (
                  <div
                    className={`w-full px-[10px] py-2  cursor-pointer rounded-[7px] border-[2px]  leading-snug mt-2  ${
                      registrationTeamType === 6
                        ? "border-green-500 bg-white"
                        : " bg-gray-100"
                    }`}
                    onClick={() => {
                      setRegistrationTeamType(6);

                      setRegistrationLinkAndPrice({
                        link: eventDetail.eventRegistrationLinkSix,
                        price: eventDetail.eventRegistrationFeeSix,
                      });
                    }}
                  >
                    {" "}
                    <div>
                      <span className="font-bold capitalize">
                        {eventDetail.eventRegistrationTeamTypeSix.split("-")[0]}
                      </span>
                    </div>
                    <div>
                      <span>
                        Team Size -{" "}
                        {eventDetail.eventRegistrationTeamTypeSix.split("-")[1]}
                      </span>
                    </div>
                    <div>
                      <span>
                        Registration Fee - ₹
                        {eventDetail.eventRegistrationFeeSix}/-
                      </span>
                    </div>
                  </div>
                )}
                {eventDetail.eventRegistrationLinkSeven != "" && (
                  <div
                    className={`w-full px-[10px] py-2  cursor-pointer rounded-[7px] border-[2px]  leading-snug mt-2  ${
                      registrationTeamType === 7
                        ? "border-green-500 bg-white"
                        : " bg-gray-100"
                    }`}
                    onClick={() => {
                      setRegistrationTeamType(7);

                      setRegistrationLinkAndPrice({
                        link: eventDetail.eventRegistrationLinkSeven,
                        price: eventDetail.eventRegistrationFeeSeven,
                      });
                    }}
                  >
                    {" "}
                    <div>
                      <span className="font-bold">
                        {
                          eventDetail.eventRegistrationTeamTypeSeven.split(
                            "-"
                          )[0]
                        }
                      </span>
                    </div>
                    <div>
                      <span>
                        Team Size -{" "}
                        {
                          eventDetail.eventRegistrationTeamTypeSeven.split(
                            "-"
                          )[1]
                        }
                      </span>
                    </div>
                    <div>
                      <span>
                        Registration Fee - ₹
                        {eventDetail.eventRegistrationFeeSeven}/-
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <div className="block sm:flex gap-[15px] ">
                <div className="w-full">
                  <Link href={registrationLinkAndPrice.link}>
                    <button className="w-full mt-3 px-[20px] py-[8px] text-[12px] whitespace-nowrap sm:text-[13px] font-semibold text-white bg-black rounded-[8px]">
                      Register - ₹{registrationLinkAndPrice.price}/-
                    </button>
                  </Link>
                </div>
                <div className="w-full">
                  <button
                    className="w-full mt-3 px-[20px] py-[8px] whitespace-nowrap text-[12px] sm:text-[13px] font-semibold text-black bg-gray-300 rounded-[8px]"
                    onClick={() => {
                      setRegistrationConfirmation(false);
                    }}
                  >
                    cancle and return
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EVENT_CARDS;
