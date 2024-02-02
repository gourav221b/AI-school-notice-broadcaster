"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function Notice({ notices }: { notices: any }) {
  const [allNotice, setAllNotice] = useState(notices)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    async function fetchNotices() {
      try {
        setLoading(true)
        const notice = await fetch('/api/notice', { method: "GET" })
        let data = await notice.json()
        setLoading(false)
        setAllNotice(data)
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
    </>
  )
}
