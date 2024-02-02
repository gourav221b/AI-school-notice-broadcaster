import { NextResponse, NextRequest } from 'next/server'
import { contactsConfig } from '@/config';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const contactId = params.id
    async function listNotice() {
        try {
            const data = await contactsConfig.listsGet({ id: Number(contactId) })
            return data
        } catch (error) {
            
            throw new Error("error fetching notice")
        }
    }
    let data = await listNotice()
    return NextResponse.json(data);
}

