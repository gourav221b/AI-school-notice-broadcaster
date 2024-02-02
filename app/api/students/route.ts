import { NextResponse, NextRequest } from 'next/server'
import { contactConfig } from '@/config';

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        let res=await contactConfig.subscribersPost({subscriberRequest:data.students,call:data.call})        
        console.log(res)
        return NextResponse.json(res);
    } catch (error) {
        console.log(error)
        throw new Error(`${error}`)
    }
}

