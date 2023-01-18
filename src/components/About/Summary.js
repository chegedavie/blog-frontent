import LinkButton from "../LinkButton"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faInfoCircle, faCircleInfo } from "@fortawesome/free-solid-svg-icons"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import Link from 'next/link'

export default (props)=>{
    const {summary,githubProfile}=props
    return (
        <section className="" style={{
            backgroundImage: "url('/bg1.jpg')",
            backgroundSize: 'cover',
        }}>
            <div className="grid grid-cols-3 bg-indigo-900/50">
                <div className='col-span-3 md:col-span-2 px-6 py-12 lg:py-12 lg:px-12 text-lg text-slate-900'>
                    <h2 className="text-2xl leading-tight pb-4 font-semibold banner-text text-indigo-50">
                        <FontAwesomeIcon icon={faCircleInfo} className='mr-2'/>
                         <span className="">Biography</span>
                    </h2>
                    <div className="sm:w-120 md:w-full text-base banner-text text-indigo-50">
                        {summary}
                    </div>
                    <div className="w-full pt-6">
                        <a target='_Blank' href={githubProfile}>
                        <LinkButton className='bg-gray-800 text-indigo-50 w-1/2 md:w-1/3 lg:w-1/4 text-base rounded' href="#"><FontAwesomeIcon icon={faGithub} className="mr-3"/> My Github</LinkButton>
                        </a>
                </div>
                </div>
                <div className="col-span-3 lg:col-span-1 hidden lg:block p-2 lg:py-12 pr-12">
                    <img src='/dc.png' className='w-full rounded bg-indigo-100'/>
                </div>
            </div>
        </section>
    )
}