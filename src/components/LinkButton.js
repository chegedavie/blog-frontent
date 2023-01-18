export default (props)=>{
    const {className,href,children,...rest}=props
    return (
        <button {...rest} className={`${className} py-2 text-center`}>{children}</button>
    )
}