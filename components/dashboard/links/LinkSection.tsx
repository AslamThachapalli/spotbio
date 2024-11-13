'use client'

import { LinkType } from "@/actions/links/types"
import { useState, useEffect } from "react"
import { createLink, deleteLink, getLinks, updateLink } from "@/actions/links"
import LinksList from "./LinkList"
import { AddLinkDialog } from "./AddLinkDialog"
import { toast } from "sonner"
import { useLink } from "@/contexts/LinkContext"

export default function LinkSection() {
    const { showAddLinkDialog, setShowAddLinkDialog } = useLink()

    return (
        <>
            {
                showAddLinkDialog &&
                <AddLinkDialog  />
            }

            <button
                className="bg-default-gradient p-3 w-full flex items-center justify-center gap-2 text-white rounded-md shadow-sm"
                onClick={() => setShowAddLinkDialog(true)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                    <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                </svg>

                <p className="font-bold">Add Link</p>
            </button>

            <LinksList />
        </>
    )
}
