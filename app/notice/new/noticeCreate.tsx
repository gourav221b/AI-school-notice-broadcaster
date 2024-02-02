"use client"

import { useEffect, useRef, useState } from "react"

export default function NoticeCreate() {
    const [loading, setLoading] = useState(false)

    const formRef = useRef<any>()

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        const form = new FormData(e.target);
        try {
            setLoading(true)
            const res = await fetch('/api/notice', {
                method: 'POST', body: JSON.stringify({
                    maxRetry: 1,
                    name: form.get('name')?.toString() ?? "Untitled notice",
                    phoneNumber: 1,
                    type: "outbound",
                    chatScript: `You are a receptionist calling from ABC school, Greet the guardian by saying "Hello, this is a call from ABC school.${form.get('script')}". End the call by saying "If you have any queries, please reach out to the school reception desk. Goodbye"`

                })
            })
            const data = await res.json()
            window.location.href = `/notice/${data?.id}`
        }
        catch (err) {
            setLoading(false)
            throw new Error(`${err}`)
        }

    }
    const [audioFile, setAudioFile] = useState<any>('')
    const handleAudioChange = (e: any) => {
        setAudioFile(null);
        const file = e.target.files[0];
        handleSetFile(file)
    };

    const handleSetFile = (file: File) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setAudioFile(reader.result);

        };
    }
    return (
        <section className="space-y-4 max-w-lg">
            <h2 className="text-2xl font-bold">Create new notice</h2>
            <form className="w-full space-y-4" onSubmit={handleSubmit} ref={formRef}>
                <div className="form-group space-y-2">
                    <label htmlFor="name">Notice Name</label>
                    <input name="name" id="name" placeholder="Enter notice name" className="border border-gray-500 w-full p-2" />
                </div>
                <div className="form-group  space-y-2">
                    <label htmlFor="script">Notice script</label> <br />
                    <textarea defaultValue={`This is to hereby inform `} name="script" id="script" className="w-full border p-2 min-h-12" />
                </div>
                <button className="inline-flex text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-md disabled:opacity-65" disabled={loading}>
                    {loading ? "Processing" : "Create"}
                </button>
            </form>
        </section>
    )
}
