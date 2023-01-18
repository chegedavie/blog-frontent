import skillsData from '../Home/skillsData'
import { randomColor } from '@/scripts/Helpers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUserGraduate} from '@fortawesome/free-solid-svg-icons'


export default props => {
    const skills = skillsData.map(item => {
        const { name, faSVG } = item
        return { name, faSVG }
    })
    const { className } = props
    return (
        <div className={className}>
            <h3 className='font-bold text-slate-800'>
                <FontAwesomeIcon icon={faUserGraduate} className='mr-3'/>
                My skills
            </h3>
            <div className='w-full space-x-3 space-y-3'>
                {skills.map((skill, index) => {
                    return <Skill key={index} skill={skill}/>
                })}
            </div>
        </div>
    )
}

const Skill = ({ skill }) => {
    const { name, faSVG } = skill
    const bg=randomColor(70)
    return (
        <button
            disabled={true}
            className='py-1 md:py-2 px-2 md:px-4 rounded text-gray-200 text-sm'
            style={{ backgroundColor: bg }}>
                {faSVG !== '' && <FontAwesomeIcon icon={faSVG} className='mr-2 text-lg'/>}
            {name}
        </button>
    )
}
