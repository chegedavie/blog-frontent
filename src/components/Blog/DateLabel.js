export default props => {
  const { date, className } = props
  return (
    <div className={`hidden date font-medium text-sm p-2 bg-gray-200 text-gray-800 ${className}`}>
      <div>{dateComponents(date)}</div>
    </div>
  )
}

export function dateComponents (date) {
  const dateObject = new Date(date)
  const currentDate = new Date()
  let label = ''
  const days = -dateObject.getDay() + currentDate.getDay()
  const months = -dateObject.getMonth() + currentDate.getMonth()
  const years = -dateObject.getFullYear() + currentDate.getFullYear()
  const hours = -dateObject.getHours() + currentDate.getHours()
  const minutes = -dateObject.getMinutes() + currentDate.getMinutes()
  const seconds = -dateObject.getSeconds() + currentDate.getSeconds()
  const retval = years || months || days || hours || minutes || seconds
  label = days
    ? ' days ago'
    : null ?? months
    ? ' months ago'
    : null ?? years
    ? ' years ago'
    : null ?? hours
    ? ' hours ago'
    : null ?? minutes
    ? ' minutes ago'
    : null ?? seconds
    ? ' seconds ago'
    : null

    const obj={years,months,days,hours,minutes,seconds}
    console.log(obj)
  return retval + label
}


