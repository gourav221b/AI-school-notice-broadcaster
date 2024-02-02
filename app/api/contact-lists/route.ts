import { NextResponse, NextRequest } from 'next/server'
import { contactsConfig } from '@/config';

export async function GET(req: NextRequest) {
    try {
        const page= req.nextUrl.searchParams
        let contacts = await contactsConfig.listsList()        
        return NextResponse.json(contacts);
    } catch (error) {
        console.log(error)
        throw new Error(`Error creating contact list`)
    }
}



export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        console.log(data);
        let contacts = await contactsConfig.listsPost({ listsRequest:data })
        console.log(contacts);
        return NextResponse.json(contacts);
    } catch (error) {
        console.log(error)
        throw new Error(`Error creating contact list`)
    }
}

