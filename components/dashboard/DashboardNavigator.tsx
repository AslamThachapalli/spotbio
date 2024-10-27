'use client'

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from 'framer-motion';

const tabs = [
    'links',
    'design',
]

function DashboardNavigator() {
    const pathname = usePathname()

    return (
        <ul className="flex border-b-2 max-w-[600px] gap-5">
            {
                tabs.map((tab) => (
                    <li
                        key={tab}
                        className={clsx("relative font-bold capitalize py-3", {
                            "text-black": pathname === `/dashboard/${tab}`,
                            "text-black/60": pathname !== `/dashboard/${tab}`
                        })}
                    >
                        <Link
                            href={`/dashboard/${tab}`}
                            className="hover:text-black"
                        >
                            {tab}
                        </Link>
                        {
                            pathname === `/dashboard/${tab}` ?
                                <motion.div
                                    className="absolute right-0 -bottom-[2px] border h-1 bg-default-gradient w-full"
                                    layoutId="underline"
                                /> : null
                        }
                    </li>
                ))
            }
        </ul>
    );
}

export default DashboardNavigator;