import dynamic from 'next/dynamic'
import remarkGfm from 'remark-gfm';
const MarkdownPreview = dynamic(() => import('@uiw/react-markdown-preview'), { ssr: false })

export default (props) => {
    const {source}= props
    console.log(MarkdownPreview)
  return (
    <div>
      <div className="wmde-markdown-var"> </div>
      <MarkdownPreview rehypePlugins={[]} className='bg-indigo-100 ' remarkPlugins={[remarkGfm,]} style={{backgroundColor:'rgb(238, 242, 255)'}} source={source} warpperElement={{"data-color-mode": "light"}}/>
    </div>
  );
}
