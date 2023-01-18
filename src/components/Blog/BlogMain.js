import Blog from './Blog'
import Links from './Links'

export default props => {
    const { blogs, links, setPage, page, last_page, className } = props
    return (
        <main className={className}>
            <div className='grid gap-2'>
                <h2 className='font-semibold text-gray-800 text-lg hidden'>
                    Posts
                </h2>
                {blogs.map((blog, index) => {
                    return <Blog blog={blog} key={index} />
                })}
                <Links
                    links={links}
                    onClick={page => {
                        setPage(page)
                    }}
                    currentPage={Number(page)}
                    lastPage={Number(last_page)}
                    className='hidden md:block bg-indigo-50 p-2 rounded'
                />
            </div>
        </main>
    )
}
