import { faCaretUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default props => {
  let { skill, clickHandler, active } = props
  return (
    <div
      onClick={clickHandler}
      className='skill relative col-span-2 rounded-md border border-indigo-500 hover:border-slate-100 hover:cursor-pointer lg:col-span-1 p-3 transition transition-all duration-1000 ease-in-out'
    >
      <div className='font-bold skill-icon text-base flex items-center h-full'>
        <div className='text-center w-full m-auto '>
          {skill.icon ?? <FontAwesomeIcon icon={`fa-solids fa-${skill.faSVG}`} className='text-5xl'/>}
        </div>
      </div>
      <div className='absolute skill-foreground top-0 left-0 w-full h-full flex items-center bg-indigo-900/30 md:bg-gray-50/0 hover:bg-indigo-900/30' title={`Click here for more details on ${skill.name}`}>
        <div className='text-sm text-center w-full pointer-events-none'>
          <div className=' shadow rounded bg-gray-100 hover:bg-indigo-100 py-2 px-4 font-bold border w-4/5 lg:w-3/4 mx-auto block focus:hidden'>
            {skill.name}
          </div>
        </div>
      </div>
      <div
        className={`absolute -bottom-14 text-center w-full text-white hidden lg:${
          active === true ? 'block' : 'hidden'
        }`}
      >
        <FontAwesomeIcon icon={faCaretUp} className='text-5xl'/>
      </div>
    </div>
  )
}
