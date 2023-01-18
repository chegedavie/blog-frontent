import { useEffect, useState } from 'react'
import Skill from './Skill'
import SkillDescription from './SkillDescription'
import RoundedIconButton from '../RoundedIconButtton'
import skillsData from './skillsData'
import { faArrowLeft, faArrowRight, faCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function initCarousel (start, length) {
  const final = length - 4
  return (direction = 'forward',to=-1) => {
    if (direction === 'forward') {
      if (start === final) start = 0
      else {
        start++
      }
    } else {
      if (start === 0) start = final;
      else if(to>0) start=to;
      else {
        start--
      }
    }
    //alert(start)
    return start
  }
}
const scroll = initCarousel(0, skillsData && skillsData.length)
const rangeCreator = (start, end) => {
  let range = []
  for (start; end >= start; start++) {
    range.push(start)
  }
  return range
}
export default () => {
  const handleClick = index => {
    setTimeout(() => {
      setSkill(index)
    }, 300)
  }

  const [skillIndex, setSkill] = useState(null)
  const [current, setCurrent] = useState(0)
  const sliceSkills = skillsData.slice(current, current + 4)
  const indicators = rangeCreator(0, skillsData.length - 4)


  return (
    <div className='skills-clou relative py-6 lg:py-12 px-10 lg:px-12 bg-indigo-900 items-center transition transition-all duration-1000 ease-in-out'>
      <h2 className='text-slate-100 text-2xl font-bold text-center pb-6'>
        <i className='fas fa-clipboard-list mr-4'></i>Technical stack
      </h2>
      <div className='relative'>
        <div className='absolute -left-10 h-full flex items-center'>
          <RoundedIconButton
            type='button'

            onClick={() => {
              //clearInterval(nextInterval)
              setCurrent(scroll('back'))
            }}
            icon={faArrowLeft}
          />
        </div>
        <div
          className='grid grid-cols-4 gap-3 transition-transform duration-1000 ease-in-out'
          onMouseLeave={() => {
            setTimeout(() => {
              setSkill(null)
            }, 300)
          }}
        >
          {sliceSkills.map((skill, index) => {
            return (
              <Skill
                skill={skill}
                clickHandler={e => {
                  handleClick(index, setSkill)
                }}
                key={index}
                index={index}
                active={index === skillIndex}
              />
            )
          })}
          <div className='col-span-4'>
            <SkillDescription skill={sliceSkills[skillIndex]} />
          </div>
        </div>
        <div className='absolute -right-10 top-0 h-full flex items-center'>
          <RoundedIconButton
            type='button'
            onClick={() => {
              //clearInterval(nextInterval)
              setCurrent(scroll('forward'))
            }}
            icon={faArrowRight}
            className='my-auto'
          />
        </div>
      </div>
      <div className='space-x-2 text-center text-xl pt-4'>
        {indicators.map((item, index) => {
          if (index === current) {
            return <FontAwesomeIcon icon={faCircle} className='text-indigo-50' key={index}/>
          } else {
            return <FontAwesomeIcon icon={faCircle} className='text text-indigo-400' onClick={()=>{
              //(nextInterval)
              scroll('',index)
              setCurrent(index)
            }} key={index}/>
          }
        })}
      </div>
    </div>
  )
}
