export default (props)=>{
    let {className,size,color,children,icon}=props
    return(
        <div className={className}>
            <h1 className={`text-${size} text-${color}-700`}><i className={`fas fa-${icon} opacity-90 mr-2`}></i>{children}</h1>
        </div>
    )
}