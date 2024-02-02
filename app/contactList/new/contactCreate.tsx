"use client"

import { useEffect, useRef, useState } from "react"

export default function ContactCreate() {
    const [loading, setLoading] = useState(true)
    const [phoneNumbers, setPhoneNumbers] = useState<any>([])

    const formRef = useRef<any>()

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        const form = new FormData(e.target);
        try {
            setLoading(true)
            const res = await fetch('/api/notice', {
                method: 'POST', body: JSON.stringify({
                    maxRetry: Number(form.get('retries')) ?? 0,
                    name: form.get('name')?.toString() ?? "Untitled notice",
                    phoneNumber: Number(form.get('number')) ?? 1,
                    type: form.get('type')?.toString() ?? "outbound",
                    chatScript: form.get('script') ?? "This is a empty notice"

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

    return (
        <section className="space-y-4 max-w-lg">
            <h2 className="text-2xl font-bold">Create new contact List</h2>
            <form className="w-full space-y-4" onSubmit={handleSubmit} ref={formRef}>
                <div className="form-group space-y-2">
                    <label htmlFor="name">Notice Name</label>
                    <input name="name" id="name" placeholder="Enter notice name" className="border border-gray-500 w-full p-2" />
                </div>
                <div className="form-group space-y-2">
                    <label htmlFor="type">Notice Type</label>
                    <select name="type" id="type" className="border border-gray-500 w-full p-2" defaultValue={"outbound"}>
                        <option value="blastout" disabled>Broadcast notice</option>
                        <option value="outbound" selected>Conversational notice</option>
                        <option value="transactional" disabled> Student specific notice</option>
                    </select>
                </div>
                <div className="form-group space-y-2">
                    <label htmlFor="number">Phone Number</label>
                    <select name="number" id="number" className="border border-gray-500 w-full p-2" disabled={loading} defaultValue={1}>
                        {loading && <option value="">Loading..</option>}

                        {!loading && phoneNumbers?.map((number: any) => <option value={number.id}>({number?.id}){number?.number}</option>)}
                    </select>
                </div>
                <div className="form-group space-y-2">
                    <label htmlFor="retries">Max retries</label>
                    <select name="retries" id="retries" className="border border-gray-500 w-full p-2" defaultValue={0}>
                        <option value={0} selected> 0</option>
                        <option value={1}> 1</option>
                        <option value={2}> 2</option>
                    </select>
                </div>

                <div className="form-group  space-y-2">
                    <label htmlFor="script">Notice script</label> <br />
                    <textarea defaultValue={`You are a receptionist calling from <school_name> school, Greet the guardian by saying "Hello, this is a call from <school_name> school. This is to inform you about " `} name="script" id="script" className="w-full border p-2 min-h-12" />
                </div>
                <button className="inline-flex text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-md disabled:opacity-65" disabled={loading}>
                    {loading ? "Processing" : "Create"}
                </button>
            </form>
        </section>
    )
}
