import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { MailOutlined } from '@ant-design/icons';
import {} from 'antd'
//import { faFacebook, faLinkedin, faSkype, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import SocialsCloud from '../SocialsCloud'
export default props => {
    const { className } = props
    return (
        <div className={className}>
            <div className='text-cente px-8 relative'>
                <h2 className='text-lg md:text-base md:font-semibold select-none pb-3'>
                    <span className='text-2xl font-semibold text-slate-800'>Get in touch</span>
                </h2>
                <div className='w-full pb-6'>
                    <p className='select-none text-justify tracking-tight leading-tight font-normal font-sans text-base text-slate-800'>
                        I would love to hear your thoughts! Send me an email and I will get back to you ASAP. I'm also available on socials, let's become friends! Talk to you soon.
                    </p>
                </div>
                <div className='space-y-2 pb-5'>
                    <p className=''>
                        Nakuru, Kenya.
                    </p>
                    <p className='flex items-end'>
                        <FontAwesomeIcon icon={faPhone}
                            className='text-xl mr-2 inline'
                        />
                        +(254) 792775649
                    </p>
                    <p className='flex items-end'>
                        <MailOutlined
                            className='text-xl mr-2 inline'
                        />
                        chegenganga2@gmail.com
                    </p>
                </div>
                <SocialsCloud className='text-cen space-x-3 text-base' iconClassName='opacity-70 hover:opacity-100 focus:opacity-100 text-slate-800 hover:text-indigo-800 focus:text-indigo-800 hover:cursor-pointer hover:cursor-pointer'/>
            </div>
        </div>
    )
}
