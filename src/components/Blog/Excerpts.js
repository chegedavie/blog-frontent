import Excerpt from './Excerpt'

export default (props) => {
    const {posts}=props
    return (
        <div className='grid grid-cols-6 gap-4'>
            {posts.map((post,index)=>{
                return <Excerpt post={post} key={index} edit={true}/>
            })}
        </div>
    )
}
