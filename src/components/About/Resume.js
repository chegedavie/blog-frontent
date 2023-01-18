import LinkButton from '../LinkButton'
import Education from './Education'
import Interests from './Interests'
import Skills from './Skills'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboard } from '@fortawesome/free-solid-svg-icons'
export default props => {
    const { interests, hobbies, education } = props
    return (
        <div className='p-2 lg:p-8 bg-white text-gray-800'>
            <h2 className='hidden text-2xl md:text-3xl leading-tight pb-6 font-semibold text-center text-gray-700'>
                Resume
            </h2>
            <div className='grid grid-cols-5 gap-6 md:gap-3'>
                <div className='col-span-5 md:col-span-3 shadow bg-white p-6 space-y-6'>
                    <Education education={education} className='px-2 md:px-0' />
                    <Skills className='p-6 bg-gray-200 rounded' />
                    <div className='pt-4 hidden lg:block'>
                    <ProjectsButton/>
                    </div>
                </div>
                <Interests
                    items={[interests, hobbies]}
                    className='col-span-5 md:col-span-2 shadow bg-white'
                />
            </div>
            <div className='block lg:hidden px-6 py-8'>
                <ProjectsButton/>
            </div>
        </div>
    )
}

const ProjectsButton = () => {
    return (
        <LinkButton
            href='portfolio'
            className='bg-gray-300 border border-gray-600 hover:border-indigo-900 focus:border-indigo-900 hover:bg-indigo-800 focus:bg-indigo-800 hover:text-indigo-50 w-1/2 md:w-1/3 lg:w-1/4 text-base rounded'>
            <FontAwesomeIcon
                icon={faClipboard}
                className='mr-2 h-4 w-4 inline'
            />
            Projects
        </LinkButton>
    )
}
