import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
export default props => {
    let {active,icon,className,...rest}=props
  return (
    <div className={className}>
      <button
      className={`hover:border hover:text-indigo-100 hover:bg-indigo-800 focus:border-0 focus:text-indigo-100 focus:bg-indigo-800 ${
        active
          ? 'border-indigo-100 text-indigo-100 bg-indigo-900'
          : 'border border-indigo-800 text-indigo-900 bg-indigo-200'
      }  shadow-lg shadow rounded-full p-1 lg:p-0 h-7 w-7 my-auto text-xs lg:text-sm text-center edit-button`}

      {...rest}
    >
      <span>
        <FontAwesomeIcon icon={icon}/>
      </span>
    </button>
    </div>
  )
}
