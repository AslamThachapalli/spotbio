import Link from "next/link"

export default function LandingHeader() {

    return (
        <div className="w-screen flex justify-center">
            <div className="max-width w-full mt-2 rounded-full absolute z-10 h-20 flex justify-between items-center shadow-lg border-2 px-8 py-5">
                <p>Spotbio</p>

                <div>
                    <Link
                        href={'/signin'}
                        className="h-full px-6 bg-black rounded-full text-white py-3 font-bold"
                    >
                        {"SignIn"}
                    </Link>
                </div>
            </div>
        </div>
    )
}