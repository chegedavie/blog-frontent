import {
    faFacebook,
    faGithub,
    faLinkedin,
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default ({className,iconClassName}) => {
    return (
        <div className={className}>
            <a href='https://www.facebook.com/profile.php?id=100089562191824' className={iconClassName}>
                <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href='https://github.com/chegedavie' className={iconClassName}>
                <FontAwesomeIcon icon={faGithub} />
            </a>
            <a href='https://www.linkedin.com/in/david-chege-337887262/' className={iconClassName}>
                <FontAwesomeIcon icon={faLinkedin} />
            </a>
        </div>
    )
}
