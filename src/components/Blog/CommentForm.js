import React, { useState, useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-regular-svg-icons'
import {
    useAddCommentMutation,
    useUpvotePostMutation,
    useDownvotePostMutation,
    useAddClapToPostMutation,
} from '@/redux/features/apiSlice'

import {
    faUserCircle,
    faHandsClapping,
} from '@fortawesome/free-solid-svg-icons'

export default props => {
    const { postId,claps,likes } = props
    const [AddComment, {isLoading:creatingComment}] = useAddCommentMutation()
    const [likePost, {}] = useUpvotePostMutation()
    const [unlikePost, {}] = useDownvotePostMutation()
    const [clapToPost, {}] = useAddClapToPostMutation()
    const [commentText, setCommentText] = useState('')
    const [replying, setReplying] = useState(false)
    const [comment, setComment] = useState('')
    const level=0
    return (
        <div className='w-full flex gap-4 transition transition-all duration-1000 ease-in-out border-b pb-6'>
            
            <div className='text-gray-700 tracking-tight w-full'>
                <div className='flex gap-3 items-end'>
                    <div className='h-full text-sm font-semibold text-gray-800'>
                        {name}
                    </div>
                </div>
                <div>{comment.body}</div>
                <div className='flex gap-7 items-center text-xl text-gray-600'>
                    <div>
                        <button
                            onClick={e => {
                                likePost({id:postId})
                            }}>
                            <FontAwesomeIcon icon={faThumbsUp} />
                        </button>
                        <span className='text-gray-500 text-sm pl-4'>{likes}</span>
                    </div>
                    <div>
                        <button
                            onClick={e => {
                                unlikePost({id:postId})
                            }}>
                            <FontAwesomeIcon icon={faThumbsDown} />
                        </button>
                    </div>
                    <div>
                        <button
                            onClick={e => {
                                clapToPost({id:postId})
                            }}>
                            <FontAwesomeIcon icon={faHandsClapping} />
                        </button>
                        <span className='text-gray-500 text-sm pl-4'>{claps}</span>
                    </div>
                    <button
                        className='text-gray-700 text-sm font-medium'
                        onClick={() => {
                            if (level < 4) setReplying(true)
                        }}>
                        Comment
                    </button>
                </div>
                <form
                    onSubmit={e => {
                        e.preventDefault()
                        const post = {
                            body: commentText,
                            user_id: 1,
                            commentable_type: 'App\\Models\\Blog',
                            commentable_id: postId,
                        }
                        AddComment(post)
                        setCommentText('')
                        setReplying(false)
                        document.forms.namedItem('commentBlog').reset()
                    }}
                    className={`${
                        replying ? 'block' : 'hidden'
                    } space-y-3 w-full`}
                    name='commentBlog'>
                    <input
                        type='text'
                        onChange={e => setCommentText(e.target.value)}
                        className='w-full bg-transparent border-0 border-b ring-0 py-1 px-0 outline-none focus:ring-0 placeholder-gray-400 border-gray-400 focus:border-gray-400'
                        placeholder='Add a comment...'
                    />
                    <div>
                        <div className='flex gap-4 float-right'>
                            <button
                                type='button'
                                onClick={() => setReplying(false)}
                                className='text-gray-900 py-1 px-4 text-sm font-semibold'>
                                Cancel
                            </button>
                            <button
                                type='submit'
                                className='text-gray-600 bg-gray-300 font-medium focus:text-slate-900 py-2 px-4 text-sm rounded-full'>
                                Comment
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
