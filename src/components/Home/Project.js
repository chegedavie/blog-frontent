import Link from 'next/link'
import TechStackIcons from '@/scripts/TechStackIcons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default props => {
    let { project, index, device } = props
    let { description, implementation, title, techStack } = project
    let slicedDescr = description.slice(0, 200)

    return (
        <div
            className={`${
                device ? 'smartphone' : null
            } col-span-2 lg:col-span-1 border border-slate-400 bg-slate-50 shadow shadow-lg rounded-md text-slate-600 z-10 select-none`}>
            <div className='divide-y divide-slate-400'>
                <div
                    className={`${
                        device
                            ? 'text-slate-500 bg-slate-50'
                            : 'text-slate-500 bg-slate-50'
                    } py-3 px-4 border-b-md font-semibold rounded-t-md text-lg text-center`}>
                    {title}
                </div>
                <div className='shadow shadow-inner px-4 py-2 relative bg-slate-50 project-hover transition transition-all duration-1000 ease-in-out'>
                    <div className=''>
                        <div className='p-2 text-left'>
                            <p className='pt-2 px-2 font-semibold'>
                                Description
                            </p>
                            <p className='pb-2 px-2 text-justify break-normal'>
                                {slicedDescr}
                            </p>
                            <p className='pt-2 px-2 font-semibold'>
                                Implementation
                            </p>
                            <p className='pb-2 px-2'>
                                {implementation.slice(0, 150)}
                            </p>
                            <div className='w-full pt-4 pb-2'>
                                <Link
                                    href={`./projects/${index}`}
                                    className='bg-indigo- hover:bg-indigo-800 text-indigo-900 hover:text-indigo-200 border hover:border-0 border-indigo-400 px-8 py-1 shadow rounded text-base'>
                                    Details
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full px-4 pb-4 border-t'>
                    <p className='space-x-3 space-y-3 justify-none text-xs'>
                        {techStack.map((item, index) => {
                            return (
                                <button
                                    type='button'
                                    disabled={true}
                                    className='bg-slate-500 text-slate-100 rounded border border-slate-300 py-1 px-2 inline-flex items-center'
                                    key={index}>
										{TechStackIcons[item]!== undefined && <FontAwesomeIcon icon={TechStackIcons[item]} className='mr-2 text-slate-50 text-lg'/>}
                                    <span>
                                    {item}
                                    </span>
                                </button>
                            )
                        })}
                    </p>
                </div>
            </div>
        </div>
    )
}
