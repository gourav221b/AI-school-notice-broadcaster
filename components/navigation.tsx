"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function Navigation() {
    const pathName = usePathname()
    const isActive = (url: string) => {
        if (pathName.startsWith(url) && url !== "/")
            return true
        else if (pathName == url)
            return true

        return false
    }
    const paths = [
        {
            id: 0,
            name: "Home",
            path: '/'
        },
        {
            id: 1,
            name: "Notice",
            path: '/notice'
        }, {
            id: 2,
            name: "Contact Lists",
            path: "/contactList"
        },
        {
            id: 3,
            name: "Calls",
            path: "/calls"
        }
    ]
    return (
        <div className='flex items-center gap-4'>
            {paths?.map(path => <Link href={path?.path} key={path?.id} className={isActive(path?.path) ? "font-bold" : ""}>{path?.name}</Link>)}

        </div>
    )
}
