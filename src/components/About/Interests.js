import SummaryItem from './SummaryItem'
export default props => {
  const { items, className } = props
  return (
    <section className={className}>
      <div className='text-gray-800'>
        <div className='grid grid-cols-3 gap-2'>
          {items.map((item, index) => {
            let summary = ''
            const { title, data } = item
            if (!data) summary = item.summary
            else summary = undefined
            return (
              <SummaryItem
                summaryData={data}
                title={title}
                key={index}
                summary={summary}
                className='col-span-3'
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
