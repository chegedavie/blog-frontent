import CustomLink from './customLink'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faBars,faHome,faClipboardList,faFileAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons

export default props => {
    const { href, value, icon, type, cta } = props
    if (type === 'inverted') {
        return (
            <div className='block md:inline py-1 md:py-0'>
                {!cta ? (
                    <CustomLink
                        href={href}
                        cta={cta}
                        className='text-indigo-300/80 font-normal text-base md:text-sm text-end hover:text-indigo-100'>
                        <FontAwesomeIcon
                            icon={icon}
                            className={'mr-2 lg:mr-1 inline'}
                        />
                        <span>{value}</span>
                    </CustomLink>
                ) : (
                    <CustomLink
                        href={href}
                        cta={cta}
                        className='p-1 px-4 rounded-xl bg-indigo-100 hover:bg-indigo-100 text-indigo-700/70 hover:text-indigo-800 font-normal text-base md:text-sm text-end'>
                        <FontAwesomeIcon
                            icon={icon}
                            className={'mr-2 lg:mr-1 inline'}
                        />
                        <span>{value}</span>
                    </CustomLink>
                )}
            </div>
        )
    } else {
        return (
            <div className='block md:inline py-1 md:py-0'>
                {cta ? (
                    <CustomLink
                        href={href}
                        cta={cta}
                        className='p-1 px-4 rounded-xl font-semibold bg-slate-500 hover:bg-indigo-800 text-gray-100 hover:text-indigo-100 text-base md:text-sm text-end'>
                        <FontAwesomeIcon
                            icon={icon}
                            className={'mr-2 lg:mr-1 inline'}
                        />
                        <span>{value}</span>
                    </CustomLink>
                ) : (
                    <CustomLink
                        href={href}
                        cta={cta}
                        className='font-semibold text-gray-700 text-base md:text-sm text-end hover:text-indigo-800'>
                        <FontAwesomeIcon
                            icon={icon}
                            className={'mr-2 lg:mr-1 inline'}
                        />
                        <span>{value}</span>
                    </CustomLink>
                )}
            </div>
        )
    }
}
