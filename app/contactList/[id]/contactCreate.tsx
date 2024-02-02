"use client"
import { contactConfig } from '@/config'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function ContactCreate({ contactListId }: { contactListId: any }) {
    const [loading, setLoading] = useState(true)
    const [currentList, setCurrentList] = useState<any>({})
    const [file, setFile] = useState<File | null>(null)
    const [uploading, setUploading] = useState(false)

    const fileReader = typeof window !== 'undefined' ? new FileReader() : null;

    const handleOnChange = (e: any) => {
        setFile(e.target.files[0]);
    };
    const CSVToJSON = (data: string, delimiter = ',') => {
        const titles = data.slice(0, data.indexOf('\r\n')).split(delimiter);

        return data
            .slice(data.indexOf('\r\n') + 1)
            .split('\n')
            .map(v => {
                const values = v.split(delimiter);
                return titles.reduce(
                    (obj: any, title, index) => ((obj[title] = values[index]?.replace('\r', '')), obj),
                    {}
                );
            });
    };
    useEffect(() => {
        async function fetchContactList() {
            setLoading(true)
            try {
                const contactList = await fetch(`/api/contact-lists/${contactListId}`, { method: 'GET' })
                const data = await contactList.json();
                setLoading(false)
                setCurrentList(() => data)
            } catch (error) {
                setLoading(false)
                console.error("Error fetching list:", error);
                throw new Error(`An error has occurred: ${error}`)
            }
        }
        fetchContactList()
    }, [])

    const handleUpload = (e: any) => {
        e.preventDefault()
        const form = new FormData(e.target)
        let checked = form.get('call') ? true : false
        if (file && fileReader) {
            fileReader.onload = function (event: any) {
                const text = event.target.result;
                let contacts = CSVToJSON(text)
                let data = contacts.filter(c => c.firstName !== '' && c.lastName !== undefined && c.phoneCode !== undefined && c.phoneNumber !== undefined).map(c => ({
                    ...c, leadlist: Number(contactListId)
                }))

                uploadContacts(data, checked)
            };

            fileReader.readAsText(file);
        }

        async function uploadContacts(students: any, call: boolean = true) {
            try {
                setUploading(true)
                const studentsResponse = await fetch('/api/students', {
                    method: 'POST',
                    body: JSON.stringify({
                        students,
                        call
                    })
                })
                let data = await studentsResponse.text()
                console.log(data)
                // e.target.reset()
                window.location.href = '/calls'
                setUploading(false)
            }
            catch (err) {
                setUploading(false)
                e.target.reset()
                throw new Error(`${err}`);
            }
        }
    };

    return (
        <div>
            {loading ? "loading..." :
                <div className="p-4">
                    <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                        <div className="p-6">
                            <Link href={`/notice/${currentList?.campaign}`} className="text-xs title-font font-bold text-gray-400 mb-1 uppercase">{"Notice Id: " + currentList?.campaign}</Link>
                            <h1 className="title-font text-lg font-medium text-gray-900">{currentList?.name}</h1>
                            <span className="text-blue-600 font-bold">{new Date(currentList?.addedAt)?.toString()}</span>
                        </div>
                        <div className="p-6 space-y-4">
                            <form className='space-y-4' onSubmit={handleUpload}>
                                <div className="form-group space-y-2">
                                    <label htmlFor="">Upload Contact Details</label>
                                    <input type="file" placeholder='Contact List Name' name='name' id='name' className="w-full border p-2" accept='text/csv' onChange={handleOnChange} />
                                </div>
                                <div className="form-group space-2">
                                    <input type="checkbox" name="call" id="call" />
                                    <label htmlFor="call">Call now</label>
                                </div>
                                <button className="inline-flex text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-sm" disabled={uploading}>
                                    {uploading ? "Processing" : "Submit"}
                                </button>
                            </form>
                        </div>
                    </div>

                </div>

            }</div>
    )
}
