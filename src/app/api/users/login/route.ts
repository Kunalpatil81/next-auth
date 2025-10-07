import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        if (!email || !password) {
            return NextResponse.json(
                { message: "Please fill all the fields" },
                { status: 400 }
            );
        }

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { message: "User does not exist" },
                { status: 404 }
            );
        }
        const isPasswordCorrect = await bcryptjs.compare(
            password,
            user.password
        );
        if (!isPasswordCorrect) {
            return NextResponse.json(
                { message: "Invalid credentials" },
                { status: 401 }
            );
        }

        // create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
        };
        // create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
            expiresIn: "1d",
        });

        const response =  NextResponse.json({
            message: "Login successful",
            success: true,
        })
        response.cookies.set("token", token, {httpOnly: true,})
        return response;
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
