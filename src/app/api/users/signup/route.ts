import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";


connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { userName, email, password } = reqBody;

        // //hsh password 
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt)
        const user = new User({
            userName,
            email,
            password: hashedPassword
        });
        const userDetails = await user.save();
        return NextResponse.json({
            message: "User created successfully",
            success: true,
            userDetails
        })

    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message });
    }

}