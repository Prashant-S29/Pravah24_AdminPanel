"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const UPDATE_EVENT_CARD = (particularEventDetails: any) => {
  const router = useRouter();

  useEffect(() => {
    const user_data = localStorage.getItem("user_data");
    if (!user_data) {
      router.push("/");
    }
  });

  const [changeImage, setChangeImage] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [isImageChanged, setIsImageChanged] = useState(false);

  const [changeBrochure, setChangeBrochure] = useState(false);
  const [brochureUploading, setBrochureUploading] = useState(false);
  const [isBrochureChanged, setIsBrochureChanged] = useState(false);

  const [assetsUploadStatus, setAssetsUploadStatus] = useState({
    eventImageStatus: false,
    eventBrochureStatus: false,
  });

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

  const particularEventDetail =
    particularEventDetails["particularEventDetails"];

  const [eventFormData, setEventFormData] = useState({
    eventName: particularEventDetail["eventName"],
    eventPhoto: particularEventDetail["eventPhoto"],
    eventCategoryID: particularEventDetail["eventCategoryID"],
    eventType: particularEventDetail["eventType"],
    eventRegistrationFee: particularEventDetail["eventRegistrationFee"],
    eventRegistrationLink: particularEventDetail["eventRegistrationLink"],
    eventDate: particularEventDetail["eventDate"],
    eventTime: particularEventDetail["eventTime"],
    eventVenue: particularEventDetail["eventVenue"],
    eventBrochure: particularEventDetail["eventBrochure"],
    eventMaxParicipationLimit:
      particularEventDetail["eventMaxParicipationLimit"],
    eventCurrentParticipation:
      particularEventDetail["eventCurrentParticipation"],
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setEventFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const undateEvent = async () => {
    try {
      const particularEventID = particularEventDetail["_id"];
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/${particularEventID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(eventFormData),
        }
      );
      if (!res.ok) {
        throw new Error("Error in updating event details");
      }
      setSuccessMessageDisplay({
        display: true,
        message: "Successfully updated the event",
      });
      setTimeout(() => {
        setSuccessMessageDisplay({
          display: false,
          message: "",
        });
      }, 2000);
      router.push("/");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (adminSecretKey === process.env.NEXT_PUBLIC_ADMIN_SERCET_KEY) {
      setUserConfirmationCardDisplay(false);
      await undateEvent();
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

  const handleCancelUpdate = () => {
    router.push("/");
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setIsImageChanged(true);
    setImageUploading(true);
    setAssetsUploadStatus({
      eventImageStatus: false,
      eventBrochureStatus: assetsUploadStatus.eventBrochureStatus,
    });
    // setFormState(false);
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
        // setFormState(true);
      } else {
        throw new Error("Error uploading asset");
      }
    } catch (error) {
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
    setIsBrochureChanged(true);
    setBrochureUploading(true);
    setAssetsUploadStatus({
      eventImageStatus: assetsUploadStatus.eventImageStatus,
      eventBrochureStatus: false,
    });
    // setFormState(false);
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
          eventImageStatus: assetsUploadStatus.eventImageStatus,
          eventBrochureStatus: true,
        });
        eventFormData.eventBrochure = data.url;
        setBrochureUploading(false);
        // setFormState(true);
      } else {
        throw new Error("Error uploading asset");
      }
    } catch (error) {
      console.log(error);
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
                  Confirm & Update
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
        <form className="flex justify-center">
          <div>
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
                  className="w-full placeholder:text-gray-500    px-[10px] text-[14px] py-[8px] bg-white rounded-[8px] border border-black"
                  onChange={handleInputChange}
                />
              </div>
              <div className="mt-[5px] w-full sm:w-[350px]">
                <div className="flex items-center gap-[7px]">
                  <div>
                    <span className="font-bold text-[14px] md:text-[15px]">
                      Event Photo Link
                    </span>
                  </div>
                  <div
                    className={` ${
                      changeImage ? "block" : "hidden"
                    } -mr-[15px]`}
                  >
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
                <div className="flex justify-end items-center w-full sm:w-[350px]">
                  <input
                    type="text"
                    name="eventPhoto"
                    placeholder="Event Image"
                    required
                    tabIndex={-1}
                    value={eventFormData["eventPhoto"]}
                    className={`w-full placeholder:text-gray-500 px-[10px] text-[14px] py-[8px] bg-white rounded-[8px] border border-black ${
                      changeImage ? "hidden" : "block"
                    }`}
                    onChange={handleInputChange}
                  />
                  <div
                    className={`${
                      changeImage ? "block" : "hidden"
                    } flex items-center justify-end w-full sm:w-[350px]`}
                  >
                    <input
                      type="file"
                      accept=".png, .jpg"
                      name="eventPhoto"
                      required
                      tabIndex={-1}
                      className="w-full placeholder:text-gray-500 px-[10px] text-[14px] file:hidden     py-[8px] bg-white rounded-[8px] border border-black"
                      onChange={handleImageUpload}
                    />
                  </div>
                  <div
                    className={`absolute ${
                      isImageChanged ? "hidden" : "block"
                    }`}
                  >
                    <button
                      type="button"
                      tabIndex={-1}
                      className=" m-[5px] px-[8px] py-[6px] text-center text-white text-[10px] font-medium rounded-[7px] flex justify-center items-center 
                     bg-black "
                      onClick={(e) => {
                        setChangeImage(!changeImage);
                      }}
                    >
                      <span>{changeImage ? "cancle" : "change"}</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-[5px]  w-full sm:w-[350px]">
                <div>
                  <span className="font-bold text-[14px] md:text-[15px]">
                    Event Category
                  </span>
                </div>

                <select
                  name="eventCategoryID"
                  className="w-full px-[10px] text-[14px] py-[8px] bg-white rounded-[8px] border border-black"
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
              <div className=" mt-[5px] w-full sm:w-[350px]">
                <div>
                  <span className="font-bold text-[14px] md:text-[15px]">
                    Event Type
                  </span>
                </div>
                <select
                  name="eventType"
                  className="w-full px-[10px] text-[14px] py-[8px] bg-white rounded-[8px] border border-black"
                  required
                  tabIndex={-1}
                  value={eventFormData["eventType"]}
                  onChange={handleInputChange}
                >
                  <option value="Select">Select</option>
                  <option value="Team">Team</option>
                  <option value="Individual">Individual</option>
                </select>
              </div>
              <div className=" mt-[5px] w-full sm:w-[350px]">
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
                  className="w-full placeholder:text-gray-500    px-[10px] text-[14px] py-[8px] bg-white rounded-[8px] border border-black"
                  onChange={handleInputChange}
                />
              </div>
              <div className=" mt-[5px] w-full sm:w-[350px]">
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
                  className="w-full placeholder:text-gray-500    px-[10px] text-[14px] py-[8px] bg-white rounded-[8px] border border-black"
                  onChange={handleInputChange}
                />
              </div>
              <div className=" mt-[5px] w-full sm:w-[350px]">
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
                  className="w-full placeholder:text-gray-500    px-[10px] text-[14px] py-[8px] bg-white rounded-[8px] border border-black"
                  onChange={handleInputChange}
                />
              </div>
              <div className=" mt-[5px] w-full sm:w-[350px]">
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
                  className="w-full placeholder:text-gray-500    px-[10px] text-[14px] py-[8px] bg-white rounded-[8px] border border-black"
                  onChange={handleInputChange}
                />
              </div>
              <div className=" mt-[5px] w-full sm:w-[350px]">
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
                  className="w-full placeholder:text-gray-500    px-[10px] text-[14px] py-[8px] bg-white rounded-[8px] border border-black"
                  onChange={handleInputChange}
                />
              </div>
              <div className="mt-[5px] w-full sm:w-[350px]">
                <div className="flex items-center gap-[7px]">
                  <div>
                    <span className="font-bold text-[14px] md:text-[15px]">
                      Event Brochure Link
                    </span>
                  </div>
                  <div
                    className={` ${
                      changeBrochure ? "block" : "hidden"
                    } -mr-[15px]`}
                  >
                    <div
                      className={` aspect-square duration-300 ${
                        brochureUploading && "animate-ping"
                      } ${
                        assetsUploadStatus.eventBrochureStatus
                          ? "bg-green-600 w-[10px]"
                          : "bg-black w-[7px]"
                      } rounded-full`}
                    />
                  </div>
                </div>
                <div className="flex justify-end items-center w-full sm:w-[350px]">
                  <input
                    type="text"
                    name="eventBrochure"
                    placeholder="Event Brochure"
                    required
                    tabIndex={-1}
                    value={eventFormData["eventBrochure"]}
                    className={`w-full placeholder:text-gray-500 px-[10px] text-[14px] py-[8px] bg-white rounded-[8px] border border-black ${
                      changeBrochure ? "hidden" : "block"
                    }`}
                    onChange={handleInputChange}
                  />
                  <div
                    className={`${
                      changeBrochure ? "block" : "hidden"
                    } flex items-center justify-end w-full sm:w-[350px]`}
                  >
                    <input
                      type="file"
                      accept=".pdf"
                      name="eventBrochure"
                      required
                      tabIndex={-1}
                      className="w-full placeholder:text-gray-500 px-[10px] text-[14px] file:hidden     py-[8px] bg-white rounded-[8px] border border-black"
                      onChange={handleBrochureUpload}
                    />
                  </div>
                  <div
                    className={`absolute ${
                      isBrochureChanged ? "hidden" : "block"
                    }`}
                  >
                    <button
                      type="button"
                      tabIndex={-1}
                      className=" m-[5px] px-[8px] py-[6px] text-center text-white text-[10px] font-medium rounded-[7px] flex justify-center items-center 
                     bg-black "
                      onClick={(e) => {
                        setChangeBrochure(!changeBrochure);
                      }}
                    >
                      <span>{changeBrochure ? "cancle" : "change"}</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className=" mt-[5px] w-full sm:w-[350px]">
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
                  className="w-full placeholder:text-gray-500    px-[10px] text-[14px] py-[8px] bg-white rounded-[8px] border border-black"
                  onChange={handleInputChange}
                />
              </div>
              <div className=" mt-[5px] w-full sm:w-[350px]">
                <div>
                  <span className="font-bold text-[14px] md:text-[15px]">
                    Event Current Participation
                  </span>
                </div>
                <input
                  type="text"
                  name="eventCurrentParticipation"
                  // placeholder="0"
                  disabled
                  tabIndex={-1}
                  value={eventFormData["eventCurrentParticipation"]}
                  className="w-full placeholder:text-gray-500    px-[10px] text-[14px] py-[8px] bg-[#e2e2e2] rounded-[8px] border border-black"
                />
              </div>
            </div>
            <div className="flex flex-wrap w-full justify-center gap-x-[20px] gap-y-[10px]  mt-[20px]">
              <div className="flex  w-full sm:w-[350px] justify-center ">
                <button
                  type="button"
                  className="w-full px-[10px] py-[8px] bg-black text-white text-[14px] font-semibold rounded-[8px]"
                  onClick={(e) => setUserConfirmationCardDisplay(true)}
                  tabIndex={-1}
                >
                  Update Event
                </button>
              </div>
              <div className=" flex w-full sm:w-[350px] justify-center ">
                <button
                  type="button"
                  className="w-full px-[10px] py-[8px] bg-black text-white text-[14px] font-semibold rounded-[8px]"
                  onClick={handleCancelUpdate}
                  tabIndex={-1}
                >
                  Cancle
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

export default UPDATE_EVENT_CARD;
