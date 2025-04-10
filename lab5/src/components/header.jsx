import { useState } from "react";
import findIcon from "/imgs/Search.png"
import ringIcon from "/imgs/Bell 1.png"
import quesIcon from "/imgs/Question 1.png"
import ava from "/imgs/Avatar (5).png"


export default function Header() {
    return (
        <div className="flex justify-between items-center p-5 border-b border-gray-300">

            <span className="font-extrabold text-xl text-pink-600">Dashboard</span>

            <div className="flex items-center bg-gray-100 rounded-lg p-2 w-64">
                <img src={findIcon} alt="Search" className="w-4 h-4 mr-2" />
                <input
                    type="text"
                    className="bg-gray-100 outline-none border-none w-full text-gray-700"
                    placeholder="Search..."
                />
            </div>


            <div className="flex items-center">
                <img
                    src={ringIcon}
                    alt="Notification"
                    className="w-5 h-5 mx-3"
                />
                <img
                    src={quesIcon}
                    alt="Questions"
                    className="w-5 h-5 mx-3"
                />
                <img
                    src={ava}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full border-2 border-white"
                />
            </div>
        </div>
    );
}
