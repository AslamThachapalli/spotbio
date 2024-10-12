'use client'

import { createUser, isUsernameAvailable } from "@/app/actions/auth";
import clsx from "clsx";
import { useRouter } from "next/router";
import { useState } from "react"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { toast } from "sonner";

export default function SignUp() {
    const [form, setForm] = useState({
        email: '',
        username: '',
        password: '',
    });
    const [isUsernameValid, setIsUsernameValid] = useState(true)
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [requiredError, setRequiredError] = useState({
        emailReq: false,
        passReq: false,
        usernameReq: false,
    })
    const router = useRouter()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        switch (name) {
            case ('email'): {
                setRequiredError((prevState) => ({
                    ...prevState,
                    emailReq: false,
                }))
                break;
            }
            case ('password'): {
                setRequiredError((prevState) => ({
                    ...prevState,
                    passReq: false,
                }))
                break;
            }
        }

        setForm({
            ...form,
            [name]: value,
        })
    }

    const handleUsernameChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value

        setRequiredError((prevState) => ({
            ...prevState,
            usernameReq: false,
        }))

        setForm({
            ...form,
            username: value
        })

        const isValid = await isUsernameAvailable(value)
        setIsUsernameValid(isValid)
    }

    const handleSubmit = async () => {
        const loadId = toast.loading('Signing up...')

        if (!form.email || !form.password || !form.username) {
            setRequiredError({
                emailReq: form.email ? false : true,
                passReq: form.password ? false : true,
                usernameReq: form.username ? false : true,
            })
            toast.dismiss(loadId)
            return;
        }

        const res = await createUser(form);

        toast.dismiss(loadId)
        if (!res.error) {
            router.push('/');
            toast.success('Signed In')
        } else {
            toast.error(res.error)
        }
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
                            onChange={handleChange}
                            className="bg-gray-50 px-2 py-1"
                        />
                        {
                            requiredError.emailReq &&
                            <p className="text-red-500">Email is required</p>
                        }
                    </label>

                    <label className="flex flex-col gap-1">
                        <span>Username</span>
                        <div className="relative flex">
                            <input
                                name="username"
                                type="text"
                                onChange={handleUsernameChange}
                                value={form.username}
                                placeholder="username"
                                className={clsx("bg-gray-50 pl-[102px] py-1 w-full", {
                                    "border-red-500 border-[1px]": !isUsernameValid,
                                })}
                            />
                            <p className="absolute px-2 h-full flex items-center bottom-0">spotbio.app/</p>
                        </div>
                        {
                            requiredError.usernameReq &&
                            <p className="text-red-500">Username is required</p>
                        }
                        {!isUsernameValid &&
                            <p className="text-red-500">Username has already been taken</p>
                        }
                    </label>

                    <label className="flex flex-col gap-1">
                        <span>Password</span>
                        <div className="relative ">
                            <input
                                name="password"
                                type={isPasswordVisible ? "text" : "password"}
                                onChange={handleChange}
                                className="bg-gray-50 px-2 py-1 w-full"
                            />
                            <button
                                className="absolute bottom-0 right-0 text-black flex items-center h-full px-2"
                                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                            >
                                {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {
                            requiredError.passReq &&
                            <p className="text-red-500">Password is required</p>
                        }
                    </label>

                    <button
                        onClick={handleSubmit}
                    >Submit</button>
                </div>
            </div>
        </div>
    )
}