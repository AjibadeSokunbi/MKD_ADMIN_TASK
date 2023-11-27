import React from "react";

const SubHeader = () => {
  // Function to format the date
  const formatDate = (date) => {
    const day = date.getDate();
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const monthIndex = date.getMonth();
    const year = date.getFullYear();


    const daySuffix = (day) => {
      if (day >= 11 && day <= 13) {
        return "th";
      }
      switch (day % 10) {
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
      }
    };

    return `${day}${daySuffix(day)} ${monthNames[monthIndex]} ${year}`;
  };


  const today = new Date();
  const formattedDate = formatDate(today);


  const hours = today.getHours();
  const minutes = today.getMinutes();
  const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`; 

  return (
    <div className="w-full justify-between flex mt-20">
      <div className="text-white text-5xl font-thin leading-10">
        Today's Leaderboard
      </div>
      <div className="flex-row flex gap-3 justify-center items-center bg-[#1D1D1D] rounded-xl py-3 px-10">
        <div className="text-base text-white font-thin">{formattedDate}</div>
        <div className="w-1 h-1 bg-stone-500 rounded-full" />
        <div className="px-2.5 py-1 bg-lime-400 rounded-lg justify-center items-center gap-2 inline-flex">
          <div className="text-black text-base font-thin uppercase">
            Submissions OPEN
          </div>
        </div>
        <div className="w-1 h-1 bg-stone-500 rounded-full" />
        <div className="text-white text-base font-thin">{formattedTime}</div>
      </div>
    </div>
  );
};

export default SubHeader;
