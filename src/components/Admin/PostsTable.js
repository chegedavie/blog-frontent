import { useState } from 'react'
import { Table } from 'antd'
import {
    useDeletePostMutation,
    useEditUserPostsQuery,
} from '@/redux/features/apiSlice'
import {
    faDeleteLeft,
    faEdit,
    faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PublishedToggle from './publishedToggle'
import FeatureToggle from './featureToggle'
import { MDEPreview } from '@/components/Blog/MDEditor'
import Link from 'next/link'

export default () => {
    const [page, setPage] = useState(1)
    const [deletePost, { isLoading: isdeleting }] = useDeletePostMutation()
    const {
        data: postsQuery = [],
        isLoading,
        isSuccess,
    } = useEditUserPostsQuery(page)
    const { data } = postsQuery
    const columns = [
        { title: 'Title', dataIndex: 'title', key: 'title' },
        {
            title: 'Action',
            dataIndex: 'id',
            key: 'id',
            render: (_, record) => {
                const { id, featured, published } = record
                return (
                    <div className='flex gap-3'>
                        <Link href={`blog/${id}`} className='text-indigo-600'>
                            Edit{' '}
                            <FontAwesomeIcon
                                icon={faEdit}
                                className='block h-6 md:h-4 w-6'
                            />
                        </Link>
                        <button
                            onClick={e => {
                                deletePost(id)
                            }}
                            className='text-indigo-600'>
                            Delete{' '}
                            <FontAwesomeIcon
                                icon={faTrash}
                                className='block h-6 md:h-4 w-6'
                            />
                        </button>
                        <PublishedToggle id={id} value={featured} />
                        <FeatureToggle id={id} value={published} />
                    </div>
                )
            },
        },
    ]
    return (
        <Table
            columns={columns}
            dataSource={data}
        />
    )
}
