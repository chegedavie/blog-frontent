import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default (props)=>{
    const {baseColor,highlightColor,...rest}=props
    return <Skeleton baseColor='#c7d2fe' highlightColor='#e7ecff' {...rest}/>
}