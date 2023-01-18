import Project from './Project'
import projects from './projects.json'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboardCheck } from '@fortawesome/free-solid-svg-icons'
const Projects = (props) => {
  const { heading, portfolio, className, headingColor, bgImage } = props
  const featured = projects.slice(0, 4)
  return (
    <div id='projects' className={`py-6 md:py-12 px-4 md:px-12 ${className}`}>
      {heading ? (
        <div
          className={` text-2xl font-bold text-center pb-8 md:pb-12 ${
            headingColor ? headingColor : 'text-slate-500'
          }`}
        >
          <span className=''>
            <i className='mr-4'>
              <FontAwesomeIcon icon={faClipboardCheck}/>
            </i>
            {heading}
          </span>
        </div>
      ) : null}
      <div className='grid grid-cols-2 w-full gap-4 bg-opacity-100  px-0 md:px-12 lg:px-0'>
        {portfolio === false &&
          featured.map((project, index) => {
            return <Project project={project} key={index} index={index} />
          })}
        {portfolio === true &&
          projects.map((project, index) => {
            return <Project device={true} project={project} key={index} index={index} />
          })}
      </div>
    </div>
  )
}

export default Projects
