import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { useState } from 'react'
import { useGetPostsQuery } from '@/redux/features/apiSlice'
import Links from '@/components/Blog/Links'
import ColoredSkeleton from '@/components/ColoredSkeleton'
import Excerpts from '@/components/Blog/Excerpts'

const Dashboard = () => {
    return (
        <AppLayout
            header={
                <h2 className='font-semibold text-xl text-gray-800 leading-tight px-4'>
                    Blogs
                </h2>
            }>
            <Head>
                <title>David Chege: Blog</title>
            </Head>

            <div className={`py-12 px-2 bg-indigo-50/80`}>
                <h1 className='pb-6 font-medium text-2xl text-gray-800'>
                    {isLoading ? (
                        <ColoredSkeleton width={400} height={40} />
                    ) : (
                        'Posts'
                    )}
                </h1>
                <div>
                    {isSuccess && <Excerpts posts={posts} />}
                    {isLoading && <PostSkeleton count={24} />}
                </div>
                <div className='pt-6'>
                    {!links ? (
                        <ColoredSkeleton height={40}/>
                    ) : (
                        <Links
                            links={links}
                            onClick={page => {
                                setPage(page)
                            }}
                            currentPage={Number(page)}
                            lastPage={Number(last_page)}
                        />
                    )}
                </div>
            </div>
        </AppLayout>
    )
}

const PostSkeleton = ({ count, className }) => {
    const arr = new Array(count)
    for (let i = 0; count > i; i++) {
        arr[i] = i
    }
    return (
        <div className='grid grid-cols-6 gap-4'>
            {arr.map((item, index) => {
                return (
                    <div
                        className='relative col-span-6 md:col-span-3 lg:col-span-2 rounded excerpt'
                        key={index}>
                        <div href='#'>
                            <article
                                className={`relative bg-indigo-50 border border-indigo-50 shadow rounded text-gray-800 space-y-4 py-6 transition transition-colors duration-300 ease-in-out`}>
                                <div className='px-4 flex items-end gap-6'>
                                    <ColoredSkeleton
                                        inline={true}
                                        height={50}
                                        width={50}
                                        circle={true}
                                    />
                                    <ColoredSkeleton width={200} />
                                </div>
                                <h2 className='text-lg font-semibold px-4'>
                                    <ColoredSkeleton height={28} />
                                </h2>
                                <p className='text-base px-4'>
                                    <ColoredSkeleton count={8} />
                                </p>
                            </article>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Dashboard
