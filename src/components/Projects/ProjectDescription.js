import LinkButton from '../LinkButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

export default props => {
    const { project } = props

    if (project) {
        return (
            <section
                className=''
                style={{
                    backgroundImage: `url("/bg1.jpg")`,
                    backgroundSize: 'cover',
                }}>
                <div className='bg-indigo-900/50 pt-4 pb-10'>
                    <div className='grid grid-cols-2 gap-6'>
                        <div className='col-span-2 md:col-span-1 text-gray-800 break-words px-3 lg:px-12 py-0 lg:py-8'>
                            <div className='space-y-3 text-gray-800 lg:text-lg'>
                                <h1 className='text-yellow-600/90 pb-4 font-bold leading-tight text-2xl lg:text-3xl'>
                                    Project:{' '}
                                    <span className='block md:inline text-indigo-700/90'>
                                        {project.title}
                                    </span>
                                </h1>
                                <h2 className='font-semibold banner-text text-indigo-50'>
                                    Description
                                </h2>
                                <p className='banner-text text-indigo-50 text-base'>
                                    {project.description}
                                </p>
                                <div className='pt-6 flex gap-3'>
                                    <LinkButton className='text-sm font-bold text-indigo-50 bg-indigo-700 border border-indigo-50 hover:border-indigo-900 px-6 py-2 rounded'>
                                        <FontAwesomeIcon
                                            icon={faGithub}
                                            className='fas fa-code mr-2'
                                        />
                                        <a
                                            target='_Blank'
                                            href={project.github}>
                                            Github
                                        </a>
                                    </LinkButton>
                                    <LinkButton
                                        className={`text-sm font-bold text-indigo-50 disabled:pointer-disabled bg-indigo-200/10 hover:bg-indigo-200/30 focus:bg-indigo-200/30 border ${
                                            project.demo.complete
                                                ? 'border-indigo-50'
                                                : 'border-red-300'
                                        } px-6 py-2 rounded`}>
                                        <FontAwesomeIcon
                                            icon={faEye}
                                            className={`${
                                                project.demo.complete
                                                    ? 'mr-2'
                                                    : 'hidden'
                                            }`}
                                        />
                                        {project.demo.complete ? (
                                            <a
                                                target='_Blank'
                                                href={project.demo.link}>
                                                Demo
                                            </a>
                                        ) : (
                                            <span className='text-red-300'>
                                                In Progress
                                            </span>
                                        )}
                                    </LinkButton>
                                </div>
                            </div>
                        </div>
                        <div className='col-span-2 md:col-span-1 md:pr-12 p-3 lg:py-8'>
                            {project.videoPath && (
                                <video
                                    src={project.videoPath}
                                    id='video'
                                    controls={true}
                                    autoPlay
                                    className={
                                        project.videoPath ? 'block' : 'hidden'
                                    }></video>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}
