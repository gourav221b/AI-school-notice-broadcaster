"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function ContactLists({ contactLists }: { contactLists: any }) {
    const [currentPage, setCurrentPage] = useState(1)
    const [allList, setAllList] = useState(contactLists)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        fetchNotices()
    }, [currentPage])
    async function fetchNotices() {
        try {
            setLoading(true)
            const list = await fetch(`/api/contact-lists?page=${currentPage}`, { method: "GET" })
            let data = await list.json()
            setLoading(false)
            setAllList(data)
        } catch (error) {
            setLoading(false)
            throw new Error(`${error}`)
        }

    }
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
            <div className='flex items-center mx-4 gap-4'>
                <button className={'border py-1 px-3 hover:bg-muted disabled:opacity-40 disabled:pointer-events-none'} disabled={allList?.currentPage == 1 || loading} onClick={() => setCurrentPage((prev) => prev - 1)} >&lt;</button>
                <button className={'border py-1 px-3 hover:bg-muted  disabled:opacity-40 disabled:pointer-events-none'} disabled={allList?.currentPage == allList?.totalPages || loading} onClick={() => setCurrentPage((prev) => prev + 1)}>&gt;</button>
            </div>
        </>
    )
}
