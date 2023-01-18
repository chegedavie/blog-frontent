import {
    useCreatePostMutation,
    useGetPostQuery,
} from '@/redux/features/apiSlice'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import ColoredSkeleton from '@/components/ColoredSkeleton'
import AppLayout from '@/components/Layouts/AppLayout'
import MDEditor from '@/components/Blog/MDEditor'
import TagInput from '@/components/Blog/TagInput'
import ErrorsDiv from '@/components/Blog/ErrorsDiv'

export default () => {
    const router = useRouter()
    const [errorsObject, setErrorsObject] = useState(false)
    const [id, setId] = useState(null)
    const title = '',
        body = '',
        tags = [],
        keywords = '',
        description = '',
        featured = false
    const post = {}
    const [
        createPost,
        { isLoading, isSuccess, isError, isUninitialized },
    ] = useCreatePostMutation()

    const [titleField, setTitleField] = useState(title)
    const [bodyField, setBodyField] = useState(body)
    const [keywordsField, setKeywordsField] = useState(keywords)
    const [descriptionField, setDescriptionField] = useState(description)
    const [featuredField, setFeaturedField] = useState(featured)
    const [tagsField, setTagsField] = useState(tags)
    const {
        title: titleErrors,
        description: descriptionErrors,
        keywords: keywordsErrors,
        body: bodyErrors,
        featured: featuredErrors,
    } = errorsObject
    useEffect(() => {
        setTagsField(tags)
    }, [id])
    return (
        <AppLayout>
            <form
                onSubmit={e => {
                    e.preventDefault()
                    try {
                        createPost({
                            id,
                            title: titleField,
                            body: bodyField,
                            keywords: keywordsField,
                            description: descriptionField,
                            featured: featuredField,
                            published: false,
                        })
                            .unwrap()
                            .then(resp => {
                                setId(resp.id)
                                setErrorsObject([])
                            })
                            .catch(resp => {
                                setErrorsObject(resp.data.errors)
                            })
                    } catch (err) {
                        console.error(err)
                    }
                }}
                className={`p-4 space-y-4 bg-indigo-900 text-base`}
                >
                <div className='flex-0 w-full'>
                    <label
                        className='flex gap-4 items-center'
                        htmlFor='featured'>
                        <span className='text-indigo-200'>
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
                                className={`outline-none rounded border-0 focus:border-0 focus:ring-0 ${featured} text-base`}
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
                                className={`w-full outline-none rounded border-0 focus:border-0 focus:ring-0 ${title} text-base`}
                            />
                        )}
                    </label>
                </div>

                <label
                    className='block flex-rows space-y-4'
                    htmlFor='description'>
                    <span className='text-indigo-200'>
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
                            className={`focus:outline-none rounded border-0 focus:border-0 focus:ring-0 w-full resize-auto ${description} text-base`}
                        />
                    )}
                </label>

                <label className='block flex-rows space-y-4' htmlFor='body'>
                    <span className='text-indigo-200'>
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
                    <span className='text-indigo-200'>
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
                            className={`outline-none rounded border-0 focus:border-0 focus:ring-0 w-full ${keywords} text-base`}
                        />
                    )}
                </label>

                {id && (
                    <label className='block flex-rows space-y-4' htmlFor='tags'>
                        <span className='text-indigo-200'>
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
                    {id ? (
                        <button
                            type='button'
                            className='w-1/2 md:w-1/5 lg:w-1/6 border rounded py-1 px-2 text-indigo-900 hover:text-indigo-100 focus:text-indigo-100 border-indigo-900 hover:border-indigo-100 focus:border-indigo-100 bg-indigo-100 hover:bg-indigo-900 focus:bg-indigo-900'
                            onClick={e => {
                                e.preventDefault()
                                router.push(`/blog/edit/${id}`)
                            }}>
                            Go to Post
                        </button>
                    ) : (
                        <button
                            type='submit'
                            className='w-1/2 md:w-1/5 lg:w-1/6 border rounded py-1 px-2 text-indigo-900 hover:text-indigo-100 focus:text-indigo-100 border-indigo-900 hover:border-indigo-100 focus:border-indigo-100 bg-indigo-100 hover:bg-indigo-900 focus:bg-indigo-900'>
                            Save
                        </button>
                    )}
                </div>
            </form>
        </AppLayout>
    )
}
