import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'

export default props => {
  const { education, className } = props
  const {title,summary}=education
  return (
    <div className={className}>
      <div className='w-full h-full text-gray-800'>
        <h3 className='font-semibold text-cente text-xl pb-3 capitalize'>
        <FontAwesomeIcon icon={faGraduationCap} className='mr-4 h-8 w-8 inline'/>{title}
        </h3>
        <div className='text-lg'>{summary}</div>
      </div>
    </div>
  )
}
