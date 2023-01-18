//import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import PostsTable from '@/components/Admin/PostsTable'
import AdminLayout from '@/components/Admin/AdminLayout'
export default () => {
    return (
        <AdminLayout className='p-4'>
            <Head>
                <title>Admin: Manage Blog</title>
            </Head>
            <div>
                <PostsTable/>
            </div>
        </AdminLayout>
    )
}

