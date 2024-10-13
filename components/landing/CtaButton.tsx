import Link from "next/link"

export default function CtaButton() {
    return (
        <div className="relative font-bold">
            <input
                className="border-red-300 border rounded-md outline-red-300 pl-[117px] pr-[150px] py-3 w-96 flex"
                placeholder="yourname"
            />

            <Link
                className="absolute right-0 bottom-0 flex h-full justify-center items-center text-white bg-red-300 px-5 rounded-r-md"
                href={'/signup'}
            >
                Claim my link
            </Link>

            <p className="absolute bottom-0 flex h-full justify-center items-center pl-5">spotbio.app/</p>
        </div>
    )
}