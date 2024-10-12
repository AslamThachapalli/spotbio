'use client'

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import { toast } from "sonner"

export default function Signin() {
    const [form, setForm] = useState({
        username: '',
        password: '',
    })
    const [isRequiredError, setIsRequiredError] = useState({
        usernameReq: false,
        passReq: false,
    })
    const router = useRouter()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        switch (name) {
            case ('username'): {
                setIsRequiredError((prevState) => ({
                    ...prevState,
                    usernameReq: false
                }))
                break;
            }
            case ('password'): {
                setIsRequiredError((prevState) => ({
                    ...prevState,
                    passReq: false
                }))
                break;
            }
        }

        setForm({
            ...form,
            [name]: value,
        })
    }

    const handleSubmit = async () => {
        const toastId = toast.loading('Signing In...')

        if (!form.username || !form.password) {
            setIsRequiredError({
                usernameReq: form.username ? false : true,
                passReq: form.username ? false : true,
            })
            toast.dismiss(toastId)
            return;
        }

        const res = await signIn('credentials', {
            username: form.username,
            password: form.password,
            redirect: false,
        })

        toast.dismiss(toastId);
        if (!res?.error) {
            router.push('/');
            toast.success('Signed In');
        } else {
            if (res.status === 401) {
                toast.error('Invalid Credentials, try again!');
            } else if (res.status === 400) {
                toast.error('Missing Credentials!');
            } else if (res.status === 404) {
                toast.error('Account not found!');
            } else if (res.status === 403) {
                toast.error('Forbidden!');
            } else {
                toast.error('oops something went wrong..!');
            }
        }
    }

    return (
        <div className="w-screen h-full">
            <div className="mx-auto h-full flex justify-center items-center">
                <div className="flex flex-col gap-2 max-w-sm w-full bg-white p-4">
                    <h4>Signin</h4>

                    <label className="flex flex-col gap-1">
                        <span>Username</span>
                        <input
                            name="username"
                            type="text"
                            value={form.username}
                            onChange={handleChange}
                            className="bg-gray-50 px-2 py-1"
                        />
                    </label>

                    <label className="flex flex-col gap-1">
                        <span>Password</span>
                        <input
                            name="password"
                            type="password"
                            value={form.password}
                            onChange={handleChange}
                            className="bg-gray-50 px-2 py-1"
                        />
                    </label>

                    <button
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}