import {
    useCreatePostMutation,
    useGetPostQuery,
} from '@/redux/features/apiSlice'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import ColoredSkeleton from '@/components/ColoredSkeleton'
//import AppLayout from '@/components/Layouts/AppLayout'
import MDEditor from '@/components/Blog/MDEditor'
import TagInput from '@/components/Blog/TagInput'
import ErrorsDiv from '@/components/Blog/ErrorsDiv'
import AdminLayout from '@/components/Admin/AdminLayout'
import Head from 'next/head'
import { SmileOutlined } from '@ant-design/icons'
import {
    Cascader,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Mentions,
    Select,
    TimePicker,
    TreeSelect,
    Alert,
    Space,
    Switch,
    Button,
} from 'antd'

const { Option } = Select
const { TextArea } = Input

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
    },
}

export default () => {
    const router = useRouter()
    const [errorsObject, setErrorsObject] = useState({})
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

    const submitPost = () => {
        //e.preventDefault()
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
    }
    return (
        <AdminLayout className='p-4'>
            <Head>
                <title>Admin: New Post</title>
            </Head>
            <Form
                onFinish={submitPost}
                className={`p-4 space-y-4 bg-indigo-50 text-base`}>
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
                            <Switch
                                checked={featuredField}
                                onChange={setFeaturedField}
                                checkedChildren='On'
                                unCheckedChildren='Off'
                                className='bg-neutral-300 text-neutral-50'
                            />
                        )}
                    </label>
                </div>

                <div className='flex-0 w-full'>
                    <label
                        className='block flex-rows space-y-4'
                        htmlFor='title'>
                        <span className='text-slate-800 py-3'>
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
                            <Form.Item
                                name='title'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input the title!',
                                    },
                                ]}>
                                <Input
                                    style={{ width: '100%' }}
                                    onChange={e =>
                                        setTitleField(e.target.value)
                                    }
                                    defaultValue={titleField}
                                    className={`w-full outline-none rounded border-0 focus:border-0 focus:ring-0 ${title} text-base`}
                                />
                            </Form.Item>
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
                        <Form.Item
                            name='description'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input the description!',
                                },
                            ]}>
                            <TextArea
                                id='description'
                                maxLength={250}
                                onChange={e =>
                                    setDescriptionField(e.target.value)
                                }
                                defaultValue={descriptionField}
                                className={`focus:outline-none rounded border-0 focus:border-0 focus:ring-0 w-full resize-auto ${description} text-base`}
                            />
                        </Form.Item>
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
                        <Form.Item
                            name='keywords'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input the keyword(s)!',
                                },
                            ]}>
                            <Input
                                allowClear
                                id='keywords'
                                onChange={e => setKeywordsField(e.target.value)}
                                defaultValue={keywordsField}
                                className={`outline-none rounded border-0 focus:border-0 focus:ring-0 w-full ${keywords} text-base`}
                            />
                        </Form.Item>
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
                    {id ? (
                        <button
                            type='button'
                            className='w-1/2 md:w-1/5 lg:w-1/6 border rounded py-1 px-2 text-indigo-900 hover:text-indigo-100 focus:text-indigo-100 border-indigo-900 hover:border-indigo-100 focus:border-indigo-100 bg-indigo-100 hover:bg-indigo-900 focus:bg-indigo-900'
                            onClick={e => {
                                e.preventDefault()
                                router.push(`/admin/blog/${id}`)
                            }}>
                            Go to Post
                        </button>
                    ) : (
                        <Button
                            type='primary'
                            htmlType='submit'
                            className='text-slate-900'>
                            Create Post
                        </Button>
                    )}
                </div>
            </Form>
            <Space>
                {isSuccess && (
                    <Alert
                        message='Succesfull'
                        description='You have succesfully created the post.'
                        type='success'
                        showIcon
                    />
                )}
            </Space>
        </AdminLayout>
    )
}
