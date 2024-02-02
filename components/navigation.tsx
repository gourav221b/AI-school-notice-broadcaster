import Link from 'next/link'
import React from 'react'

export default function Navigation() {
    return (
        <div className='flex items-center gap-4'>
            <Link href={"/notice"}>Notice</Link>
            <Link href={"/contactList"}>Contact Lists</Link>
            <Link href={"/calls"}>Calls</Link>

        </div>
    )
}
