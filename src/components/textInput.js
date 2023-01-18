import PropTypes from 'react'
let Input = (props)=>{
    const {className,color,id,placeholder,label,type,...rest}=props
    const colors={
        gray: "rounded px-4 py-2 w-full h-full focus:outline-none focus:shadow-inner bg-gray-900/70 focus:bg-gray-900/90 text-gray-100",
        indigo:"rounded px-4 py-2 w-full h-full focus:outline-none focus:shadow-inner bg-indigo-900/70 focus:bg-indigo-900/90 text-indigo-100"
    }
    const computedClass= 'rounded px-4 py-2 w-full h-full focus:outline-none focus:shadow-inner'
    return(
        <div className={className}>
            <label htmlFor={id}>{label}</label>
        <input {...rest} type={type} id={id} placeholder={placeholder} className={colors[color]||"rounded px-4 py-2 w-full h-full focus:outline-none focus:shadow-inner text-gray-800 bg-gray-50 focus:bg-white"}/>
        </div>

    )
}


export default Input