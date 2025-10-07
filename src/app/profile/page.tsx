"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function ProfilePage() {
    const router = useRouter();
    const [data, setData]  = useState("nothing") 
     const logout = async () => {
        try {
            await axios.get("/api/users/logout");
            toast.success("Logout successful");
            router.push("/login");
        } catch (error) {
            console.log("Logout failed", error);
            toast.error("Logout failed");
        }
    };

    const getUserDetails = async () => {
        const res = await axios.get("/api/users/me");
        console.log(res.data);
        setData(res.data.data._id)
    }
                 
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <br />
            <p>Profile page</p>
            <h2 className="px-3 py-1.5  text-black rounded bg-green-300">
                {data === "nothing" ? (
                    "Nothing"
                ) : (
                    <Link href={`/profile/${data}`}>{data}</Link>
                )}
            </h2>
            <br />
            <button
                onClick={logout}
                className="p-2 border hover:cursor-pointer border-gray-300 bg-orange-400 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            >
                Logout
            </button>
            <button
                onClick={getUserDetails}
                className="p-2 border hover:cursor-pointer border-gray-300 bg-blue-400 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            >
                get user details
            </button>

            <Toaster />
        </div>
    );
}
