import { useGetAuthorQuery } from "@/redux/features/apiSlice"
import TimeAgo from "./TimeAgo"

export default (props)=>{
    const {writer,className,date_modified}=props
    return (
        <div className={`${className} flex items-end gap-4`}>
            <img className="h-12 w-12 rounded-full" src='/dc.png' alt={`A profile picture of ${writer.name}`} />
            <div>
            <p className="text-sm font-semibold text-slate-700">{writer.name}</p>
            <TimeAgo className='text-sm font-bold text-slate-600' date={date_modified}/>
            </div>
        </div>
    )
}