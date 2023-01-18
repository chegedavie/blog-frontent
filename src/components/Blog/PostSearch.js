import { useState, useEffect } from 'react'
//import Input from '../Input'
import { Icon, Input, AutoComplete } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Blog from './Blog'
import Links from './Links'
import { useSearchPublishedPostsQuery } from '@/redux/features/apiSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { DotLoader } from 'react-spinners'

export default props => {
    const { setResults, className, results, searchbarBackground } = props
    const [page, setPage] = useState(1)
    const [query, setQuery] = useState('')
    const [queried, setQueried] = useState(false)
    const [justFetched, setJustFetched] = useState(false)
    const [activeQuery, setActiveQuery] = useState('')
    const postsQuery = useSearchPublishedPostsQuery({ activeQuery, page })
    const { data, isError, isFetching, isLoading, isSuccess } = postsQuery
    const queryData = data
    const { links, last_page, data: blogs = [] } = queryData || []
    useEffect(() => {
        if (queried) {
            setJustFetched(true)
            activeQuery.length > 0 ? setResults(true) : null
        } else {
            setJustFetched(false)
            setResults(false)
        }
    }, [queried])
	
	function initiateSearch(){
                            setActiveQuery(query)
                            setQueried(true)
	}

    return (
        <main className={className}>
            <div className='grid gap-2 w-full'>
                <div className={`w-full p-4 items-center ${searchbarBackground?searchbarBackground:'bg-indigo-50'}`}>
                    <form
                        className='w-full md:w-1/2 mx-auto relative rounded-full text-base bg-none flex self-stretch'
                        onSubmit={e => {
                            e.preventDefault()
							initiateSearch()
                        }}>
                        <Input
                            type='search'
							placeholder='Search'
                            onChange={e => {
                                setQuery(e.target.value)
                                setQueried(false)
                            }}
							suffix={<SearchOutlined onClick={initiateSearch} className='text-xl text-gray-400 hover:text-gray-800 focus:text-gray-800'/>}
                            className='py-1 pl-6 rounded-2xl'
                        />
                    </form>
                    <div className='flex items-center'>
                        {activeQuery.length>0 && <div className={`${isFetching?'py-3':null} mx-auto`}>
                            <DotLoader
                                color={'silver'}
                                loading={isFetching}
                                aria-label='Loading spinner'
                            />
                        </div>}
                    </div>
                </div>
                {justFetched && (
                    <div>
                        {activeQuery.length > 0 &&
                        isFetching === false &&
                        results &&
                        blogs &&
                        blogs.length === 0 ? (
                            <div
                                className={`${
                                    results ? 'block' : 'hidden'
                                } bg-red-50 border border-red-200 text-red-600 font-semibold flex items-center h-48 rounded`}>
                                <div className='text-center w-full'>
                                    No results found
                                </div>
                            </div>
                        ) : null}
                        {blogs &&
                            activeQuery.length > 0 &&
                            blogs.length > 0 &&
                            results && (
                                <div className='grid gap-2'>
                                    <div className='w-full bg-green-50 text-green-600 p-4 text-lg'>
                                        <FontAwesomeIcon
                                            icon={faSearch}
                                            className='mr-4 text-xl'
                                        />
                                        Search results
                                    </div>
                                    {blogs.map((blog, index) => {
                                        return <Blog blog={blog} key={index} />
                                    })}
                                    {links && (
                                        <Links
                                            links={links}
                                            onClick={page => {
                                                setPage(page)
                                            }}
                                            currentPage={Number(page)}
                                            lastPage={Number(last_page)}
                                            className='hidden md:block bg-indigo-50 p-2 rounded'
                                        />
                                    )}
                                </div>
                            )}
                    </div>
                )}
            </div>
        </main>
    )
}
