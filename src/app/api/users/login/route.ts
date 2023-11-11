import { connect } from '@/dbConfig/dbConfig';
import User from "@/models/userModel";
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken';

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;
        const userDetail = await User.findOne({ email })
        if (!userDetail) {
            return NextResponse.json({ success: false, error: "Invalid email" },)
        }
        const PasswordCheck = await bcryptjs.compare(password, userDetail.password);
        if (!PasswordCheck) {
            return NextResponse.json({ success: false, error: "Invalid password" },)
        }
        const tokenData = {
            id: userDetail._id,
            email: userDetail.email,
            userName: userDetail.userName
        }
        const response = NextResponse.json({ success: false, error: userDetail._id });
        const webToken = await jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: "1d" })
        response.cookies.set('token', webToken, {
            httpOnly: true
        })
        return response;

    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message });
    }
}