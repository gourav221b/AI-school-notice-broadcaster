"use client"
import React, { useEffect, useState } from 'react'

export default function NoticeDetail({ noticeId }: { noticeId: any }) {
    const [currentNotice, setCurrentNotice] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [createNew, setCreateNew] = useState(false)
    useEffect(() => {
        async function fetchNotice() {
            setLoading(true)
            try {
                const campaign = await fetch(`/api/notice/${noticeId}`, { method: 'GET' })
                const data = await campaign.json();
                setLoading(false)
                setCurrentNotice(() => data)
            } catch (error) {
                setLoading(false)
                console.error("Error fetching campaigns:", error);
                throw new Error(`An error has occurred: ${error}`)
            }
        }
        fetchNotice()

    }, [])

    async function handleListSubmit(e: any) {
        e.preventDefault()
        const form = new FormData(e.target);
        try {
            setSubmitting(true)
            const res = await fetch('/api/contact-lists', {
                method: 'POST',
                body: JSON.stringify({
                    campaign: Number(noticeId),
                    description: "Notice contact list",
                    name: form.get('name')?.toString() ?? "Untitled contact list"
                })
            })
            const data = await res.json()
            window.location.href = `/contactList/${data?.id}`
        }
        catch (err) {
            setSubmitting(false)
            console.log(err)
            throw new Error(`${err}`)
        }
    }
    return (
        <div>
            {loading ? "loading..." :
                <div className="p-4">
                    <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                        <div className="p-6">
                            <h2 className="text-xs title-font font-bold text-gray-400 mb-1 uppercase">{currentNotice?.type}</h2>
                            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">{currentNotice?.name}</h1>
                            {currentNotice?.type == "outbound" && <textarea className="leading-relaxed mb-3 min-h-[120px] w-full border" defaultValue={currentNotice?.chatScript}></textarea>}
                        </div>
                        <div className="p-6 space-y-4">

                            <button className="inline-flex text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-sm" onClick={() => setCreateNew(!createNew)}>
                                {createNew ? "Close" : " Create new contact list"}
                            </button>

                            {createNew ? <form className='space-y-4' onSubmit={handleListSubmit}>
                                <div className="form-group space-y-2">
                                    <label htmlFor="">Contact List Name</label>
                                    <input type="text" placeholder='Contact List Name' name='name' id='name' className="w-full border p-2" />
                                </div>
                                <button className="inline-flex text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-sm" disabled={submitting}>
                                    {submitting ? "Processing" : "Submit"}
                                </button>
                            </form> : null}
                        </div>
                    </div>

                </div>

            }</div>
    )
}
