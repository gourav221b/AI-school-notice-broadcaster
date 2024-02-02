import { NextResponse, NextRequest } from 'next/server'
import { callsConfig } from '@/config';

export async function GET(req: NextRequest) {
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
    return NextResponse.json(data);
}
