import { HostedPageContent } from "../HostedPageContent";

export default function HostedPreview({ username }: { username: string }) {
    return (
        <div className="bg-white rounded-2xl shadow-xl border-black border-[9px] h-4/6 w-[300px]">
            <HostedPageContent username={username} isPreview={true} />
        </div>
    )
}