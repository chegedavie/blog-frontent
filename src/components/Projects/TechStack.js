import TechStackIcons from "@/scripts/TechStackIcons"
export default props => {
  const { techStack } = props
  if (techStack) {
    return (
      <div className='text-center py-6 lg:py-12 space-x-4'>
        {techStack.map((stack,index) => {
          return (
            <button
              type='button'
              disabled={true}
              className='bg-slate-500 text-slate-100 rounded border border-slate-300 py-1 px-2'
              key={index}
            >
              <i className={`mr-2 fab fa-${TechStackIcons[stack]}`}></i>
              {stack}
            </button>
          )
        })}
      </div>
    )
  }
}
