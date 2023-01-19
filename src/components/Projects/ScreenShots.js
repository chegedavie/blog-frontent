import { useEffect, useState } from 'react'
import RoundedIconButtton from '../RoundedIconButtton'
import ScreenShot from './ScreenShot'
import { Carousel } from 'antd'
import { faArrowLeft, faArrowRight, faCircle } from '@fortawesome/free-solid-svg-icons'

export function carouselCurry () {
  let current = 0
  return (action = 'next',length=0) => {
    let last = length-1
    if (action === 'next') {
      if (current === last) current = 0;
      else {
        current++
    }
    } else {
      if (current === 0) current = last;
      else {
        current--
    }
    }
    return current
  }
}

const carousel=carouselCurry()

export default props => {
  const { screenShots } = props
  const [imgIndex, setImageIndex] = useState(0)

  useEffect(()=>{
    console.count('caroused')
  },[imgIndex])

  if (screenShots !== undefined && screenShots.length && screenShots.length>0) {
    const screenShot = screenShots[imgIndex]
    return (
      <div className='w-full h-48 md:h-full relative shadow-inner shadow-lg'>
        <div className='flex items-center bg-transparent h-full absolute left-2 top-0 z-10'>
          <RoundedIconButtton icon={faArrowLeft} onClick={()=>{setImageIndex(carousel('prev',screenShots.length))}}/>
        </div>
        <ScreenShot screenShot={screenShot} className='w-full h-full flex items-center' />
        <div className='flex items-center bg-transparent h-full absolute right-2 top-0 z-10'>
          <RoundedIconButtton icon={faArrowRight} onClick={()=>{setImageIndex(carousel('next',screenShots.length))}}/>
        </div>
      </div>
    )
  }
}

export const smallScrns= props => {
  const { screenShots } = props

  return screenShots?.length ? (
      <Carousel className='w-full relative shadow-inner shadow-lg border p-4 border-red-500' autoplay>
          {screenShots.map((screenShot, index) => {
              return (
                  <ScreenShot
                      screenShot={screenShot}
                      className='w-full h-full border p-4 border-red-500'
                      key={index}
                  />
              )
          })}
      </Carousel>
  ) : null
}
