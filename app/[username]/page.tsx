import { HostedPageContent } from "@/components/HostedPageContent"

export default async function HostedPage({ params: { username } }: {
    params: {
        username: string
    }
}) {
    return <HostedPageContent username={username} />
}