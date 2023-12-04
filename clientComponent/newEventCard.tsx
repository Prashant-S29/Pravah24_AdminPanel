"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const NEW_EVENT_CARD = () => {
  const axios = require("axios");
  const qs = require("qs");

  const [formState, setFormState] = useState(true);

  const [imageUploading, setImageUploading] = useState(false);
  const [brochureUploading, setBrochureUploading] = useState(false);

  const [assetsUploadStatus, setAssetsUploadStatus] = useState({
    eventImageStatus: false,
    eventBrochureStatus: false,
  });

  const router = useRouter();

  const [errorMessageDisplay, setErrorMessageDisplay] = useState({
    display: false,
    message: "",
  });
  const [successMessageDisplay, setSuccessMessageDisplay] = useState({
    display: false,
    message: "",
  });
  const [adminSecretKey, setAdminSecretKey] = useState("");
  const [userConfirmationCardDisplay, setUserConfirmationCardDisplay] =
    useState(false);

  const [eventFormData, setEventFormData] = useState({
    eventName: "",
    eventPhoto: "",
    eventCategoryID: "",
    eventType: "",
    eventRegistrationFee: "",
    eventRegistrationLink: "",
    eventDate: "",
    eventTime: "",
    eventVenue: "",
    eventBrochure: "",
    eventMaxParicipationLimit: "",
    eventCurrentParticipation: "0",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setEventFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addEvent = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventFormData),
      });
      if (res.ok) {
        setSuccessMessageDisplay({
          display: true,
          message: "Successfully added the event",
        });
        setTimeout(() => {
          setSuccessMessageDisplay({
            display: false,
            message: "",
          });
        }, 2000);
        router.push("/");
        router.refresh();
      } else {
        throw new Error("Failed to add an events");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sendUpdate = () => {
    const message = `
ADMIN PANEL UPDATE - NEW EVENT CREATED
EVENT NAME: ${eventFormData["eventName"]}
EVENT PHOTO: ${eventFormData["eventPhoto"]}
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
        console.log(JSON.stringify(response.data));
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
        console.log("whatsapp error", error);
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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (adminSecretKey === process.env.NEXT_PUBLIC_ADMIN_SERCET_KEY) {
      setUserConfirmationCardDisplay(false);
      await addEvent();
      sendUpdate();
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

  const handleCancel = () => {
    setAdminSecretKey("");
    setUserConfirmationCardDisplay(false);
  };

  const handleCalcelCall = () => {
    router.push("/");
  };

  const handelAddEventCall = () => {
    // console.log(eventFormData);
    if (eventFormData.eventPhoto == "") {
      setErrorMessageDisplay({
        display: true,
        message: "Issue in uploading image. Try again",
      });
      setTimeout(() => {
        setErrorMessageDisplay({
          display: false,
          message: "",
        });
      }, 2000);
    } else if (eventFormData.eventBrochure == "") {
      setErrorMessageDisplay({
        display: true,
        message: "Issue in uploading image. Try again",
      });
      setTimeout(() => {
        setErrorMessageDisplay({
          display: false,
          message: "",
        });
      }, 2000);
    } else if (
      eventFormData.eventName !== "" &&
      eventFormData.eventPhoto !== "" &&
      eventFormData.eventCategoryID !== "" &&
      eventFormData.eventType !== "" &&
      eventFormData.eventRegistrationFee !== "" &&
      eventFormData.eventRegistrationLink !== "" &&
      eventFormData.eventDate !== "" &&
      eventFormData.eventTime !== "" &&
      eventFormData.eventVenue !== "" &&
      eventFormData.eventBrochure !== "" &&
      eventFormData.eventMaxParicipationLimit !== "" &&
      eventFormData.eventCurrentParticipation !== ""
    ) {
      setUserConfirmationCardDisplay(true);
    } else {
      setErrorMessageDisplay({
        display: true,
        message: "Invalid Request. Pls check the form again",
      });
      setTimeout(() => {
        setErrorMessageDisplay({
          display: false,
          message: "",
        });
      }, 2000);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setImageUploading(true);
    setAssetsUploadStatus({
      eventImageStatus: false,
      eventBrochureStatus: assetsUploadStatus.eventBrochureStatus,
    });
    setFormState(false);
    const fileInput = e.currentTarget;

    const formData = new FormData();

    if (fileInput && fileInput.files) {
      const fileList = fileInput.files;
      if (fileList.length > 0) {
        const filesArray = Array.from(fileList);
        for (const file of filesArray) {
          formData.append("file", file);
        }
      }
    }

    formData.append("upload_preset", "upload_pravahAssets");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_CLOUDINARY_API_ENDPOINT}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        // console.log(data);
        setAssetsUploadStatus({
          eventImageStatus: true,
          eventBrochureStatus: assetsUploadStatus.eventBrochureStatus,
        });
        eventFormData.eventPhoto = data.url;
        setImageUploading(false);
        setFormState(true);
      } else {
        throw new Error("Error uploading asset");
      }
    } catch (error) {
      setImageUploading(false);
      setFormState(false);
      setErrorMessageDisplay({
        display: true,
        message: "Error in uploading asset. Please try again",
      });
      setTimeout(() => {
        setErrorMessageDisplay({
          display: false,
          message: "",
        });
      }, 2000);
    }
  };

  const handleBrochureUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    setBrochureUploading(true);
    setAssetsUploadStatus({
      eventImageStatus: assetsUploadStatus.eventImageStatus,
      eventBrochureStatus: false,
    });
    setFormState(false);
    const fileInput = e.currentTarget;

    const formData = new FormData();

    if (fileInput && fileInput.files) {
      const fileList = fileInput.files;
      if (fileList.length > 0) {
        const filesArray = Array.from(fileList);
        for (const file of filesArray) {
          formData.append("file", file);
        }
      }
    }

    formData.append("upload_preset", "upload_pravahAssets");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_CLOUDINARY_API_ENDPOINT}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        setAssetsUploadStatus({
          eventImageStatus: assetsUploadStatus.eventImageStatus,
          eventBrochureStatus: true,
        });
        eventFormData.eventBrochure = data.url;
        setBrochureUploading(false);
        setFormState(true);
      } else {
        throw new Error("Error uploading asset");
      }
    } catch (error) {
      setBrochureUploading(false);
      setFormState(false);
      setErrorMessageDisplay({
        display: true,
        message: "Error in uploading asset. Please try again",
      });
      setTimeout(() => {
        setErrorMessageDisplay({
          display: false,
          message: "",
        });
      }, 2000);
    }
  };

  return (
    <>
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
                <span className="font-bold">
                  {eventFormData.eventName} Event
                </span>
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
                  className=" px-[10px] py-[8px] bg-green-600 text-white text-[13px] sm:text-[14px] font-semibold rounded-[8px]"
                >
                  Confirm & Add
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
      <div className="pb-[20px]  px-[20px]">
        <form className="flex w-full flex-wrap justify-center ">
          <div className="w-full">
            <div className="px-0 lg:px-[100px] xl:px-[300px] w-full flex justify-center  gap-x-[15px] flex-wrap">
              <div className="mt-[5px] w-full sm:w-[350px]">
                <div>
                  <span className="font-bold text-[14px] md:text-[15px]">
                    Event Name
                  </span>
                </div>
                <input
                  type="text"
                  name="eventName"
                  placeholder="Event Name"
                  required
                  tabIndex={-1}
                  value={eventFormData["eventName"]}
                  className="w-full placeholder:text-gray-500 px-[10px] text-[14px] py-[8px] bg-white rounded-[8px] border border-black"
                  onChange={handleInputChange}
                />
              </div>
              <div className="mt-[5px] w-full sm:w-[350px]">
                <div>
                  <span className="font-bold text-[14px] md:text-[15px]">
                    Event Photo
                  </span>
                </div>
                <div className="flex items-center justify-end">
                  <input
                    type="file"
                    accept=".png, .jpg"
                    name="eventPhoto"
                    required
                    disabled={brochureUploading}
                    tabIndex={-1}
                    className={`w-full  placeholder:text-gray-500 file:hidden  px-[10px] text-[14px]    py-[8px]
                    ${
                      brochureUploading ? "bg-gray-200" : "bg-white"
                    } rounded-[8px] border border-black`}
                    onChange={handleImageUpload}
                  />
                  <div className=" absolute mr-[15px]">
                    <div
                      className={` aspect-square duration-300 ${
                        imageUploading && "animate-ping"
                      } ${
                        assetsUploadStatus.eventImageStatus
                          ? "bg-green-600 w-[10px]"
                          : "bg-black w-[7px]"
                      } rounded-full`}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-[5px] w-full sm:w-[350px]">
                <div>
                  <span className="font-bold text-[14px] md:text-[15px]">
                    Event Category
                  </span>
                </div>

                <select
                  name="eventCategoryID"
                  className="w-full  px-[10px] text-[14px] py-[8px] bg-white rounded-[8px] border border-black"
                  required
                  tabIndex={-1}
                  value={eventFormData["eventCategoryID"]}
                  onChange={handleInputChange}
                >
                  <option value="Select">Select</option>
                  <option value="Non Technical Event">
                    Non Technical Event
                  </option>
                  <option value="Technical Event">Technical Event</option>
                  <option value="Cultural Event">Cultural Event</option>
                  <option value="Literary Event">Literary Event</option>
                  <option value="Social Event">Social Event</option>
                  <option value="Esports Event">Esports Event</option>
                </select>
              </div>
              <div className="mt-[5px] w-full sm:w-[350px]">
                <div>
                  <span className="font-bold text-[14px] md:text-[15px]">
                    Event Type
                  </span>
                </div>
                <select
                  name="eventType"
                  className="w-full  px-[10px] text-[14px] py-[8px] bg-white rounded-[8px] border border-black"
                  required
                  tabIndex={-1}
                  value={eventFormData["eventType"]}
                  onChange={handleInputChange}
                >
                  <option value="select">Select</option>
                  <option value="Team">Team</option>
                  <option value="Individual">Individual</option>
                </select>
              </div>
              <div className="mt-[5px] w-full sm:w-[350px]">
                <div>
                  <span className="font-bold text-[14px] md:text-[15px]">
                    Event Registration Fee
                  </span>
                </div>
                <input
                  type="text"
                  name="eventRegistrationFee"
                  placeholder="Registration Fee"
                  required
                  tabIndex={-1}
                  value={eventFormData["eventRegistrationFee"]}
                  className="w-full  placeholder:text-gray-500    px-[10px] text-[14px] py-[8px] bg-white rounded-[8px] border border-black"
                  onChange={handleInputChange}
                />
              </div>
              <div className="mt-[5px] w-full sm:w-[350px]">
                <div>
                  <span className="font-bold text-[14px] md:text-[15px]">
                    Event Registration Link
                  </span>
                </div>
                <input
                  type="text"
                  name="eventRegistrationLink"
                  placeholder="Link of ERP registration form"
                  required
                  tabIndex={-1}
                  value={eventFormData["eventRegistrationLink"]}
                  className="w-full  placeholder:text-gray-500    px-[10px] text-[14px] py-[8px] bg-white rounded-[8px] border border-black"
                  onChange={handleInputChange}
                />
              </div>
              <div className="mt-[5px] w-full sm:w-[350px]">
                <div>
                  <span className="font-bold text-[14px] md:text-[15px]">
                    Event Date
                  </span>
                </div>
                <input
                  type="text"
                  name="eventDate"
                  placeholder="eg: 20th November, 2023"
                  required
                  tabIndex={-1}
                  value={eventFormData["eventDate"]}
                  className="w-full  placeholder:text-gray-500    px-[10px] text-[14px] py-[8px] bg-white rounded-[8px] border border-black"
                  onChange={handleInputChange}
                />
              </div>
              <div className="mt-[5px] w-full sm:w-[350px]">
                <div>
                  <span className="font-bold text-[14px] md:text-[15px]">
                    Event Time
                  </span>
                </div>
                <input
                  type="text"
                  name="eventTime"
                  placeholder="eg: 12:00 AM - 03:00 PM"
                  required
                  tabIndex={-1}
                  value={eventFormData["eventTime"]}
                  className="w-full  placeholder:text-gray-500    px-[10px] text-[14px] py-[8px] bg-white rounded-[8px] border border-black"
                  onChange={handleInputChange}
                />
              </div>
              <div className="mt-[5px] w-full sm:w-[350px]">
                <div>
                  <span className="font-bold text-[14px] md:text-[15px]">
                    Event Venue
                  </span>
                </div>
                <input
                  type="text"
                  name="eventVenue"
                  placeholder="Venue"
                  required
                  tabIndex={-1}
                  value={eventFormData["eventVenue"]}
                  className="w-full  placeholder:text-gray-500    px-[10px] text-[14px] py-[8px] bg-white rounded-[8px] border border-black"
                  onChange={handleInputChange}
                />
              </div>
              <div className="mt-[5px] w-full sm:w-[350px]">
                <div>
                  <span className="font-bold text-[14px] md:text-[15px]">
                    Event Brochure
                  </span>
                </div>
                <div className="flex items-center justify-end">
                  <input
                    type="file"
                    accept=".pdf"
                    name="eventBrochure"
                    required
                    disabled={imageUploading}
                    tabIndex={-1}
                    className={`w-full  placeholder:text-gray-500 file:hidden px-[10px] text-[14px] py-[8px]
                     ${
                       imageUploading ? "bg-gray-200" : "bg-white"
                     } rounded-[8px] border border-black`}
                    onChange={handleBrochureUpload}
                  />
                  <div className=" absolute mr-[15px]">
                    <div
                      className={` aspect-square duration-300 ${
                        brochureUploading && "animate-ping"
                      } ${
                        assetsUploadStatus.eventBrochureStatus
                          ? "bg-green-600 w-[10px]"
                          : "bg-black w-[7px]"
                      } rounded-full`}
                    />{" "}
                  </div>
                </div>
              </div>
              <div className="mt-[5px] w-full sm:w-[350px]">
                <div>
                  <span className="font-bold text-[14px] md:text-[15px]">
                    Event Max Participation Limit
                  </span>
                </div>
                <input
                  type="text"
                  name="eventMaxParicipationLimit"
                  placeholder="Limit eg: 80, 100"
                  required
                  tabIndex={-1}
                  value={eventFormData["eventMaxParicipationLimit"]}
                  className="w-full  placeholder:text-gray-500    px-[10px] text-[14px] py-[8px] bg-white rounded-[8px] border border-black"
                  onChange={handleInputChange}
                />
              </div>
              <div className="mt-[5px] w-full sm:w-[350px]">
                <div>
                  <span className="font-bold text-[14px] md:text-[15px]">
                    Event Current Participation
                  </span>
                </div>
                <input
                  type="text"
                  name="eventCurrentParticipation"
                  disabled
                  tabIndex={-1}
                  value={eventFormData["eventCurrentParticipation"]}
                  className="w-full  placeholder:text-gray-500    px-[10px] text-[14px] py-[8px] bg-[#e2e2e2] rounded-[8px] border border-black"
                />
              </div>
            </div>
            <div className="flex flex-wrap w-full justify-center gap-x-[20px] gap-y-[10px]  mt-[20px]">
              <div className="flex w-full sm:w-[350px] justify-center">
                <button
                  type="button"
                  className="w-full  px-[10px] py-[8px] bg-black text-white text-[14px] font-semibold rounded-[8px]"
                  onClick={handelAddEventCall}
                  tabIndex={-1}
                >
                  Add Event
                </button>
              </div>
              <div className="flex w-full sm:w-[350px] justify-center">
                <button
                  type="button"
                  className="w-full  px-[10px] py-[8px] bg-black text-white text-[14px] font-semibold rounded-[8px]"
                  onClick={handleCalcelCall}
                  tabIndex={-1}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </form>

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
    </>
  );
};

export default NEW_EVENT_CARD;
