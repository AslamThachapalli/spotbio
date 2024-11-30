'use client'

import clsx from "clsx"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import { toast } from "sonner"

function Signin() {
    const router = useRouter()

    const [form, setForm] = useState({
        username: '',
        password: '',
    })
    const [isRequiredError, setIsRequiredError] = useState({
        usernameReq: false,
        passReq: false,
    })
    const [isLoading, setIsLoading] = useState(false)

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
        if (!form.username || !form.password) {
            setIsRequiredError({
                usernameReq: form.username ? false : true,
                passReq: form.username ? false : true,
            })
            return;
        }
        
        const toastId = toast.loading('Signing In...')
        setIsLoading(true)

        const res = await signIn('credentials', {
            username: form.username,
            password: form.password,
            redirect: false,
        })

        toast.dismiss(toastId);
        if (!res?.error) {
            router.push('/dashboard/links');
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

        setIsLoading(false)
    }

    return (
        <div className="flex flex-col gap-3 max-w-sm w-full bg-white p-4 rounded-lg shadow-md">
            <h4 className="font-black text-xl mb-3">Signin</h4>

            <label className="flex flex-col gap-1 font-semibold">
                <span>Username</span>
                <input
                    name="username"
                    type="text"
                    value={form.username}
                    onChange={handleChange}
                    className={clsx("bg-[#F3F3F4] px-2 py-1 rounded-md outline-none", {
                        "border border-red-500": isRequiredError.usernameReq,
                    })}
                />
                {
                    isRequiredError.usernameReq &&
                    <p className="text-red-500">Enter your username</p>
                }
            </label>

            <label className="flex flex-col gap-1 font-semibold">
                <span>Password</span>
                <input
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    className={clsx("bg-[#F3F3F4] px-2 py-1 rounded-md outline-none", {
                        "border border-red-500": isRequiredError.passReq,
                    })}
                />
                {
                    isRequiredError.passReq &&
                    <p className="text-red-500">Enter your password</p>
                }
            </label>

            <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full bg-red-300 py-2 rounded-md mt-2 font-bold text-white uppercase tracking-wider"
            >
                {isLoading ? 'Signing in...' : 'Submit'}
            </button>
        </div>
    );
}

export default Signin;