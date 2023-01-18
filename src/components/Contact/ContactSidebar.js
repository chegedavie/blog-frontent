import { PhoneIcon, PhoneArrowUpRightIcon } from '@heroicons/react/24/outline'
import { faPhoneSquare, faUserCircle, faLocation, faBlenderPhone, faMobilePhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faLinkedin, faSkype, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import SocialsCloud from '../SocialsCloud'
export default props => {
    const { className } = props
    return (
        <div className={className}>
            <div className='text-cente space-y-2 lg:space-y-4 px-2 py-4 md:px-2 md:py-6'>
                <h2 className='flex items-end space-x-3 text-lg md:text-base md:font-semibold capitalize select-none contact-section-heading md:md-contact-section-heading'>
                    <PhoneArrowUpRightIcon className='h-6 inline' />{' '}
                    <div>Contact information</div>
                </h2>
                <div className='w-full pt-4 pb-2'>
                    <p className='select-none w-5/6 md:w-full md:font-semibold md:font-normal'>
                        I'd love to have a conversation with you. Send me a
                        message any time.
                    </p>
                </div>
                <div className='space-y-2'>
                    <p className='contact-item'>
                        <FontAwesomeIcon
                            icon={faUserCircle}
                            className='text-xl mr-2 inline text-indigo-200'
                        />
                        David Chege
                    </p>
                    <p className='contact-item'>
                        <FontAwesomeIcon
                            icon={faLocation}
                            className='text-xl mr-2 inline text-indigo-200'
                        />
                        Nakuru, Kenya.
                    </p>
                    <p className='contact-item'>
                        <FontAwesomeIcon
                            icon={faMobilePhone}
                            className='text-xl mr-2 inline text-indigo-200'
                        />
                        +254 792775649
                    </p>
                </div>
                <SocialsCloud className='text-cen space-x-3 text-base' iconClassName='opacity-80 hover:opacity-100 focus:opacity-100 text-indigo-100 hover:text-teal-50 focus:text-teal-50 hover:cursor-pointer hover:cursor-pointer'/>
            </div>
        </div>
    )
}
