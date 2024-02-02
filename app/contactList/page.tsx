import { contactsConfig } from '@/config';
import React from 'react'
import ContactLists from './contactLists';

export default async function Page() {

    async function listContactLists() {
        try {
            let data = await contactsConfig.listsList()
            return data

        } catch (error) {
            console.log(error)
            throw new Error(`Error creating contact list`)
        }
    }
    let contacts = await listContactLists()
    return (
        <ContactLists contactLists={contacts} />
    )
}
