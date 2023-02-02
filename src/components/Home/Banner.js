import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CustomLink from '../customLink'
import {
    faStar,
    faUserGraduate,
    faEnvelope,
} from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import SocialsCloud from '../SocialsCloud'
import LinkButton from '../LinkButton'

export default () => {
    return (
        <div
            className='bg-indigo-200/40 skills-cloud'
            style={{
                backgroundImage: "url('/bg1.jpg')",
                backgroundSize: 'cover',
            }}>
            <div className='relative py-6 bg-indigo-900/70'>
                <div
                    className='grid grid-cols-2 text-gray-800'
                    style={{ zIndex: -1 }}>
                    <div className='col-span-2 md:col-span-1 px-4 lg:px-12 py-6 lg:py-12 text-slate-800'>
                        <h1 className='tracking-tight leading-tight light-banner-text'>
                            <p className='text-3xl lg:text-4xl font-semibold text-slate-800'>
                                <FontAwesomeIcon
                                    icon={faUserGraduate}
                                    className='mr-4'
                                />
                                Proffesional
                            </p>
                            <p className='text-4xl lg:text-5xl font-semibold text-indigo-800'>
                                <span className='text-yellow-600/90 banner-text'>Web</span>{' '}
                                Developer
                            </p>
                        </h1>
                        <p className='mt-6 banner-text text-left text-indigo-50 text-sm md:text-base'>
                            Hi, my David Chege and I am a React developer with
                            proffiency in Laravel framework and PHP as well as
                            Tailwind CSS and Alpine Js.
                        </p>
                        <div>
                            {[1, 2, 3, 4, 5].map((item, index) => {
                                return (
                                    <i
                                        className={`fas fa-star ${
                                            item === 5
                                                ? 'text-gray-800'
                                                : 'text-indigo-700'
                                        }`}
                                        key={index}></i>
                                )
                            })}
                        </div>
                        <div className='pt-6 flex gap-4'>
                            <LinkButton className='text-sm font-bold text-indigo-50 bg-indigo-700 border border-indigo-50 hover:border-indigo-900 px-6 py-2 rounded'>
                                <FontAwesomeIcon
                                    icon={faGithub}
                                    className='fas fa-code mr-2'
                                />
                                <a
                                    target='_Blank'
                                    href='https://github.com/chegedavie'>
                                    Github
                                </a>
                            </LinkButton>
                            <LinkButton
                                className={`text-sm font-bold text-indigo-50 disabled:pointer-disabled bg-indigo-200/10 hover:bg-indigo-200/30 focus:bg-indigo-200/30 border px-6 py-2 rounded`}>
                                <FontAwesomeIcon icon={faEnvelope} className='mr-2'/>
                                <a target='_Blank' href='/contact'>
                                    Contact me
                                </a>
                            </LinkButton>
                        </div>
                    </div>
                    <div className='col-span-2 pr-6 py-4 md:col-span-1 hidden md:block '>
                        <div
                            className='grid gap-4 my-auto bg-indigo-50 shadow rounded-lg p-8 float-right banner-thumbnail transform origin-top -translate-x-8 -rotate-6 skew-y-9'
                            style={{ width: '300px', height: '100%' }}>
                            <img
                                src='/dc.png'
                                height='240px'
                                className='mx-auto'
                            />
                            <div className='w-full'>
                                <p className='text-center font-semibold text-base text-slate-800'>
                                    David Chege
                                </p>
                                <SocialsCloud
                                    className='space-x-3 text-lg text-center'
                                    iconClassName={
                                        'text-slate-800 hover:text-indigo-800'
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
