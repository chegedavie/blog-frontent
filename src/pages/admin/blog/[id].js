import { useEditPostMutation, useGetPostQuery } from '@/redux/features/apiSlice'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import ColoredSkeleton from '@/components/ColoredSkeleton'
//import AppLayout from '@/components/Layouts/AppLayout'
import MDEditor from '@/components/Blog/MDEditor'
import TagInput from '@/components/Blog/TagInput'
import ErrorsDiv from '@/components/Blog/ErrorsDiv'
import AdminLayout from '@/components/Admin/AdminLayout'
import Head from 'next/head'
import { Alert, Space } from 'antd'

export default () => {
    const router = useRouter()
    const [errorsObject, setErrorsObject] = useState(false)
    const id = router.query.id
    const postQuery = useGetPostQuery(id)
    const {
        data: post = {},
        isLoading,
        isSuccess,
        isFetching,
        isError,
    } = postQuery
    const { title, body, tags, keywords, description, featured } = post
    const [
        updatePost,
        { isLoading: isUpdating, isSuccess: hasUpdated },
    ] = useEditPostMutation()

    const [titleField, setTitleField] = useState(title)
    const [bodyField, setBodyField] = useState(body)
    const [keywordsField, setKeywordsField] = useState(keywords)
    const [descriptionField, setDescriptionField] = useState(description)
    const [featuredField, setFeaturedField] = useState(featured)
    const [tagsField, setTagsField] = useState(tags)

    useEffect(() => {
        setTitleField(title)
        setBodyField(body)
        setKeywordsField(keywords)
        setDescriptionField(description)
        setFeaturedField(featured)
        setTagsField(tags)
    }, [post])

    const {
        title: titleErrors,
        description: descriptionErrors,
        keywords: keywordsErrors,
        body: bodyErrors,
        featured: featuredErrors,
    } = errorsObject

    useEffect(() => {
        setTagsField(tags)
    }, [tags])
    return (
        <AdminLayout className='p-4'>
            <Head>
                <title>Admin: Edit {title ? title : 'post'}</title>
            </Head>
            <form
                onSubmit={e => {
                    e.preventDefault()
                    updatePost({
                        id,
                        title: titleField,
                        body: bodyField,
                        keywords: keywordsField,
                        description: descriptionField,
                        featured: featuredField,
                    })
                        .unwrap()
                        .then(resp => {
                            setErrorsObject([])
                        })
                        .catch(resp => {
                            console.log(resp)
                        })
                }}
                className='p-4 space-y-4 bg-white text-base'>
                <div className='flex-0 w-full'>
                    <label
                        className='flex gap-4 items-center'
                        htmlFor='featured'>
                        <span className='text-slate-800'>
                            {isLoading ? (
                                <ColoredSkeleton width={200} />
                            ) : (
                                'Featured'
                            )}
                        </span>
                        {isLoading ? (
                            <ColoredSkeleton height={30} />
                        ) : (
                            <input
                                type='checkbox'
                                id='featured'
                                onChange={e =>
                                    setFeaturedField(e.target.checked)
                                }
                                defaultChecked={featuredField}
                                className={`outline-none rounded border border-slate-600 focus:ring-0 ${featured} text-base`}
                            />
                        )}
                    </label>
                </div>
                <div className='flex-0 w-full'>
                    <label
                        className='block flex-rows space-y-4'
                        htmlFor='title'>
                        <span className='text-indigo-200 py-3'>
                            {isLoading ? (
                                <ColoredSkeleton width={200} />
                            ) : (
                                'Title'
                            )}
                        </span>
                        <ErrorsDiv errors={titleErrors} />
                        {isLoading ? (
                            <ColoredSkeleton height={30} />
                        ) : (
                            <input
                                type='text'
                                id='title'
                                onChange={e => setTitleField(e.target.value)}
                                defaultValue={titleField}
                                className={`w-full outline-none rounded border border-slate-600 focus:ring-0 ${title} text-base`}
                            />
                        )}
                    </label>
                </div>

                <label
                    className='block flex-rows space-y-4'
                    htmlFor='description'>
                    <span className='text-slate-800'>
                        {isLoading ? (
                            <ColoredSkeleton width={200} />
                        ) : (
                            'Description'
                        )}
                    </span>
                    <ErrorsDiv errors={descriptionErrors} />
                    {isLoading ? (
                        <ColoredSkeleton height={60} />
                    ) : (
                        <textarea
                            id='description'
                            maxLength={250}
                            onChange={e => setDescriptionField(e.target.value)}
                            defaultValue={descriptionField}
                            className={`focus:outline-none rounded border border-slate-600 focus:ring-0 w-full resize-auto ${description} text-base`}
                        />
                    )}
                </label>

                <label className='block flex-rows space-y-4' htmlFor='body'>
                    <span className='text-slate-800'>
                        {isLoading ? <ColoredSkeleton width={200} /> : 'Body'}
                    </span>
                    <ErrorsDiv errors={bodyErrors} />
                    <MDEditor
                        height={500}
                        value={bodyField}
                        onChange={setBodyField}
                        preview='edit'
                    />
                </label>

                <label className='block flex-rows space-y-4' htmlFor='keywords'>
                    <span className='text-slate-800'>
                        {isLoading ? (
                            <ColoredSkeleton width={200} />
                        ) : (
                            'Keywords'
                        )}
                    </span>
                    <ErrorsDiv errors={keywordsErrors} />
                    {isLoading ? (
                        <ColoredSkeleton height={30} />
                    ) : (
                        <input
                            type='text'
                            id='keywords'
                            onChange={e => setKeywordsField(e.target.value)}
                            defaultValue={keywordsField}
                            className={`outline-none rounded border border-slate-600 focus:ring-0 w-full ${keywords} text-base`}
                        />
                    )}
                </label>

                {id && (
                    <label className='block flex-rows space-y-4' htmlFor='tags'>
                        <span className='text-slate-800'>
                            {isLoading ? (
                                <ColoredSkeleton width={200} />
                            ) : (
                                'Tags'
                            )}
                        </span>
                        {isLoading ? (
                            <ColoredSkeleton height={100} />
                        ) : (
                            <TagInput
                                value={tagsField}
                                setTags={setTagsField}
                                blogId={id}
                            />
                        )}
                    </label>
                )}
                <div className='pt-6'>
                    <button
                        type='submit'
                        className='w-1/2 md:w-1/5 lg:w-1/6 border rounded py-1 px-2 text-indigo-900 hover:text-indigo-100 focus:text-indigo-100 border-indigo-900 hover:border-indigo-100 focus:border-indigo-100 bg-indigo-100 hover:bg-indigo-900 focus:bg-indigo-900'>
                        Update post
                    </button>
                </div>
            </form>
            <Space>
                {hasUpdated && (
                    <Alert
                        message='Update Succesfull'
                        description='You have succesfully updated the post.'
                        type='success'
                        showIcon
                    />
                )}
            </Space>
        </AdminLayout>
    )
}
