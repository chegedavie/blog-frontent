import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'


function getClassName (className,router,href) {
  let processedClassName=className
  let classesArray = className.split(' ')
  let [normalColor] = classesArray.filter(item => {
    return item.startsWith('text') && !item.startsWith('text-s')
  })
  let [hoverColor] = classesArray.filter(item => {
    return item.startsWith('hover:text')&& !item.startsWith('hover:text-s')
  })
  let [normalBg] = classesArray.filter(item => {
    return item.startsWith('bg')
  })
  let [bgHover]= classesArray.filter(item => {
    return item.startsWith('hover:bg')&& !item.startsWith('hover:text-s')
  })
  let processedBg
  if (router.pathname === href) {
    processedClassName= classesArray.join(' ').replace(normalColor,hoverColor.replace('hover:',''))
    processedBg= bgHover && processedClassName.replace(normalBg,bgHover.replace('hover:','')).replace(bgHover,'')

  }
  return {processedClassName, processedBg}
}
export default (props) => {
  const { href, children, className,cta }=props
  const router = useRouter()
  const {processedClassName, processedBg,...rest}=getClassName(className,router,href)
  return (
    <Link href={href} className={processedBg?processedBg:processedClassName}>{children}</Link>
  )
}
