import { Image } from 'antd'

export default props => {
    const { screenShot, className } = props
    if (screenShot !== undefined) {
        const { image, description } = screenShot
        return (
            <div
                className={className}
                style={{
                    backgroundImage: `url("http://localhost:3000/projects/${screenShot}")`,
                    backgroundSize: 'cover',
                }}>
				<Image
                    width={'70%'}
					className='h-full w-full mx-auto'
                    src={`http://localhost:3000/projects/${screenShot}`}
                    placeholder={
                        <Image
                            preview={false}
                            src={`http://localhost:3000/projects/${screenShot}`}
                            width={'100%'}
                            alt={description}
                        />
                    }
                />
            </div>
        )
    }
}
