export default (props)=>{
    const {reaction,onClick}=props
    const {emoji}=reaction
    return(
        <div onClick={onClick} id="reaction">
            <span>{emoji}</span>
        </div>
    )
}