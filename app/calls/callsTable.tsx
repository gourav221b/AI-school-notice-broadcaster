"use client"
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function CallsTable({ data }: { data: any }) {
  const [currentPage, setCurrentPage] = useState(1)
  const [allCalls, setAllCalls] = useState(data)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    fetchCalls()
  }, [currentPage])
  async function fetchCalls() {
    try {
      setLoading(true)
      const calls = await fetch(`/api/calls?page=${currentPage}`, { method: "GET" })
      let data = await calls.json()
      console.log(data)
      setLoading(false)
      setAllCalls(data)
    } catch (error) {
      setLoading(false)
      throw new Error(`${error}`)
    }

  }
  return <>
    {loading && "loading..."}
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Notice #</th>
          <th>Dial Status</th>
          <th>Response Type</th>
          <th>Called At</th>
          {/* <th>Recording</th> */}
        </tr>
      </thead>
      <tbody>
        {allCalls?.results?.map((call: any) =>
          <tr>
            <td className='p-2'>{call?.id}</td>
            <td className='p-2'><Link href={`/notice/${call?.campaign}`} className="underline">{call?.campaign}</Link></td>
            <td className='p-2'>{call?.dialStatus}</td>
            <td className='p-2'>{call?.disposition}</td>
            <td className='p-2'>{new Date(call?.addedAt)?.toDateString()}</td>
            {/* <td className='p-2'></td> */}
            {/* <td className='p-2'>{call?.recordingPath ? <Link href={`${call?.recordingPath}`} className="underline" target="_blank">Recording</Link> : <span className="text-muted-foreground">Unavailable</span>}</td> */}
          </tr>
        )}
      </tbody>
    </table >
    <div className='flex items-center mx-4 gap-4'>
      <button className={'border py-1 px-3 hover:bg-muted disabled:opacity-40 disabled:pointer-events-none'} disabled={allCalls?.currentPage == 1 || loading} onClick={() => setCurrentPage((prev) => prev - 1)} >&lt;</button>
      <button className={'border py-1 px-3 hover:bg-muted  disabled:opacity-40 disabled:pointer-events-none'} disabled={allCalls?.currentPage == allCalls?.totalPages || loading} onClick={() => setCurrentPage((prev) => prev + 1)}>&gt;</button>
    </div>
  </>;
}
