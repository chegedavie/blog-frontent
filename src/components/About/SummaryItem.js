import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faCheckCircle} from '@fortawesome/free-solid-svg-icons'
export default props => {
  const { title, summaryData, className } = props
  return (
    <div className={className}>
      <div className='w-full h-full p-6'>
        <h3 className='font-semibold text-cente text-xl pb-3 capitalize opacity-90'>
          {title}
        </h3>
        <div className='text-lg'>
          <ul>
            {summaryData &&
              summaryData.map((item, index) => {
                return (
                  <li key={index}>
                    <FontAwesomeIcon icon={faCheckCircle} className='opacity-80 mr-4 h-5 w-5 inline'/>
                    {item}
                  </li>
                )
              })}
          </ul>
        </div>
      </div>
    </div>
  )
}
