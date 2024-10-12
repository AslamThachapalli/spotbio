'use client'

import { useState } from "react"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

export default function SignUp() {
    const [form, setForm] = useState({
        email: '',
        username: '',
        password: '',
    });

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setForm({
            ...form,
            [name]: value,
        })
    }

    return (
        <div className="w-screen h-full">
            <div className="mx-auto h-full flex justify-center items-center">
                <div className="flex flex-col gap-2 max-w-sm w-full bg-white p-4">
                    <h4>Signup</h4>

                    <label className="flex flex-col gap-1">
                        <span>Email</span>
                        <input
                            name="email"
                            type="email"
                            onChange={(e) => { }}
                            className="bg-gray-50 px-2 py-1"
                        />
                    </label>

                    <label className="flex flex-col gap-1">
                        <span>Username</span>
                        <input
                            name="username"
                            type="text"
                            onChange={(e) => { }}
                            className="bg-gray-50 px-2 py-1"
                        />
                    </label>

                    <label className="flex flex-col gap-1">
                        <span>Password</span>
                        <div className="relative ">
                            <input
                                name="password"
                                type={isPasswordVisible ? "text" : "password"}
                                onChange={(e) => { }}
                                className="bg-gray-50 px-2 py-1 w-full"
                            />
                            <button
                                className="absolute bottom-0 right-0 text-black flex items-center h-full px-2"
                                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                            >
                                {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </label>

                    <button>Submit</button>
                </div>
            </div>
        </div>
    )
}