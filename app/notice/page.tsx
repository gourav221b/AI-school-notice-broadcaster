import Link from 'next/link';
import Notice from './notice'
import { noticeConfig } from '@/config';

export default async function Page() {
    async function listNotices() {
        try {
            const data = await noticeConfig.campaignsList({ page: 1 })
            return data
        } catch (error) {
            console.error("Error fetching campaigns:", error);
            throw new Error("error fetching campaigns")
        }
    }
    let notices = await listNotices()

    return (
        <div className='space-y-4'>
            <Link href={"/notice/new"}>
                <button className="inline-flex text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-md">
                    Create new
                </button>
            </Link>
            <Notice notices={notices} />

        </div>
    )
}

