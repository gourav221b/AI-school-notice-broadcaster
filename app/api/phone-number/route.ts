import { NextResponse, NextRequest } from 'next/server'
import { phoneNumbersConfig } from '@/config';

export async function GET(req: NextRequest) {
    async function listPhoneNumbers() {
        try {
            const phoneNumbers = await phoneNumbersConfig.phoneNumbersList()
            return phoneNumbers
        } catch (error) {
            console.error("Error fetching campaigns:", error);
            throw new Error("error fetching campaigns")
        }
    }
    let data = await listPhoneNumbers()
    return NextResponse.json(data);
}
