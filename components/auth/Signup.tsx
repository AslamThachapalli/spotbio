'use client'

import { createUser } from "@/actions/auth";
import { InputValidationType, validateEmail, validatePassword, validateUsername } from "@/lib/validations";
import clsx from "clsx";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { toast } from "sonner";

function Signup() {
    const [form, setForm] = useState({
        email: '',
        username: '',
        password: '',
    });
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [inputValidation, setInputValidation] = useState<{
        email: InputValidationType,
        pass: InputValidationType,
        username: InputValidationType,
    }>({
        email: {
            isValid: true,
        },
        pass: {
            isValid: true,
        },
        username: {
            isValid: true,
        },
    })
    const router = useRouter()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        switch (name) {
            case ('email'): {
                setInputValidation((prevState) => ({
                    ...prevState,
                    email: {
                        isValid: true,
                    },
                }))
                break;
            }
            case ('password'): {
                setInputValidation((prevState) => ({
                    ...prevState,
                    pass: {
                        isValid: true,
                    },
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

        setInputValidation((prevState) => ({
            ...prevState,
            username: {
                isValid: true
            },
        }))

        setForm({
            ...form,
            username: value
        })

        const isValid = await validateUsername(value);

        setInputValidation((prevState) => ({
            ...prevState,
            username: isValid,
        }))
    }

    const handleSubmit = async () => {
        const emailValidation = validateEmail(form.email);
        const passwordValidation = validatePassword(form.password)
        const usernameValidation = await validateUsername(form.username)

        if (!emailValidation.isValid || !passwordValidation.isValid || !usernameValidation.isValid) {
            setInputValidation({
                email: emailValidation,
                pass: passwordValidation,
                username: usernameValidation,
            })
            return;
        }

        const loadId = toast.loading('Signing up...')

        const res = await createUser(form);

        if (!res.error) {
            await signIn('credentials', {
                username: form.username,
                password: form.password,
                redirect: false,
            })

            toast.dismiss(loadId)
            router.push('/dashboard/links');
            toast.success('Account created!')
        } else {
            toast.dismiss(loadId)
            toast.error(res.error)
        }
    }

    return (
        <div className="flex flex-col gap-3 max-w-sm w-full bg-white p-4 rounded-lg shadow-md">
            <h4 className="font-black text-xl mb-3">Create your account</h4>

            <label className="flex flex-col gap-1 font-semibold">
                <span>Email</span>
                <input
                    name="email"
                    type="email"
                    onChange={handleChange}
                    placeholder="user@gmail.com"
                    className={clsx("bg-[#F3F3F4] px-2 py-1 rounded-md outline-none", {
                        "border border-red-500": !inputValidation.email.isValid,
                    })}
                />
                {
                    !inputValidation.email.isValid &&
                    <p className="text-red-500">{inputValidation.email.error}</p>
                }
            </label>

            <label className="flex flex-col gap-1 font-semibold">
                <span>Username</span>
                <div className="relative flex">
                    <input
                        name="username"
                        type="text"
                        onChange={handleUsernameChange}
                        value={form.username}
                        placeholder="username"
                        className={clsx("bg-[#F3F3F4] pl-[102px] py-1 w-full rounded-md outline-none", {
                            "border border-red-500": !inputValidation.username.isValid,
                        })}
                    />
                    <p className="absolute px-2 h-full flex items-center bottom-0">spotbio.app/</p>
                </div>
                {
                    !inputValidation.username.isValid &&
                    <p className="text-red-500">{inputValidation.username.error}</p>
                }
            </label>

            <label className="flex flex-col gap-1 font-semibold">
                <span>Password</span>
                <div className="relative">
                    <input
                        name="password"
                        type={isPasswordVisible ? "text" : "password"}
                        onChange={handleChange}
                        placeholder="······"
                        className={clsx("bg-[#F3F3F4] px-2 py-1 w-full rounded-md outline-none", {
                            "border border-red-500": !inputValidation.pass.isValid,
                        })}
                    />
                    <button
                        className="absolute bottom-0 right-0 text-black flex items-center h-full px-2"
                        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    >
                        {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>
                {
                    !inputValidation.pass.isValid &&
                    <p className="text-red-500">{inputValidation.pass.error}</p>
                }
            </label>

            <button
                onClick={handleSubmit}
                className="w-full bg-red-300 py-2 rounded-md mt-2 font-bold text-white uppercase tracking-wider"
            >Submit</button>
        </div>
    );
}

export default Signup;