import { randomColor } from '@/scripts/Helpers'

const BlogLabel = props => {
  const { value,color,mainColor} = props
  //console.log(randomColor(70))
  return value? (
    <span
      className={`${color} py-1 px-4 text-xs rounded-full`}
      style={!color?mainColor?{ backgroundColor: mainColor }:{backgroundColor: randomColor(70)}:{}}
    >
      {value}
    </span>
  ):null
}

export default BlogLabel

