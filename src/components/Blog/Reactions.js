import Reaction from './Reaction'

const reactToComment = (postId, e) => {
  console.log('Post -> ', postId, ' had a reaction ',e)
  document.getElementById('reactions-div').classList.add('hidden')
}
export default props => {
  const { className } = props
  const reactions = [
    {
      emoji: <button className='text-2xl rounded-full'>&#128077;</button>
    },
    {
      emoji: <button className='text-2xl rounded-full'>&#128514;</button>
    },
    {
      emoji: <button className='text-2xl rounded-full'>&#128525;</button>
    },
    {
      emoji: <button className='text-2xl rounded-full'>&#128532;</button>
    },
    {
      emoji: <button className='text-2xl rounded-full'>&#128552;</button>
    },
    {
      emoji: <button className='text-2xl rounded-full'>&#128562;</button>
    }
  ]

  return (
    <section id='reactions' className={className}>
      <div className='relative flex'>
        <div className='text-center w-full'>
          <button
            onClick={() => {
              document
                .getElementById('reactions-div')
                .classList.toggle('hidden')
            }}
            className='text-lg rounded-full p-2 rounded-full bg-slate-800 border text-slate-200 border border-slate-300 flex items-center'
          >
            <i className='fas fa-thumbs-up'></i>
          </button>
        </div>
        <div
          className='hidden absolute flex justify-evenly p-1 bg-indigo-100 rounded shadow shadow-xl border border-indigo-200 z-10'
          id='reactions-div'
        >
          {reactions.map((reaction, index) => {
            return (
              <Reaction
                reaction={reaction}
                onClick={e => {
                  reactToComment(index, e)
                }}
                key={index}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
