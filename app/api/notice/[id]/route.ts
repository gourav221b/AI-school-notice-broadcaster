import { NextResponse, NextRequest } from 'next/server'
import { noticeConfig } from '@/config';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const noticeId = params.id
    async function listNotice() {
        try {
            const data = await noticeConfig.campaignsGet({ id: Number(noticeId) })
            return data
        } catch (error) {
            
            throw new Error("error fetching notice")
        }
    }
    let data = await listNotice()
    return NextResponse.json(data);
}

