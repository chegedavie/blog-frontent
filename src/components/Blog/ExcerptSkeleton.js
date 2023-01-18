import ColoredSkeleton from '../ColoredSkeleton'

export default ({ count, className }) => {
    const arr = new Array(count)
    for (let i = 0; count > i; i++) {
        arr[i] = i
    }
    return (
        <div className='grid gap-4'>
            {arr.map((item, index) => {
                return (
                    <div className='relative rounded excerpt' key={index}>
                        <article
                            className={`relative bg-indigo-50 border border-indigo-50 shadow rounded text-gray-800 space-y-4 py-12 transition transition-colors duration-300 ease-in-out`}>
                            <div className='px-4 flex items-end gap-6'>
                                <ColoredSkeleton
                                    inline={true}
                                    height={50}
                                    width={50}
                                    circle={true}
                                />
                                <ColoredSkeleton width={200} />
                            </div>
                            <h2 className='text-lg font-semibold px-4'>
                                <ColoredSkeleton height={28} />
                            </h2>
                            <p className='text-base px-4'>
                                <ColoredSkeleton count={4} />
                            </p>
                            <div className='px-4 space-x-3'>
                                <ColoredSkeleton inline={true} width={100} height={30}/>
                                <ColoredSkeleton inline={true} width={100} height={30}/>
                            </div>
                            <div className='px-4 space-x-3 relative'>
                                <ColoredSkeleton inline={true} width={60} height={20}/>
                                <ColoredSkeleton inline={true} width={60} height={20}/>
                                <ColoredSkeleton inline={true} width={60} height={20}/>
                                <div className='absolute right-4 top-0'>
                                    <ColoredSkeleton inline={true} width={100} height={35}/>
                                </div>
                            </div>
                        </article>
                    </div>
                )
            })}
        </div>
    )
}
