"use client";

import React from "react";

const NEW_EVENT_CARD = () => {
  return (
    <>
      <div>
        
        <form className="flex justify-center m-[10px]">
          <div className="w-[1000px] flex justify-center  gap-x-[15px] flex-wrap mx-[20px]">
            <div className="mt-[5px]">
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
                className="w-[350px] placeholder:text-gray-500    px-[10px] text-[14px] py-[8px] bg-white rounded-[8px] border border-black"
              />
            </div>
            <div className="mt-[5px]">
              <div>
                <span className="font-bold text-[14px] md:text-[15px]">
                  Event Photo Link
                </span>
              </div>
              <input
                type="text"
                name="eventPhotoLink"
                placeholder="Cloudinary Link of Image"
                required
                className="w-[350px] placeholder:text-gray-500 px-[10px] text-[14px] py-[8px] bg-white rounded-[8px] border border-black"
              />
            </div>
            <div className=" mt-[5px]">
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
                className="w-[350px] placeholder:text-gray-500    px-[10px] text-[14px] py-[8px] bg-white rounded-[8px] border border-black"
              />
            </div>
            <div className="mt-[5px]">
              <div>
                <span className="font-bold text-[14px] md:text-[15px]">
                  Event Category
                </span>
              </div>
              <select
                name="eventCategoryID"
                className="w-[350px] px-[10px] text-[14px] py-[8px] bg-white rounded-[8px] border border-black"
              >
                <option value="select">Select</option>
                <option value="non_tech">Non Technical Event</option>
                <option value="tech">Technical Event</option>
                <option value="cultural">Cultural Event</option>
                <option value="literary">Literary Event</option>
                <option value="social">Social Event</option>
                <option value="esports">Esports Event</option>
              </select>
            </div>
            <div className=" mt-[5px]">
              <div>
                <span className="font-bold text-[14px] md:text-[15px]">
                  Event Type
                </span>
              </div>
              <select
                name="eventType"
                className="w-[350px] px-[10px] text-[14px] py-[8px] bg-white rounded-[8px] border border-black"
              >
                <option value="select">Select</option>
                <option value="non_tech">Team Event</option>
                <option value="tech">Individual Player Event</option>
              </select>
            </div>
            <div className=" mt-[5px]">
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
                className="w-[350px] placeholder:text-gray-500    px-[10px] text-[14px] py-[8px] bg-white rounded-[8px] border border-black"
              />
            </div>
            <div className=" mt-[5px]">
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
                className="w-[350px] placeholder:text-gray-500    px-[10px] text-[14px] py-[8px] bg-white rounded-[8px] border border-black"
              />
            </div>
            <div className=" mt-[5px]">
              <div>
                <span className="font-bold text-[14px] md:text-[15px]">
                  Event Venue
                </span>
              </div>
              <input
                type="text"
                name="eventvenue"
                placeholder="Venue"
                required
                className="w-[350px] placeholder:text-gray-500    px-[10px] text-[14px] py-[8px] bg-white rounded-[8px] border border-black"
              />
            </div>
            <div className=" mt-[5px]">
              <div>
                <span className="font-bold text-[14px] md:text-[15px]">
                  Event Brochure Link
                </span>
              </div>
              <input
                type="text"
                name="eventBrochureLink"
                placeholder="Cloudinary Link of Brochure"
                required
                className="w-[350px] placeholder:text-gray-500    px-[10px] text-[14px] py-[8px] bg-white rounded-[8px] border border-black"
              />
            </div>
            <div className=" mt-[5px]">
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
                className="w-[350px] placeholder:text-gray-500    px-[10px] text-[14px] py-[8px] bg-white rounded-[8px] border border-black"
              />
            </div>
            <div className="flex justify-center mt-[20px]">
              <button
                type="submit"
                className="w-[350px] px-[10px] py-[8px] bg-black text-white text-[14px] font-semibold rounded-[8px]"
              >
                Add Event
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default NEW_EVENT_CARD;
