import { RingLoader } from "react-spinners"
import SidebarItem from "./SidebarItem"

export default (props)=>{
    const {items,title,type,className, loading}=props
    return (
        <div className={`${className} text-gray-800 p-2 grid gap-2 rounded text-left`}>
            <h4 className="px-2">{title}</h4>
            <RingLoader loading={loading}/>
            {items.map((item,index)=>{
                const {title,label,id}=item
                return <SidebarItem title={title} label={label} id={id} type={type} key={index}/>
            })}
        </div>
        
    )
}