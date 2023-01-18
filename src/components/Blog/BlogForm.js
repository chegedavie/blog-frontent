import MDEditor from '@/components/Blog/MDEditor'
import TagInput from '@/components/Blog/TagInput'
import ColoredSkeleton from '@/components/ColoredSkeleton'
import { useEffect, useState } from 'react'

export default (props)=>{
    const {post,onSubmit,isLoading,id,isSuccess}=props
    const { title, body, tags, keywords, description, featured } = post
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
    useEffect(() => {
        setTagsField(tags)
    }, [tags])
    return (
        <form
                onSubmit={e => {
                    e.preventDefault()
                    onSubmit({
                        id,
                        title: titleField,
                        body: bodyField,
                        keywords: keywordsField,
                        description: descriptionField,
                        featured: featuredField,
                    })
                }}
                className='p-4 space-y-4 bg-indigo-900 text-base'>
                <fieldset className=''>
                    <div className='flex-0 w-full'>
                        <label className='block' htmlFor='title'>
                            <span className='text-indigo-200 py-3 block'>
                                {isLoading ? (
                                    <ColoredSkeleton width={200} />
                                ) : (
                                    'Title'
                                )}
                            </span>
                            {isLoading ? (
                            <ColoredSkeleton height={30} />
                        ) : (
                            <input
                                type='text'
                                id='title'
                                onChange={e => setTitleField(e.target.value)}
                                defaultValue={titleField}
                                className='w-full outline-none rounded border-0 focus:border-0 focus:ring-0  text-slate-800 text-base'
                            />
                        )}
                        </label>
                    </div>
                    <div className='flex-0 w-full'>
                        <label className='block' htmlFor='featured'>
                            <span className='text-indigo-200 py-3 block'>
                                {isLoading ? <ColoredSkeleton width={200} /> : 'featured'}
                            </span>
                            {isLoading ? (
                            <ColoredSkeleton height={30} />
                        ) : (
                            <input
                                type='checkbox'
                                id='featured'
                                onChange={e => setFeaturedField(e.target.value)}
                                defaultValue={featuredField}
                                className='outline-none rounded border-0 focus:border-0 focus:ring-0  text-slate-800 text-base'
                            />
                        )}
                        </label>
                    </div>
                </fieldset>
                <fieldset>
                    <label htmlFor='description'>
                        <span className='text-indigo-200 py-3 block'>
                            {isLoading ? (
                                <ColoredSkeleton width={200} />
                            ) : (
                                'Description'
                            )}
                        </span>
                        {isLoading ? (
                        <ColoredSkeleton height={60} />
                    ) : (
                        <textarea
                            id='description'
                            maxLength={250}
                            onChange={e => setDescriptionField(e.target.value)}
                            defaultValue={descriptionField}
                            className='focus:outline-none rounded border-0 focus:border-0 focus:ring-0 w-full resize-auto text-slate-800 text-base'
                        />
                    )}
                    </label>
                </fieldset>
                <fieldset>
                    <label htmlFor='body'>
                        <span className='text-indigo-200 py-3 block'>
                            {isLoading ? (
                                <ColoredSkeleton width={200} />
                            ) : (
                                'Body'
                            )}
                        </span>
                        <MDEditor
                            height={500}
                            value={bodyField}
                            onChange={setBodyField}
                        />
                    </label>
                </fieldset>
                <fieldset>
                    <label htmlFor='keywords'>
                        <span className='text-indigo-200 py-3 block'>
                            {isLoading ? (
                                <ColoredSkeleton width={200} />
                            ) : (
                                'Keywords'
                            )}
                        </span>
                        {isLoading ? (
                        <ColoredSkeleton height={30} />
                    ) : (
                        <input
                            type='text'
                            id='keywords'
                            onChange={e => setKeywordsField(e.target.value)}
                            defaultValue={keywordsField}
                            className='outline-none rounded border-0 focus:border-0 focus:ring-0 w-full  text-slate-800 text-base'
                        />
                    )}
                    </label>
                </fieldset>
                <fieldset>
                    <label htmlFor='tags'>
                        <span className='text-indigo-200 py-3 block'>
                            {isLoading ? (
                                <ColoredSkeleton width={200} />
                            ) : (
                                'Tags'
                            )}
                        </span>
                        {isLoading ? (
                        <ColoredSkeleton height={100} />
                    ) : (
                        id && <TagInput
                            value={tagsField}
                            setTags={setTagsField}
                            blogId={id}
                        />
                    )}
                    </label>
                </fieldset>
                <fieldset>
                    <button
                        type='submit'
                        className='w-1/2 md:w-1/5 lg:w-1/6 border rounded py-1 px-2 text-indigo-800 bg-indigo-200 focus:bg-indigo-100'>
                        Update
                    </button>
                </fieldset>
            </form>
    )
}