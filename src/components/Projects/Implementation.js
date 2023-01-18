export default (props)=>{
    const {implementation}=props
    return(
        <div className="bg-slate-100 text-slate-800 lg:text-lg py-6 lg:py-12 px-3 lg:px-12">
            <h2 className="text-center pb-6 text-2xl lg:text-3xl font-semibold"><i className="fas fa-info-circle mr-4"></i>Implementation</h2>
            <div className="w-full md:w-3/4 lg:w-2/3 mx-auto">{implementation}</div>
        </div>
    )
}