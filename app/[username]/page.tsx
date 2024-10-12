export default function HostedPage({params: {username}}: { params: {
    username: string
}}) {
    return (
        <div>{username}</div>
    )
}