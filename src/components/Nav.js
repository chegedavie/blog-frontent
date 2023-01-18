import NavLink from './NavLink'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faBars,
    faHome,
    faClipboardList,
    faFileAlt,
    faEnvelope,
    faInfoCircle,
    faSignIn,
    faUserPlus,
} from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import DrawerMain from './Navigation/DrawerMain'
import { useAuth } from '@/hooks/auth'
const Nav = props => {
    const { user } = useAuth({ middleware: 'guest' })
    const [open, setOpen] = useState(false)
    const [defaultKey, setDefaultKey] = useState(1)

    let { type, invertSmall } = props
    if (!type) type = 'inverted'

    const hideNav = () => {
        let nav = document.getElementById('nav'),
            className = nav.className
        if (className.includes('hidden')) {
            nav.classList.remove('hidden')
        } else {
            nav.classList.add('hidden')
        }
    }
    return (
        <div className='sticky top-0 left-0 z-20 shadow'>
            <div>
                <div
                    className={`w-full ${
                        type === 'inverted' ? 'bg-indigo-900' : 'bg-indigo-50'
                    } ${
                        invertSmall ? 'bg-indigo-900 md:bg-indigo-50' : null
                    } items-center flex-0 md:flex`}>
                    <div
                        className={`px-4 ${
                            type === 'inverted'
                                ? 'text-indigo-200/80'
                                : 'text-gray-800'
                        } ${
                            invertSmall
                                ? 'text-indigo-200/80 md:text-gray-800'
                                : null
                        } py-2 md:py-0 text-lg shadow md:shadow-none border-indigo-600/50 font-normal flex items-center`}>
                        <p className='w-full py-2'>
                            <span className='font-semibold'>{`<{{ David Chege }}>`}</span>
                            <button
                                className='h-9 w-9 px-2 rounded inline md:hidden float-right focus:outline-none focus:ring-0 outline-none ring-0 border'
                                onClick={hideNav}>
                                <span>
                                    <FontAwesomeIcon icon={faBars} />
                                </span>
                            </button>
                        </p>
                    </div>
                    <nav
                        className='hidden md:inline mx-auto px-4 py-3 md:px-0 space-x-0 md:space-x-4 space-y-1 md:space-y-0 justify-evenly transition duration-1000 ease-in-out'
                        id='nav'>
                        <NavLink
                            href='/'
                            value='Home'
                            icon={faHome}
                            type={type}
                            key='home'
                        />
                        <NavLink
                            href='/about'
                            value='About'
                            icon={faInfoCircle}
                            type={type}
                            key='info'
                        />
                        <NavLink
                            href='/portfolio'
                            value='Projects'
                            icon={faClipboardList}
                            type={type}
                            key='projects'
                        />
                        <NavLink
                            href='/blog'
                            value='Blog'
                            icon={faFileAlt}
                            type={type}
                            key='blog'
                        />
                        <NavLink
                            href='/contact'
                            value='Contact'
                            icon={faEnvelope}
                            type={type}
                            key='contacts'
                        />
                        <button
                            className={`${
                                type === 'inverted'
                                    ? 'text-indigo-300/80 font-normal text-base md:text-sm hover:text-indigo-100'
                                    : 'font-semibold text-gray-700 text-base md:text-sm hover:text-indigo-800'
                            } ${user ? 'hidden' : ''} bg-none`}
                            onClick={() => {
                                setDefaultKey(1)
                                setOpen(true)
                            }}
                            key='login'>
                            <FontAwesomeIcon
                                icon={faSignIn}
                                className='mr-2 lg:mr-1 inline'
                            />
                            Login
                        </button>
                        <button
                            className={`${
                                type === 'inverted'
                                    ? 'lowercase p-1 px-4 rounded-xl bg-indigo-100 hover:bg-indigo-100 text-indigo-700/70 hover:text-indigo-800 font-normal text-base md:text-sm text-end'
                                    : 'lowercase p-1 px-4 rounded-xl font-semibold bg-slate-500 hover:bg-indigo-800 text-gray-100 hover:text-indigo-100 text-base md:text-sm text-end'
                            } ${user ? 'hidden' : ''}`}
                            type={type}
                            onClick={() => {
                                setDefaultKey(2)
                                setOpen(true)
                            }}
                            key='signup'>
                            <FontAwesomeIcon
                                icon={faUserPlus}
                                className='mr-2 lg:mr-1 inline'
                            />
                            Signup
                        </button>
                    </nav>
                </div>
            </div>
            <DrawerMain open={open} setOpen={setOpen} defaultKey={defaultKey} />
        </div>
    )
}

export default Nav
