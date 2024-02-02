"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function ContactLists({ contactLists }: { contactLists: any }) {
    const [allList, setAllList] = useState(contactLists)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        async function fetchNotices() {
            try {
                setLoading(true)
                const list = await fetch('/api/contact-lists', { method: "GET" })
                let data = await list.json()
                setLoading(false)
                setAllList(data)
            } catch (error) {
                setLoading(false)
                throw new Error(`${error}`)
            }

        }
        fetchNotices()


    }, [])

    return (
        <>
            {loading && "loading..."}
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Type</th>
                    </tr>
                </thead>
                <tbody>
                    {allList?.results?.map((list: any) =>
                        <tr>
                            <td className='p-2'>{list?.id}</td>
                            <td className='p-2'>
                                <Link href={`/contactList/${list?.id}`} key={list?.id} className='underline'>{list?.name}</Link>
                            </td>
                            <td className='p-2'>{new Date(list?.addedAt)?.toDateString()}</td>
                        </tr>
                    )}
                </tbody>
            </table >
        </>
    )
}
