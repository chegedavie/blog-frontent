import React, { useState, useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-regular-svg-icons'
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import {
    useGetPostCommentsQuery,
    useAddCommentMutation,
    useUpvoteCommentMutation,
    useDownvoteCommentMutation,
    useAddClapToCommentMutation,
} from '@/redux/features/apiSlice'

import {
    faUserCircle,
    faHandsClapping,
} from '@fortawesome/free-solid-svg-icons'
import ColoredSkeleton from '../ColoredSkeleton'

function Comment ({ comment, PostID }) {
    const [AddComment, { isLoading: creatingReply }] = useAddCommentMutation()
    const [likeComment, {}] = useUpvoteCommentMutation()
    const [unlikeComment, {}] = useDownvoteCommentMutation()
    const [clapToComment, {}] = useAddClapToCommentMutation()
    const { comments, user, id, clappers_count, like_counter,level } = comment
    let { name } = user ? user : { name: 'Guest' }
    const [commentText, setCommentText] = useState('')
    const [replying, setReplying] = useState(false)
    const [showReplies, setShowReplies] = useState(false)
    const [showRepliesText, setShowRepliesText] = useState('Show replies')
    const [caretIcon, setCaretIcon] = useState(faCaretDown)
    const nestedComments = ((showReplies && comment.comments) || []).map(
        comment => {
            return (
                <div className='pt-4' key={comment.id}>
                    <Comment comment={comment} type='child' PostID={PostID} />
                </div>
            )
        },
    )

    useEffect(() => {
        let textNoun
        if (comments.length > 1) textNoun = 'replies'
        else if (comments.length === 1) textNoun = 'reply'
        if (showReplies) {
            setShowRepliesText(`${textNoun}`)
            setCaretIcon(faCaretUp)
        } else {
            setShowRepliesText(`${textNoun}`)
            setCaretIcon(faCaretDown)
        }
    }, [showReplies, comment])

    return (
        <div className='w-full flex gap-2 md:gap-4 transition transition-all duration-1000 ease-in-out'>
            <div>
                <FontAwesomeIcon
                    icon={faUserCircle}
                    className='text-3xl md:text-4xl text-gray-300'
                />
            </div>
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
                                likeComment({ id, PostID })
                            }}>
                            <FontAwesomeIcon icon={faThumbsUp} />
                        </button>
                        <span className='text-gray-500 text-sm pl-4'>
                            {like_counter ? like_counter.count : 0}
                        </span>
                    </div>
                    <div>
                        <button
                            onClick={e => {
                                unlikeComment({ id, PostID })
                            }}>
                            <FontAwesomeIcon icon={faThumbsDown} />
                        </button>
                    </div>
                    <div>
                        <button
                            onClick={e => {
                                clapToComment({ id, PostID })
                            }}>
                            <FontAwesomeIcon icon={faHandsClapping} />
                        </button>
                        <span className='text-gray-500 text-sm pl-4'>
                            {clappers_count}
                        </span>
                    </div>
                    {level < 3 && <button
                        className='text-gray-700 text-sm font-medium'
                        onClick={() => {
                            setReplying(true)
                        }}>
                        Reply
                    </button>}
                </div>
                <form
                    onSubmit={e => {
                        e.preventDefault()
                        const post = {
                            body: commentText,
                            user_id: 1,
                            commentable_type: 'App\\Models\\Comment',
                            commentable_id: comment.id,
level:(comment.level+1),
                        }
                        AddComment(post)
                        setCommentText('')
                        setReplying(false)
                        document.forms.namedItem('replyComment').reset()
                    }}
                    className={`${
                        replying ? 'block' : 'hidden'
                    } space-y-3 w-full`}
                    name='replyComment'>
                    <input
                        type='text'
                        onChange={e => setCommentText(e.target.value)}
                        className='w-full bg-transparent border-0 border-b ring-0 py-1 px-0 outline-none focus:ring-0 placeholder-gray-400 border-gray-400 focus:border-gray-400'
                        placeholder='Add a reply...'
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
                                className='text-gray-600 bg-gray-300 font-medium focus:text-gray-900 py-2 px-4 text-sm rounded-full'>
                                Reply
                            </button>
                        </div>
                    </div>
                </form>
                {comments.length > 0 && (
                    <div>
                        <button
                            onClick={() => setShowReplies(!showReplies)}
                            className='transition transition-all duration-1000 ease-in-out text-indigo-800 font-semibold flex gap-3 items-end'>
                            <FontAwesomeIcon
                                icon={caretIcon}
                                className='text-2xl'
                            />
                            <span>
                                {comments.length} {showRepliesText}
                            </span>
                        </button>
                    </div>
                )}
                {nestedComments}
            </div>
        </div>
    )
}
const Comments = props => {
    const { value, PostID } = props
    return (
        <div className='w-full md:px-4 pb-4 space-y-6 transition transition-all duration-1000 ease-in-out'>
            <div>
                <p className='font-medium'>
                    Comments ({value && value.length})
                </p>
            </div>
            {(value || []).map(comment => {
                return (
                    <Comment
                        key={comment.id}
                        comment={comment}
                        PostID={PostID}
                    />
                )
            })}
        </div>
    )
}

function Wrapper ({ PostID }) {
    const postQuery = useGetPostCommentsQuery(PostID)
    const { data, isLoading } = postQuery
    return (
        <div>
            {isLoading ? (
                <ColoredSkeleton height={150} />
            ) : (
                <Comments value={data} PostID={PostID} />
            )}
        </div>
    )
}

export default Wrapper
