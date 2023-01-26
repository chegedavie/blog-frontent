import { Image } from 'antd'

export default props => {
    const { screenShot, className } = props
    if (screenShot !== undefined) {
        const { image, description } = screenShot
        return (
            <div
                className={className}
                style={{
                    backgroundImage: `url("/projects/${screenShot}")`,
                    backgroundSize: 'cover',
                }}>
				<div className='w-4/5 mx-auto'>
                <Image
					className='h-full w-full'
                    src={`/projects/${screenShot}`}
                    placeholder={
                        <Image
                            preview={false}
                            src={`/projects/${screenShot}`}
                            width={'100%'}
                            alt={description}
                        />
                    }
                />
                </div>
            </div>
        )
    }
}
