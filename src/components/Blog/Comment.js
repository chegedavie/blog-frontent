import Link from "next/link"

export default (props)=>{
    const {value,post,onReply,id}=props
    const {setCommentable,setCommentableId,toggleCommentVisibility}=onReply
    const {username,comment}=value
    return(
        <div className="relative border border-indigo-100 p-2 rounded text-base">
            <div className="font-semibold flex space-x-4 items-end">
            <img src="/team-04.jpg" className="h-6 w-6 rounded-full"/><div>{username}</div>
            </div>
            <div className="">
                {comment}
            </div>
            <div className="w-full text-right">
                <button onClick={()=>{
                    setCommentable('Comment')
                    setCommentableId(id)
                    toggleCommentVisibility(true)
                }} className="text-blue-500 text-sm active:text-blue-600">Reply</button>
            </div>
        </div>
    )
}