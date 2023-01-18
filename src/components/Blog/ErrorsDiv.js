export default (props)=>{
    const {errors}=props
    if(errors && errors.length>0){
        return (
            <div className={'rounded py-2 px-4 bg-red-200 text-red-900'}>
                {errors.map((error,index)=>{
                    return <p key={index}>{error}</p>
                })}

            </div>
        )
    }
}