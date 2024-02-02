"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function Notice({ notices }: { notices: any }) {
  const [currentPage, setCurrentPage] = useState(1)
  const [allNotice, setAllNotice] = useState(notices)
  const [loading, setLoading] = useState(false)
  async function fetchNotices() {
    try {
      setLoading(true)
      const notice = await fetch(`/api/notice?page=${currentPage}`, { method: "GET" })
      let data = await notice.json()
      setLoading(false)
      setAllNotice(data)
    } catch (error) {
      setLoading(false)
      throw new Error(`${error}`)
    }

  }
  useEffect(() => {

    fetchNotices()


  }, [currentPage])

  return (
    <>
      {loading && <span className='mx-4'>loading...</span>}
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {allNotice?.results?.map((campaign: any) =>
            <tr>
              <td className='p-2'>{campaign?.id}</td>
              <td className='p-2'>
                <Link href={`/notice/${campaign?.id}`} key={campaign?.id} className='underline'>{campaign?.name}</Link>
              </td>
              <td className='p-2'>{campaign?.type}</td>
            </tr>
          )}
        </tbody>
      </table >
      <div className='flex items-center mx-4 gap-4'>
        <button className={'border py-1 px-3 hover:bg-muted disabled:opacity-40 disabled:pointer-events-none'} disabled={allNotice?.currentPage == 1 || loading} onClick={() => setCurrentPage((prev) => prev - 1)} >&lt;</button>
        <button className={'border py-1 px-3 hover:bg-muted  disabled:opacity-40 disabled:pointer-events-none'} disabled={allNotice?.currentPage == allNotice?.totalPages || loading} onClick={() => setCurrentPage((prev) => prev + 1)}>&gt;</button>
      </div>
    </>
  )
}
