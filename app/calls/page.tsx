import { callsConfig } from '@/config';
import React from 'react'
import CallsTable from './callsTable';

export default async function Page() {
    async function listCalls() {
        try {
            const data = await callsConfig.callsListOutbound()
            return data
        } catch (error) {
            console.error("Error fetching calls:", error);
            throw new Error("error fetching calls")
        }
    }
    let data = await listCalls()
    return (
        <CallsTable data={data} />
    )
}
