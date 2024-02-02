import { NextResponse, NextRequest } from 'next/server'
import { noticeConfig } from '@/config';

export async function GET(req: NextRequest) {
    async function listNotice() {
        try {
            const data = await noticeConfig.campaignsList()
            return data
        } catch (error) {
            console.error("Error fetching campaigns:", error);
            throw new Error("error fetching campaigns")
        }
    }
    let data = await listNotice()
    return NextResponse.json(data);
}


export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        let notice=await noticeConfig.campaignsPost({campaignRequest:data})        
        return NextResponse.json(notice);
    } catch (error) {
        console.log(error)
        throw new Error(`Error creating campaign`)
    }
}

