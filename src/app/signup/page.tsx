"use client"
import style from "./style.module.css";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

export default function SignUp() {
    const route = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        userName: ""
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            if (response.data.success) {
                toast.success(response.data.message)
            } else {
                toast.error(response.data.error)
            }
        } catch (error: any) {
            console.log(error)
        }

    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
         
            <h1 className={`${style.nikhil} text-center `}>sign up</h1>
            <label htmlFor="userName">userName</label>
            <input className={style.inputTag} id="userName" type="text" value={user.userName} onChange={(e) => setUser({ ...user, userName: e.target.value })}
            ></input>

            <label htmlFor="email">Email</label>
            <input className={style.inputTag} id="email" type="text" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })}
            ></input>

            <label htmlFor="password">password</label>
            <input className={style.inputTag} id="password" type="text" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })}
            ></input>
            <button onClick={onSignup} className={style.inputTag}>{buttonDisabled ? 'no sign up' : 'SignUp'}</button>
        </div>
    )
}