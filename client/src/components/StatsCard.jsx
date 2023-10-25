import React from "react";

const StatsCard = ({ name, icon, totalNum, cardType }) => {
  return (
    <div
      className={` p-4 rounded shadow-lg capitalize border-b-4 ${
        cardType == "users"
          ? " border-b-yellow-500 bg-yellow-100"
          : cardType == "interview"
          ? "border-b-green-500 bg-green-100"
          : cardType == "pending"
          ? "bg-blue-100 border-b-blue-500"
          : cardType == "declined"
          ? "bg-red-100 border-b-red-500"
          : " border-b-blue-500 bg-blue-100"
      }`}
    >
      <div className="flex items-center justify-between my-4">
        <h2
          className={`py-2 px-4 rounded-lg text-white ${
            cardType == "users"
              ? " bg-yellow-600"
              : cardType == "interview"
              ? " bg-green-700"
              : cardType == "pending"
              ? "bg-blue-700"
              : cardType == "declined"
              ? "bg-red-700 "
              : "bg-blue-600"
          }`}
        >
          {totalNum}
        </h2>
        <h2
          className={`py-2 px-4 rounded-lg text-white ${
            cardType == "users"
              ? "bg-yellow-600"
              : cardType == "interview"
              ? " bg-green-700"
              : cardType == "pending"
              ? "bg-blue-700"
              : cardType == "declined"
              ? "bg-red-700 "
              : "bg-blue-600"
          }`}
        >
          {icon}
        </h2>
      </div>
      <h1 className="my-4">{name}</h1>
    </div>
  );
};

export default StatsCard;
