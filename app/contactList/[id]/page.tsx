import React from 'react'
import ContactCreate from './contactCreate'
import { contactsConfig } from '@/config'
export default function Page({ params }: { params: any }) {
    const { id } = params

    return (
        <ContactCreate contactListId={id} />
    )
}
