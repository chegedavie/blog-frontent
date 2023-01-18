import Author from './Author'
import BlogLabel from './BlogLabel'
import Link from 'next/link'
import { randomColor } from '@/scripts/Helpers'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEdit,faArrowRight} from '@fortawesome/free-solid-svg-icons'
export default props => {
    const { post, edit,isLoading } = props
    const { title, body, featured, updated_at, id, writer } = post
    return (
        <div className='relative col-span-6 md:col-span-3 lg:col-span-2 rounded excerpt'>
            {edit && <div className='edit-button absolute w-full h-full left-0 top-0 bg-transparent z-20 flex items-center transition transition-all duration-200 ease-in-out'>
                <Link className='rounded edit-shadow mx-auto bg-teal-600 text-teal-50 text-sm py-1 px-2' href={`/blog/edit/${id}`}>
                <span className='mr-4'>Edit</span><FontAwesomeIcon icon={faEdit}/> 
                </Link>
            </div>}
            <Link href={edit?`blog/edit/${id}`:`blog/${id}`}>
                <article className={`relative bg-indigo-50 border border-indigo-50 ${!edit?'hover:bg-slate-100/80 hover:border-slate-500':null} shadow rounded text-gray-800 space-y-4 py-6 transition transition-colors duration-300 ease-in-out`}>
                    <div className='px-4'>
                        <Author writer={writer} />
                    </div>
                    <h2 className='text-lg font-semibold px-4'>{title}</h2>
                    {featured ? (
                        <span className='absolute top-0 right-4 text-indigo-50'>
                            {
                                <BlogLabel
                                    value='Featured'
                                    mainColor={randomColor(70)}
                                />
                            }
                        </span>
                    ) : null}
                    
                    <p className='text-base px-4'>
                        {body.slice(0, 300) + '...'} 
                    </p>
                    {!edit && (
                        <button className='ml-4 px-2 py-1 bg-teal-500 text-teal-50 rounded text-sm'>
                            <span className='mr-4'>Read more</span><FontAwesomeIcon icon={faArrowRight}/> 
                        </button>
                    )}
                </article>
            </Link>
        </div>
    )
}
