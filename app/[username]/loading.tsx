export default async function Loading() {
    return (
        <div className="flex items-center justify-center space-x-2 h-screen">
            <div className="w-8 h-8 border-4 border-slate-500 border-dotted rounded-full animate-spin"></div>
            <span className="text-slate-500 font-medium">Loading...</span>
        </div>
    )
}