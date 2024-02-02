
import NoticeDetail from './notice-detail';


export default async function Page({ params }: any) {
    const { noticeId } = params;
    return (
        <NoticeDetail noticeId={noticeId} />
    )
}

