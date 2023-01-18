import { randomColor } from '@/scripts/Helpers'
import BlogLabel from './BlogLabel'
import Tags from './Tags'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandsClapping,faLongArrowAltRight,faThumbsUp, faComments } from '@fortawesome/free-solid-svg-icons'
import Author from './Author'
export default props => {
    const { blog } = props
    const { title, body, date, featured, id, tags,like_counter,clappersCount:claps=0, comments_count, writer } = blog
    let likes=like_counter !== null?like_counter.count:0
    return (
        <div>
            <div>
                <article className='relative bg-indigo-50 border border-indigo-50 shadow rounded text-gray-800 space-y-4 py-8'>
                  <div className='px-4 flex items-end'>
                    <Author writer={writer} className='w-1/2'/> <div className='relative w-1/2 text-indigo-100'>
                        <span className='absolute h-full bottom-4 right-4'>
                        {featured && (
                            <BlogLabel
                                value='Featured'
                                mainColor={randomColor(80)}
                            />
                        )}
                        </span>
                    </div>
                  </div>
                    <h4 className='text-lg font-semibold px-4'>{title}</h4>
                    <p className='text-base px-4'>
                        {body.slice(0, 340) + '...'}
                    </p>
                    
                    <Tags tags={tags} className='px-4' inverted={true} />
                    <div className='relative flex pt-4 px-5 gap-7 items-center text-xl text-slate-800'>
                        <div>
                            <FontAwesomeIcon icon={faThumbsUp} />

                            <span className='text-slate-900 text-sm pl-4'>
                                {likes}
                            </span>
                        </div>
                        <div>
                            <FontAwesomeIcon icon={faHandsClapping} />

                            <span className='text-slate-900 text-sm pl-4'>
                                {claps}
                            </span>
                        </div>
                        <div>
                        <FontAwesomeIcon icon={faComments} />
                            <span className='text-slate-900 text-sm pl-4'>
                                {comments_count}
                            </span>
                        </div>
                        <div className='absolute right-4 bottom-0'>
                          <Link href={`/blog/${id}`} className='float-right text-sm bg-slate-200 text-slate-900 border border-slate-900 hover:border-indigo-800 hover:bg-indigo-800 hover:text-indigo-50 py-2 px-4 rounded shadow shadow-lg hover:shadow-inner focus:shadow-inner'>Read more <FontAwesomeIcon className='pl-2' icon={faLongArrowAltRight}/></Link>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    )
}
