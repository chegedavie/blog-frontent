import { RingLoader } from 'react-spinners'
import SidebarSection from './SidebarSection'
import Tags from './Tags'
import {useGetTagsQuery, useGetFeaturedPostsQuery} from '@/redux/features/apiSlice'

export default props => {
  const { blogs, className,itemsBg } = props
  const bg=itemsBg;
  const {data:tags=[],isLoading:tagsLoading}=useGetTagsQuery()
  const {data:featured=[],isLoading:postsLoading}=useGetFeaturedPostsQuery()
  const featuredSlice=featured.slice(0,5)
  return (
    <aside className={`space-y-4 ${className} `}>
        <SidebarSection
          items={featuredSlice.map(blog => {
            const { title, featured,id } = blog
            const item = { title, label: featured,id }
            return item
          })}
          title="Featured"
          type='blog'
          className={bg}
          loading={postsLoading}
        />
        <div className={`${bg} p-2 rounded`}>
          <h3>Tags</h3>
          <RingLoader loading={tagsLoading}/>
        <Tags tags={tags}/>
        </div>
    </aside>
  )
}
