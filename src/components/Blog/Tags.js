import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTag } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

export default props => {
    const { tags, className, inverted } = props
    const router = useRouter()
    return (
        <section className={className}>
            <div className='w-full space-x-2'>
                {tags.map((tag, index) => {
                    const { text, id } = tag
                    const route = `/blog/tags/${id}`
                    return (
                        <Link
                            href={route}
                            key={index}
                            className=''>
                            <button className={`mt-1 cursor-pointer px-2 py-1 rounded text-xs ${inverted?'text-slate-800 border border-slate-700 bg-slate-100':'bg-slate-700 text-slate-100'}`}>
                                {text}{' '}
                                <FontAwesomeIcon
                                    icon={faTag}
                                    className='ml-2'
                                />
                            </button>
                        </Link>
                    )
                })}
            </div>
        </section>
    )
}
