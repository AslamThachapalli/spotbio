import { getServerSession } from "next-auth";
import CtaButton from "./CtaButton";
import GoToDashboardButton from "./GoToDashboardButton";
import LandingHeader from "./LandingHeader";

export default async function LandingPage() {
    const session = await getServerSession();

    return (
        <div >
            { !session?.user && <LandingHeader />}
            
            <div className="w-screen h-screen flex justify-center items-center flex-col gap-5">
                <h1 className="text-7xl font-bold whitespace-pre-line text-center">{`Launch your bio \n in seconds`}</h1>

                {
                    session?.user ? <GoToDashboardButton/> :<CtaButton />
                }

                <p className="font-medium">{`It’s free, and takes less than a minute`}</p>
            </div>
        </div>
    )
}