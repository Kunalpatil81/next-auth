"use client";
import { useEffect } from "react";

export default function ProfilePage({ params }: any) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <br />
            <p>
                Profile page{" "}
                <span className="bg-amber-400 px-5  py-2 rounded-xl">
                    {params.id}
                </span>
            </p>
        </div>
    );
}
