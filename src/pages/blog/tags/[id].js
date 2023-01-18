import Nav from '@/components/Nav'
import Container from '@/components/Container'
import Head from 'next/head'
import Layout from '@/components/Layout'
import Hero from '@/components/Blog/Hero'
import BlogMain from '@/components/Blog/BlogMain'
import Sidebar from '@/components/Blog/Sidebar'
import Links from '@/components/Blog/Links'
import { useGetTagPostsQuery } from '@/redux/features/apiSlice'
import { useEffect, useState } from 'react'
import PostSearch from '@/components/Blog/PostSearch'
import ExcerptSkeleton from '@/components/Blog/ExcerptSkeleton'
import { useRouter } from 'next/router'

const Blog = () => {
    const router = useRouter()
    const id = router.query.id
    const [page, setPage] = useState(1)
    const [results, setResults] = useState(false)
    const postsQuery = useGetTagPostsQuery({ id, page })
    const { data, isError, isFetching, isLoading, isSuccess } = postsQuery
    const queryData = data
    const { links, last_page, data: blogs = [] } = queryData || []
    return (
        <Container>
            <Head>
                <title>Blog: David Chege</title>
            </Head>
            <Nav type='default' />
            <Layout>
                <div
                    className='grid grid-cols-4 bg-indigo-100 relative text-base'
                    id='excerptsCloud'>
                    <div className='col-span-4 lg:col-span-3 grid gap-2 border-r p-2'>
                        <PostSearch results={results} setResults={setResults} />
                        {isLoading ? (
                            <ExcerptSkeleton count={24} />
                        ) : (
                            <BlogMain
                                blogs={blogs}
                                setPage={setPage}
                                page={page}
                                last_page={last_page}
                                links={links}
                                className={`${
                                    results === true ? 'hidden' : 'block'
                                }`}
                            />
                        )}
                    </div>
                    <Sidebar
                        blogs={blogs}
                        className='col-span-4 lg:col-span-1 w-full lg:w-1/4 text-sm p-4 bg-indigo-50/90 lg:fixed lg:top-12 lg:right-0 h-full mt-1'
                        itemsBg='bg-indigo/100/40 shadow border-indigo-300'
                    />
                    {isLoading ? null : (
                        <Links
                            links={links}
                            onClick={page => {
                                setPage(page)
                            }}
                            currentPage={Number(page)}
                            lastPage={Number(last_page)}
                            className='md:hidden pt-4 px-4 pb-6'
                        />
                    )}
                </div>
            </Layout>
        </Container>
    )
}

export default Blog
