export default (props)=>{
    const {skill,mouseLeave}=props
    return(
        <div className={`bg-white mt-6 ${skill?'block':'hidden'} text-gray-900 transition transition-all duration-1000 ease-in-out rounded`} onMouseLeave={mouseLeave}>

            <h4 className="shadow py-3 px-6 font-semibold tracking-tight">{skill && skill.name+' : '+skill.level}</h4>
            <div className="py-2">
            {skill && skill.details.map((detail,index)=>{
                return <div className="px-6 py-2 flex" key={index}><span className="w-1/12 text-left lg:text-center"><i className="fas fa-check-circle mr-3 opacity-80"></i></span><span className="px-2 lg:px-0 w-11/12">{detail}</span></div>
            })}
            </div>
        </div>
    )

}