import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Container from '@/components/Container'
import Nav from '@/components/Nav'
import Sidebar from '@/components/Blog/Sidebar'
import BlogLabel from '@/components/Blog/BlogLabel'
import Tags from '@/components/Blog/Tags'
import Head from 'next/head'
import { randomColor, shortenStr } from '@/scripts/Helpers'
import Comments from '@/components/Blog/Comments'
import CommentForm from '@/components/Blog/CommentForm'
import { useGetPostQuery } from '@/redux/features/apiSlice'
import MarkdownPreview from '@/components/Blog/MarkdownPreview'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import ColoredSkeleton from '@/components/ColoredSkeleton'
import { MDEPreview } from '@/components/Blog/MDEditor'
import PostSearch from '@/components/Blog/PostSearch'
import { HomeOutlined, UserOutlined,TagOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';

export function getReadTime (str) {
    const words = str.replace(/\t/g, '').split(' ')
    const newWords = []
    words.forEach(word => {
        word !== '' ? newWords.push(word) : null
    })
    console.log(words)
    return Math.round(newWords.length / 150)
}

export function scrollToTop () {
    document.scrollingElement.scrollTo({ top: 0 })
}

const Blog = ({ match }) => {
    const router = useRouter()
    const id = router.query.id
    const postQuery = useGetPostQuery(id)
    const {
        data: blog = {},
        isLoading,
        isSuccess,
        isFetching,
        isError,
    } = postQuery
    const [createComment, setCreateComment] = useState(false)
    const [commentable, setCommentable] = useState('Post')
    const [commentableId, setCommentableId] = useState(id)
    const [results, setResults] = useState(false)
    const toggleCommentVisibility = value => {
        setCreateComment(value === undefined ? !createComment : value)
        value ? document.getElementById('comment').focus() : null
    }
    useEffect(() => {
        console.log(commentable, commentableId)
    }, [commentable, commentableId])

    const {
        title,
        body,
        date_modified,
        featured,
        comments,
        clappers_count,
        like_counter,
        tags,
        writer,
    } = blog

    return (
        <Container className='relative bg-transparent text-gray-800 text-justify'>
            <Head>
                <title>{!title ? `Blog: Post ${id}` : title}</title>
            </Head>
            <Nav type='default' />
            <div>
                <div className='grid grid-cols-4 bg-indigo-100 relative text-base'>
                    <div className='col-span-4 lg:col-span-3 border-r p-1'>
                        <Breadcrumb className='bg-indigo-50 py-1 px-10 md:px-16'>
                            <Breadcrumb.Item href='/'>
                                <HomeOutlined />
                            </Breadcrumb.Item>
                            <Breadcrumb.Item href='/blog'>
                                <TagOutlined />
                                <span>Blog</span>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>{title}</Breadcrumb.Item>
                        </Breadcrumb>
                        <PostSearch
                            searchbarBackground='bg-indigo-50 border-b-4 border-indigo-100'
                            results={results}
                            setResults={setResults}
                            className='bg-indigo-100'
                        />
                        {
                            <article
                                className={`${
                                    results === true ? 'hidden' : 'block'
                                } relative shadow space-y-4 py-10 md:py-6 bg-indigo-50 px-6 md:px-12`}>
                                <div className='space-y-4'>
                                    <h4 className='capitalize text-2xl lg:text-2xl text-center md:text-left text-gray-600 font-semibold leading-tight tracking-tight'>
                                        {isLoading ? (
                                            <span className='w-3/5'>
                                                <ColoredSkeleton height={35} />
                                            </span>
                                        ) : (
                                            shortenStr(title ?? '', 5)
                                        )}
                                        <div className='p-3 md:pb-0 inline w-full md:w-auto text-center md:text-right lowercase md:float-right absolute md:relative top-0 md:-top-2 right-4 md:right-0 w-full flex items-center'>
                                            {isLoading ? (
                                                <ColoredSkeleton />
                                            ) : (
                                                <BlogLabel
                                                    value={
                                                        getReadTime(body) +
                                                        ' minutes read'
                                                    }
                                                    mainColor={randomColor(40)}
                                                    color='text-teal-50 border bord border-teal-500 bg-teal-500 text-sm mx-auto'
                                                />
                                            )}
                                        </div>
                                    </h4>
                                    {isLoading ? (
                                        <ColoredSkeleton height={300} />
                                    ) : (
                                        <MarkdownPreview source={body} />
                                    )}
                                </div>
                                <div className='w-full py-3 border-b border-t flex-0 md:flex flex-rows md:flex-columns items-center gap-10'>
                                    {isLoading ? (
                                        <ColoredSkeleton height={40} />
                                    ) : (
                                        <Tags
                                            tags={tags}
                                            className='pb-4'
                                            inverted={true}
                                        />
                                    )}
                                    <div className='gap-6 flex'>
                                        <div
                                            className='grid gap-0 relative'
                                            onClick={() => {
                                                toggleCommentVisibility()
                                                setCommentable('Post')
                                                setCommentableId(id)
                                            }}>
                                            <div className='text-center flex-items-center z-0'>
                                                <i className='fas fa-comment text-4xl'></i>
                                            </div>
                                            <div
                                                className='absolute flex py-3 px-3 w-full h-full text-slate-100 text-xs hover:cursor-pointer'
                                                title='create new comment'>
                                                <i
                                                    className={`fas fa-${
                                                        createComment
                                                            ? null
                                                            : 'plus'
                                                    }`}></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {isLoading ? (
                                    <ColoredSkeleton height={80} />
                                ) : (
                                    <CommentForm
                                        postId={id}
                                        claps={clappers_count}
                                        likes={
                                            like_counter
                                                ? like_counter.count
                                                : 0
                                        }
                                    />
                                )}
                                <div className='md:pl-4 md:pr-0 py-4 text-base'>
                                    {id && <Comments PostID={id} />}
                                </div>
                            </article>
                        }
                    </div>
                    <Sidebar
                        className='col-span-4 lg:col-span-1 w-full lg:w-1/4 text-sm p-4 bg-indigo-50/90 lg:fixed lg:top-12 lg:right-0 h-full mt-1'
                        itemsBg='bg-indigo/100/40 shadow border-indigo-300'
                    />
                </div>
            </div>
            <button
                onClick={scrollToTop}
                className='bg-teal-600 shadow h-12 w-12 rounded-full fixed bottom-2 right-2 shadow shadow-xl hover:cursor-pointer focus:cursor-pointer border z-30'>
                <FontAwesomeIcon
                    className='text-teal-50 text-base'
                    icon={faArrowUp}
                />
            </button>
        </Container>
    )
}

export default Blog
