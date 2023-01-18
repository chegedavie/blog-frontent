export default (props)=>{
    const {children,className,style}=props
    return (
        <div style={style} className={`${className} min-h-screen bg-indigo-200 items-center relative w-full`}>{children}</div>
        )
}