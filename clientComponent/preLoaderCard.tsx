import React from "react";

const PRELOADER_CARD = () => {
  return (
    <>
      <div className="w-full sm:w-fit h-fit block gap-5 bg-white rounded-[20px] border border-black p-[10px]">
        <div className="flex justify-center overflow-hidden w-full sm:w-[300px]  h-[200px]">
          <div className="duration-300 rounded-[17px] w-full sm:w-[300px]">
            <div>
              <div className="w-[300px] h-[200px] rounded-[20px] loaderCard_animation" />
            </div>
          </div>
        </div>
        <div className="mt-[10px]  text-center  ">
          <div className="flex justify-center">
            <div className="w-[100px] h-[20px] rounded-full loaderCard_animation" />
          </div>
          <div className="flex justify-center mt-[5px]">
            <div className="w-[100px] h-[20px] rounded-full loaderCard_animation" />
          </div>
        </div>
        <div className="text-center duration-300 "></div>

        <div className="w-full flex  justify-center gap-2 mt-[10px]">
          <div className="w-full">
            <div className="flex justify-center mt-[5px]">
              <div className="w-full h-[30px] rounded-full loaderCard_animation" />
            </div>
          </div>
          <div className="w-full">
            <div className="flex justify-center mt-[5px]">
              <div className="w-full h-[30px] rounded-full loaderCard_animation" />
            </div>
          </div>
        </div>
        <div className="w-full flex  justify-center gap-2 mt-[8px]">
          <div className="w-full">
            <div className="flex justify-center mt-[5px]">
              <div className="w-full h-[30px] rounded-full loaderCard_animation" />
            </div>
          </div>
          <div className="w-full">
            <div className="flex justify-center mt-[5px]">
              <div className="w-full h-[30px] rounded-full loaderCard_animation" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PRELOADER_CARD;
