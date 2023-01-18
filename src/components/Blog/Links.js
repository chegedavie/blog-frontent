import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleDoubleLeft,faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons"

export default props => {
    const { links, onClick, currentPage, lastPage, className } = props
    const textLinks =links.filter(link => {
        const { label } = link
        return label.match(/[a-zA-Z]/)
    })
    console.log(textLinks)
    return (
        <div className={`${className} w-full`}>
            <div className='hidden md:block flex rounded divide-x divide-teal-400 links'>
            {links.map((link, index) => {
                let { url, label, active } = link
                let { page, disabled } = getPage(currentPage, lastPage, label)
                if((lastPage-3)<page<=lastPage) console.log(index);
                let icon
                let pos='left'
                if(label.match('&laquo')){
                    icon=faAngleDoubleLeft;
                    label='Prev'
                }
                else if(label.match('&raquo')){
                    label='Next'
                    icon=faAngleDoubleRight;
                    pos='right'
                }
                return (
                    <button
                        onClick={() => onClick(page)}
                        key={index}
                        className={`outline-none py-0 md:py-2 px-3 md:px-4 transition transition-colors duration-500 ease-in-out shadow ${
                            disabled
                                ? ''
                                : 'focus:shadow-inner hover:bg-teal-800 hover:text-teal-50 focus:bg-teal-800 focus:text-teal-50'
                        } ${
                            active
                                ? 'bg-teal-800 text-teal-50'
                                : disabled
                                ? 'text-teal-100 bg-teal-600 cursor-not-allowed'
                                : 'text-teal-100 bg-teal-600'
                        } ${url ? null : 'readonly'}`}
                        disabled={disabled}>
                        <span>{pos === 'right'?<span>{label}</span>:null}{icon && <FontAwesomeIcon icon={icon} className={pos==='right'?'pl-3':'pr-3'}/>}{pos === 'left'?<span>{label}</span>:null}</span>
                    </button>
                )
            })}
        </div>
        <div className='md:hidden mx-auto flex rounded divide-x divide-teal-400 links'>
            {textLinks.map((link, index) => {
                let { url, label, active } = link
                let { page, disabled } = getPage(currentPage, lastPage, label)
                console.log(label)
                let icon
                let pos='left'
                if(label.match('&laquo')){
                    icon=faAngleDoubleLeft;
                    label='Prev'
                }
                else{
                    label='Next'
                    icon=faAngleDoubleRight;
                    pos='right'
                }

                return (
                    <button
                        onClick={() => onClick(page)}
                        key={index}
                        className={`outline-none text-base py-2 px-4 md:px-4 transition transition-colors duration-500 ease-in-out shadow ${
                            disabled
                                ? ''
                                : 'focus:shadow-inner hover:bg-teal-800 hover:text-teal-50 focus:bg-teal-800 focus:text-teal-50'
                        } ${
                            active
                                ? 'bg-teal-800 text-teal-50'
                                : disabled
                                ? 'text-teal-100 bg-teal-600 cursor-not-allowed'
                                : 'text-teal-100 bg-teal-600'
                        } ${url ? null : 'readonly'}`}
                        disabled={disabled}>
                        <span className="flex gap-4 items-center">{pos === 'right'?<span>{label}</span>:null}<FontAwesomeIcon icon={icon} className={pos==='right'?'pl-2':'pr-2'}/>{pos === 'left'?<span>{label}</span>:null}</span>
                    </button>
                )
            })}
        </div>
        </div>
    )
}

function getPage (currentPage, lastPage,label) {
    let page = currentPage,
        disabled
    if (label.match('Next')) {
        if (currentPage !== lastPage) page++
        else {
            page = currentPage
            disabled = true
        }
    } else if (label.match('Prev')) {
        if (currentPage !== 1) page--
        else {
            page = currentPage
            disabled = true
        }
    } else {
        page = label
    }
    return { page, disabled }
}
