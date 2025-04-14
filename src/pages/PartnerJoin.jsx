import React from "react";
import { useNavigate } from "react-router-dom";

const PartnerJoin = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-orange-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md text-center w-full">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Join as a Partner</h2>
        <p className="text-gray-600 mb-8">Choose how you want to collaborate with us</p>
        <div className="flex flex-col gap-6">
          <button
            onClick={() => navigate("/partner/mess-owner")}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition duration-300"
          >
            Join as Mess Owner
          </button>
          <button
            onClick={() => navigate("/partner/room-owner")}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition duration-300"
          >
            Join as Room Owner
          </button>
        </div>
      </div>
    </div>
  );
};

export default PartnerJoin;
