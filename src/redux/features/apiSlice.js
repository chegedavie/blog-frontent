// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const getCookie = name => {
    if (!document?.cookie) {
        return null
    }

    const xsrfCookies = document.cookie
        .split(';')
        .map(c => c.trim())
        .filter(c => c.startsWith(name + '='))

    if (xsrfCookies.length === 0) {
        return null
    }
    return decodeURIComponent(xsrfCookies[0].split('=')[1])
}

export async function getCsrfToken () {
    // Make a request to your server to retrieve the CSRF token
await fetch(process.env.NEXT_PUBLIC_BACKEND_URL+'sanctum/csrf-cookie')
    // Extract the CSRF token from the response
    const csrfToken = getCookie('XSRF-TOKEN')
    // Return the CSRF token as a string
    return { csrfToken }
}

export const apiSlice = createApi({
    reducerPath: 'api',

    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
        credentials: 'include',
        prepareHeaders: async headers => {
            const { csrfToken } = await getCsrfToken()
            headers.set('X-XSRF-TOKEN', csrfToken)
            headers.set('Accept', 'application/json')
            return headers
        },
    }),

    tagTypes: ['Posts', 'Tags', 'Replies', 'Comments', 'FeaturedPosts'],
    endpoints: builder => ({
        getPosts: builder.query({
            query: (page = 1) => `/blog?page=${page}`,
            providesTags: (result, error, page) =>
                result
                    ? [
                          ...result.data.map(({ id }) => ({
                              type: 'Posts',
                              id,
                          })),
                          { type: 'Posts', id: 'PARTIAL-LIST' },
                      ]
                    : [{ type: 'Posts', id: 'PARTIAL-LIST' }],
        }),
        getAuthor: builder.query({
            query: id => `/author/${id}`,
        }),
        getFeaturedPosts: builder.query({
            query: () => `/blog/featured`,
            providesTags: (results, errors) => {
                return [{ type: 'FeaturedPosts', id: 'FEATURED_POSTS_LIST' }]
            },
        }),
        getPost: builder.query({
            query: id => `/blog/${id}`,
            method: 'GET',
            providesTags: (result, error, id) => [{ type: 'Posts', id }],
        }),
        editUserPosts: builder.query({
            query: page => '/blog/user/posts',
            providesTags: (result, error, page) =>
                result
                    ? [
                          ...result.data.map(({ id }) => ({
                              type: 'Posts',
                              id,
                          })),
                          { type: 'Posts', id: 'PARTIAL-LIST' },
                      ]
                    : [{ type: 'Posts', id: 'PARTIAL-LIST' }],
        }),
        editUserPost: builder.query({
            query: id => `/blog/user/posts/${id}`,
            providesTags: id => [{ type: 'Posts', id }],
        }),
        editPost: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `/blog/${id}`,
                method: 'PATCH',
                body: patch,
            }),
            invalidatesTags: (result, error, id) => [
                { type: 'Posts', id },
                { type: 'Posts', id: 'PARTIAL-LIST' },
            ],
        }),
        createPost: builder.mutation({
            query: ({ ...post }) => ({
                url: '/blog',
                method: 'POST',
                body: post,
            }),
            invalidatesTags: (result, error, id) => {
                console.log(error, result)
                return [
                    { type: 'Posts', id },
                    { type: 'Posts', id: 'PARTIAL-LIST' },
                ]
            },
        }),
        deletePost: builder.mutation({
            query: id => ({
                url: `/blog/${id}`,
                method: 'DELETE',
                body: {},
            }),
            invalidatesTags: (result, error, id) => [
                { type: 'Posts', id },
                { type: 'Posts', id: 'PARTIAL-LIST' },
            ],
        }),

        publishPost: builder.mutation({
            query: id => {
                return {
                    url: `/blog/${id}/publish`,
                    method: 'PATCH',
                }
            },
            invalidatesTags: (result, error, id) => [
                { type: 'Posts', id },
                { type: 'Posts', id: 'PARTIAL-LIST' },
            ],
        }),
        unpublishPost: builder.mutation({
            query: id => {
                return {
                    url: `/blog/${id}/unpublish`,
                    method: 'PATCH',
                }
            },
            invalidatesTags: (result, error, id) => [
                { type: 'Posts', id },
                { type: 'Posts', id: 'PARTIAL-LIST' },
            ],
        }),
        featurePost: builder.mutation({
            query: id => {
                return {
                    url: `/blog/${id}/feature`,
                    method: 'PATCH',
                }
            },
            invalidatesTags: (result, error, id) => [
                { type: 'Posts', id },
                { type: 'Posts', id: 'PARTIAL-LIST' },
            ],
        }),
        unfeaturePost: builder.mutation({
            query: id => {
                return {
                    url: `/blog/${id}/unfeature`,
                    method: 'PATCH',
                }
            },
            invalidatesTags: (result, error, id) => [
                { type: 'Posts', id },
                { type: 'Posts', id: 'PARTIAL-LIST' },
            ],
        }),
        getTagPosts: builder.query({
            query: ({ id, page }) => `/blog/tag/${id}/posts?page=${page}`,
            providesTags: (result, error, page) =>
                result
                    ? [
                          ...result.data.map(({ id }) => ({
                              type: 'Posts',
                              id,
                          })),
                          { type: 'Posts', id: 'PARTIAL-LIST' },
                      ]
                    : [{ type: 'Posts', id: 'PARTIAL-LIST' }],
        }),

        // --TAGS ENDPOINTS

        getTags: builder.query({
            query: () => 'tag',
            providesTags: (result, error, id) => [
                { type: 'Tags', id },
                { type: 'Tags', id: 'TAG-LIST' },
            ],
        }),
        addTag: builder.mutation({
            query: tag => ({
                url: 'tag',
                method: 'POST',
                body: tag,
            }),
            invalidatesTags: (result, error) => [
                { type: 'Tags', id: 'TAG-LIST' },
            ],
        }),
        deleteTag: builder.mutation({
            query: id => ({
                url: `/tags/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: () => [{ type: 'Tags', id: 'TAG-LIST' }],
        }),

        // TAGGING POSTS ENDPOINTS

        tagPost: builder.mutation({
            query: tagPost => {
                const { blog_id } = tagPost
                return {
                    url: `/blog/${blog_id}/tagPost`,
                    method: 'POST',
                    body: tagPost,
                }
            },
            invalidatesTags: (result, error, tagPost) => {
                console.log(result)
                const { blog_id } = tagPost
                return [
                    { type: 'Posts', blog_id },
                    { type: 'Posts', id: 'PARTIAL-LIST' },
                ]
            },
        }),
        untagPost: builder.mutation({
            query: pivot => {
                const { blog_id, id } = pivot
                return {
                    url: `/blog/${blog_id}/tagPost/${id}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: (result, error, pivot) => {
                const { blog_id } = pivot
                console.log(error, result, blog_id)
                return [
                    { type: 'Posts', blog_id },
                    { type: 'Posts', id: 'PARTIAL-LIST' },
                ]
            },
        }),

        //Comment endpoints
        addComment: builder.mutation({
            query: commentBody => {
                return {
                    url: '/comment',
                    method: 'POST',
                    body: commentBody,
                }
            },
            invalidatesTags: (results, error) => {
                try {
                    if (!results) throw new Error('no results returned')
                    const { commentable_id, commentable_type } = results
                    const invalidatedTag =
                        commentable_type === 'App//Models//Blog'
                            ? { type: 'Posts', commentable_id }
                            : { type: 'Comments', id: commentable_id }
                    return [
                        invalidatedTag,
                        { type: 'Comments', id: 'COMMENT_LIST' },
                    ]
                } catch (err) {
                    console.error(err)
                    console.error(error)
                }
            },
        }),
        getPostComments: builder.query({
            query: id => {
                return {
                    url: `/blog/${id}/comment`,
                    method: 'GET',
                }
            },
            providesTags: (result, error, id) => {
                const resultTags = []
                if (result) {
                    const prepareResultsTags = data => {
                        const { id, comments } = data
                        resultTags.push({ type: 'Comments', id })
                        if (comments !== undefined && comments.length > 0)
                            prepareResultsTags(comments)
                    }
                    prepareResultsTags(result)
                }
                return result
                    ? [...resultTags, { type: 'Comments', id: 'COMMENT_LIST' }]
                    : null
            },
        }),
        getComment: builder.query({
            query: id => `comment/${id}`,
            providesTags: (result, error, id) => {
                return [{ type: 'Comments', id }]
            },
        }),
        deleteComment: builder.mutation({
            query: commentId => {
                return {
                    url: `/comment/${commentId}`,
                    method: 'DELETE',
                }
            },
        }),

        deleteReply: builder.mutation({
            query: (commentId, replyId) => {
                return {
                    url: `comment/delete/${commentId}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: (commentId, error, result) => {
                return [{ type: 'Replies', id: commentId }]
            },
        }),

        //VOTES downvote, upvote

        downvotePost: builder.mutation({
            query: ({ id }) => {
                console.log(id)
                return {
                    url: `/blog/${id}/unlike`,
                    method: 'PATCH',
                }
            },
            async onQueryStarted ({ id }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    apiSlice.util.updateQueryData('getPost', id, draft => {
                        if (!draft.unliked) {
                            if (draft.like_counter === null) {
                                draft.like_counter = { count: 0 }
                            } else {
                                draft.like_counter.count--
                            }
                        }
                        draft.unliked = true
                        draft.isLiked = false
                    }),
                )
                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                }
            },
        }),
        upvotePost: builder.mutation({
            query: ({ id }) => {
                console.log(id)
                return {
                    url: `/blog/${id}/like`,
                    method: 'PATCH',
                }
            },
            async onQueryStarted ({ id }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    apiSlice.util.updateQueryData('getPost', id, draft => {
                        if (draft.isLiked === false) {
                            if (draft.like_counter === null) {
                                draft.like_counter = { count: 1 }
                            } else {
                                draft.like_counter.count++
                            }
                            draft.isLiked = true
                            draft.unliked = false
                        }
                    }),
                )
                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                }
            },
        }),
        addClapToPost: builder.mutation({
            query: ({ id }) => {
                console.log(id)
                return {
                    url: `blog/${id}/clap`,
                    method: 'PATCH',
                }
            },
            async onQueryStarted ({ id }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    apiSlice.util.updateQueryData('getPost', id, draft => {
                        if (!draft.clapped) draft.clappers_count++
                        draft.clapped = true
                    }),
                )
                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                }
            },
        }),
        downvoteComment: builder.mutation({
            query: ({ id, PostID }) => {
                return {
                    url: `comment/${id}/unlike`,
                    method: 'PATCH',
                    invalidates: id => [{ type: 'Comments', id }],
                }
            },
            async onQueryStarted (
                { id, PostID },
                { dispatch, queryFulfilled },
            ) {
                const patchResult = dispatch(
                    apiSlice.util.updateQueryData(
                        'getPostComments',
                        PostID,
                        draft => {
                            const findComment = (data, level = 1) => {
                                data.forEach(comment => {
                                    console.log(level)
                                    const { id: commentId, comments } = comment
                                    comment.level = level
                                    //console.log(comment)
                                    if (commentId === id) {
                                        if (!comment.unliked) {
                                            if (comment.like_counter === null) {
                                                comment.like_counter = {
                                                    count: 0,
                                                }
                                            } else {
                                                comment.like_counter.count--
                                            }
                                            comment.liked = false
                                            comment.unliked = true
                                        }
                                    }
                                    findComment(comments, level + 1)
                                })
                            }
                            findComment(draft)
                        },
                    ),
                )
                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                }
            },
        }),
        upvoteComment: builder.mutation({
            query: ({ id, PostID }) => {
                console.log(id)
                return {
                    url: `comment/${id}/like`,
                    method: 'PATCH',
                }
            },
            async onQueryStarted (
                { id, PostID },
                { dispatch, queryFulfilled },
            ) {
                const patchResult = dispatch(
                    apiSlice.util.updateQueryData(
                        'getPostComments',
                        PostID,
                        draft => {
                            const findComment = (data, level = 1) => {
                                data.forEach(comment => {
                                    const { id: commentId, comments } = comment
                                    comment.level = level
                                    //console.log(comment)
                                    if (commentId === id) {
                                        if (!comment.liked) {
                                            if (comment.like_counter === null) {
                                                comment.like_counter = {
                                                    count: 1,
                                                }
                                            } else {
                                                comment.like_counter.count++
                                            }
                                            comment.liked = true
                                            comment.unliked = false
                                        }
                                    }
                                    findComment(comments, level + 1)
                                })
                            }
                            findComment(draft)
                        },
                    ),
                )
                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                }
            },
        }),
        addClapToComment: builder.mutation({
            query: ({ id, PostID }) => {
                console.log(id)
                return {
                    url: `comment/${id}/clap`,
                    method: 'PATCH',
                }
            },
            async onQueryStarted (
                { id, PostID },
                { dispatch, queryFulfilled },
            ) {
                const patchResult = dispatch(
                    apiSlice.util.updateQueryData(
                        'getPostComments',
                        PostID,
                        draft => {
                            const findComment = (data, level = 1) => {
                                data.forEach(comment => {
                                    const { id: commentId, comments } = comment
                                    comment.level = level
                                    //console.log(comment)
                                    if (commentId === id) {
                                        if (!comment.clapped)
                                            comment.clappers_count++
                                        comment.clapped = true
                                    }
                                    findComment(comments, level + 1)
                                })
                            }
                            findComment(draft)
                        },
                    ),
                )
                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                }
            },
        }),

        //Messages
        sendMessage: builder.mutation({
            query: body => {
                return {
                    url: 'message',
                    method: 'POST',
                    body,
                }
            },
        }),
        //Search

        searchUserPosts: builder.query({
            query: activeQuery => `blog/search/user/${activeQuery}`,
            providesTags: (result, error, page) =>
                result
                    ? [
                          ...result.data.map(({ id }) => ({
                              type: 'Posts',
                              id,
                          })),
                          { type: 'Posts', id: 'PARTIAL-LIST' },
                      ]
                    : [{ type: 'Posts', id: 'PARTIAL-LIST' }],
        }),
        searchPublishedPosts: builder.query({
            query: ({ activeQuery, page }) =>
                `blog/search/${activeQuery}?query${activeQuery}&page=${page}`,
            providesTags: (result, error, page) =>
                result
                    ? [
                          ...result.data.map(({ id }) => ({
                              type: 'Posts',
                              id,
                          })),
                          { type: 'Posts', id: 'PARTIAL-LIST' },
                      ]
                    : [{ type: 'Posts', id: 'PARTIAL-LIST' }],
        }),
        searchAllPosts: builder.query({
            query: activeQuery => `blog/search/all/${activeQuery}`,
            providesTags: (result, error, page) =>
                result
                    ? [
                          ...result.data.map(({ id }) => ({
                              type: 'Posts',
                              id,
                          })),
                          { type: 'Posts', id: 'PARTIAL-LIST' },
                      ]
                    : [{ type: 'Posts', id: 'PARTIAL-LIST' }],
        }),
    }),
})

// Export the auto-generated hook for the query endpoints
export const {
    //Posts
    useGetPostsQuery,
    useGetAuthorQuery,
    useGetPostQuery,
    useEditUserPostQuery,
    useEditUserPostsQuery,
    useEditPostMutation,
    useCreatePostMutation,
    useDeletePostMutation,
    useGetFeaturedPostsQuery,
    useFeaturePostMutation,
    useUnfeaturePostMutation,
    usePublishPostMutation,
    useUnpublishPostMutation,
    useGetTagPostsQuery,
    //Tags
    useGetTagsQuery,
    useAddTagMutation,
    useDeleteTagMutation,
    useTagPostMutation,
    useUntagPostMutation,
    //comments
    useAddCommentMutation,
    useDeleteCommentMutation,
    useDeleteReplyMutation,
    useGetPostCommentsQuery,
    //Likes
    useDownvoteCommentMutation,
    useDownvotePostMutation,
    useUpvoteCommentMutation,
    useUpvotePostMutation,
    //Claps
    useAddClapToCommentMutation,
    useAddClapToPostMutation,
    //Message
    useSendMessageMutation,
    //search
    useSearchAllPostsQuery,
    useSearchPublishedPostsQuery,
    useSearchUserPostsQuery,
} = apiSlice
