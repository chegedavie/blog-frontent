import { dateComponents } from "./DateLabel"

export default ({date, className})=>{
    const time_ago=dateComponents(date)
    return (
        <div className={className}>
            {time_ago}
        </div>
    )
}