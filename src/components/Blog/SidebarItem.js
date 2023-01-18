import Link from 'next/link'
export default props => {
  const { title, label, className,id,type } = props
  return (
    <div className={className}>
      <Link href={`/${type}/${id}`} className='hover:text-indigo-800'>
        <div className='w-full px-2'>
          <p className='font-semibold'>{title.slice(0, 60) + '...'}</p>
        </div>
      </Link>
    </div>
  )
}
