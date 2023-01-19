import { useEffect, useState } from 'react'
import Link from 'next/link'
import LinkButton from '../../components/LinkButton'
import BlogLabel from './BlogLabel'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleLeft, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons'
import { carouselCurry } from '../Projects/ScreenShots'
import { shortenStr } from '@/scripts/Helpers'
//import {u} from 'url'

export default props => {
  const {featured}=props;
  const featuredList=featured.slice(0,5)
  const postsCarousel=carouselCurry();
  const [activeBlog, setActiveBlog] = useState(0);
  let blog = featuredList[activeBlog]
  const carouselInterval=setInterval(()=>{setActiveBlog(postsCarousel('next',5))},7000);
  useEffect(()=>clearInterval(carouselInterval),[activeBlog])
  
  if (blog) {
    const { title, body, comments, date, id } = blog
    return (
      <section className='relative px-5 py-6 md:px-12 lg:py-12 bg-indigo-900 border-t text-indigo-100'>
        <h1 className='hidden'>Blogs</h1>
        <article className='relative text-base w-full md:w-4/5 lg:w-3/5 mx-auto transition transition-text ease-in-out'>
          <h2 className='text-center pb-4'>
            <BlogLabel value='Featured' color="bg-emerald-500/70" />
          </h2>
          <p className='text-2xl md:text-3xl bold leading-tight text-center px-2 md:px-6'>
            <span className='md:hidden'>{shortenStr(title,3)}</span>
            <span className='hidden md:block'>{shortenStr(title,4)}</span>
          </p>
          <p
            className='tex-justify md:text-center py-4 text-indigo-200 px-6 md:px-10'
            style={{ backgroundImage: 'team-02.jpg' }}
          >
            {body.slice(0, 200) + '...'}
          </p>
          <div className='w-full text-center'>
            <Link href={'blog/' + id}>
              <LinkButton className='px-6 py-1 text-base hover:bg-indigo-100 hover:text-indigo-800 hover:font-semibold border rounded-xl'>
                Read more
              </LinkButton>
            </Link>
          </div>
          <div onClick={()=>setActiveBlog(postsCarousel('next',5))} className='h-full absolute outline-none -left-4 lg:-left-10 text-indigo-200 top-0 text-2xl md:text-3xl flex items-center'>
          <FontAwesomeIcon icon={faChevronCircleLeft}/>
        </div>
        <div onClick={()=>setActiveBlog(postsCarousel('prev',5))} className='h-full absolute outline-none -right-4 lg:-right-10 text-indigo-200 top-0 text-2xl md:text-3xl flex items-center'>
          <FontAwesomeIcon icon={faChevronCircleRight}/>
        </div>
        </article>
      </section>
    )
  }
}
