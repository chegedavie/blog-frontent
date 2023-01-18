import { WithContext as ReactTags } from 'react-tag-input'
import {
    useGetTagsQuery,
    useAddTagMutation,
    useDeleteTagMutation,
    useTagPostMutation,
    useUntagPostMutation,
} from 'redux/features/apiSlice'
import ColoredSkeleton from '../ColoredSkeleton'
import axios from '@/lib/axios'
export default props => {
    const { value, setTags, blogId } = props
    const tagsQuery = useGetTagsQuery()
    const [
        addTag,
        { isLoading: isAddingTag, isSuccess: hasAddedTag },
    ] = useAddTagMutation()
    const [
        deleteTag,
        { isLoading: isDeletingTag, isSuccess: hasDeletedTag },
    ] = useDeleteTagMutation()
    const [
        tagPost,
        { isLoading: isTaggingPost, isSuccess: hasTagggedPost },
    ] = useTagPostMutation()
    const [
        untagPost,
        { isLoading: isUntaggingPost, isSuccess: hasUntaggedPost },
    ] = useUntagPostMutation()
    const { data, isLoading, isSuccess } = tagsQuery
    const csrf = () => axios.get('/sanctum/csrf-cookie')
    const KeyCodes = {
        comma: 188,
        enter: 13,
    }
    const suggestions = []
    isSuccess &&
        data.forEach(tag => {
            suggestions.push({ id: tag.text, text: tag.text })
        })
    const tags = []
    value !== undefined &&
        value.forEach(tag => {
            tags.push({ id: tag.text, text: tag.text })
        })

    const delimiters = [KeyCodes.comma, KeyCodes.enter]
    const handleDelete = i => {
        setTags(tags.filter((tag, index) => index !== i))
        console.log(value)
        console.log(
            'The tag at index ' + i + ' was clicked ',
            value[i],
            ' ',
            value,
        )
        const tag = value[i]
        const { pivot } = tag
        console.log(pivot)
        untagPost(pivot)
    }

    const handleAddition = async tag => {
        await csrf()
        if (suggestions.indexOf(tag) === -1) {
            const { text } = tag
            addTag({ text })
        } else {
            if (isSuccess) {
                const [dbTag] = data.filter(item => {
                    return item.text === tag.text
                })
                console.log(dbTag)
                setTags([...tags, tag])
                tagPost({ tag_id: Number(dbTag.id), blog_id: blogId })
            }
        }
    }

    const handleDrag = (tag, currPos, newPos) => {
        const newTags = tags.slice()

        newTags.splice(currPos, 1)
        newTags.splice(newPos, 0, tag)

        // re-render
        setTags(newTags)
    }

    const handleTagClick = index => {
        console.log(value)
        console.log(
            'The tag at index ' + index + ' was clicked ',
            value[index],
            ' ',
            value,
        )
        const tag = value[index]
        const { pivot } = tag
        console.log(pivot)
        untagPost(pivot)
    }
    return (
        <div>
            {isLoading ? (
                <ColoredSkeleton height={100} />
            ) : (
                <ReactTags
                    inputFieldPosition='inline'
                    inline={false}
                    classNames={{
                        tags:
                            'p-2 border rounded flex items-center gap-6 bg-indigo-50',
                        tagInput: 'w-48',
                        tagInputField:
                            'w-full rounded-t border focus:ring-0 focus:outline-none border-b-4 border-indigo-50 focus:border-indigo-400 inline-flex',
                        selected: 'selectedClass',
                        tag:
                            'mr-1 px-2 py-1 rounded border bg-indigo-900 text-indigo-50',
                        remove: 'removeClass pl-3',
                        suggestions: 'suggestionsClass',
                        activeSuggestion: 'activeSuggestionClass',
                        editTagInput: 'editTagInputClass',
                        editTagInputField: 'editTagInputField',
                        clearAll: 'clearAllClass',
                    }}
                    tags={tags}
                    suggestions={suggestions}
                    delimiters={delimiters}
                    handleDelete={handleDelete}
                    handleAddition={handleAddition}
                    handleDrag={handleDrag}
                    handleTagClick={handleTagClick}
                    labelField='text'
                    name={'tags'}
                    autocomplete
                />
            )}
        </div>
    )
}
