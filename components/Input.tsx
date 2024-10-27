import { ChangeEvent } from "react";
import { cn } from "@/lib/utils";

interface InputProps {
    label?: string;
    placeholder?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    value?: string;
    type?: string;
    className?: string;
    [key: string]: any;
}

export default function Input({ label, placeholder, onChange, value, type = 'text', className, ...props }: InputProps) {
    return (
        <label className="flex flex-col gap-1">
            {label && <span className="text-base font-bold text-gray-700">{label}</span>}
            <input
                {...props}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                type={type}
                className={cn(
                    "w-full p-2 font-bold border rounded outline-none bg-[#F3F3F4] hover:bg-[#eaeaeb] focus:bg-white focus:border-[#CF59D8]",
                    className
                )}
            />
        </label>
    )
}