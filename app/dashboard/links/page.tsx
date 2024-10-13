'use client'
import { useState } from "react"

export default function LinksPage() {
    const [showDialog, setShowDialog] = useState(false);

    return (
        <>
            {showDialog && <Dialog
                onClose={() => { setShowDialog(false) }}
            />}
            <button
                className="bg-pink-300 p-3 w-full"
                onClick={() => setShowDialog(true)}
            >
                Add Link
            </button>
        </>
    )
}

export function Dialog({ onClose }: { onClose: () => void }) {
    return (
        <div
            className="absolute z-10 top-0 left-0 right-0 bottom-0 w-screen h-screen bg-black/40 flex justify-center items-center"
            onClick={onClose}
        >
            <div
                className="h-52 w-52 bg-white"
            >

            </div>
        </div>
    )
}