"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";


export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            setButtonDisabled(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            toast.success("Login successful");
            router.push("/profile");
        } catch (error) {
            console.log("Login failed", error);
            toast.error("Login failed");
        } finally {
            setLoading(false);
        }
    };

   

    return (
        <div className="flex flex-col items-center justify-center  min-h-screen py-2">
            <div className="flex flex-col border border-gray-500 p-7 rounded-md">
                <h1 className="text-center text-xl">{loading ? "Processing" : "Login"}</h1>
                <br />

                <label htmlFor="email">email</label>
                <input
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                    type="email"
                    id="email"
                    value={user.email}
                    onChange={(e) =>
                        setUser({ ...user, email: e.target.value })
                    }
                    placeholder="email"
                />
                <label htmlFor="password">password</label>
                <input
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                    type="password"
                    id="password"
                    value={user.password}
                    onChange={(e) =>
                        setUser({ ...user, password: e.target.value })
                    }
                    placeholder="password"
                />
                <button
                    onClick={onLogin}
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                >
                    {buttonDisabled ? "Loading..." : "Login"}
                </button>
                <Link href={"/signup"} className="text-center underline" >visit singup page</Link>
            </div>
        </div>
    );
}
