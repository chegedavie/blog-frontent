import ScreenShots from "./screenShots"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faCheckCircle, faCode} from '@fortawesome/free-solid-svg-icons'

export default (props)=>{
    const {project}= props
    if(project){
        const {features,screenShots}=project
        return(
            <section className="bg-indigo-100 space-y-8 px-3 lg:px-12 py-6 lg:py-16">
                <h2 className="text-center text-2xl lg:text-3xl text-gray-800 font-semibold">
				<FontAwesomeIcon icon={faCode} className='fas fa-code mr-4'/>Features</h2>
                <div className="grid grid-cols-2 rounded md:h-min-96">
                    <div className="col-span-2 md:col-span-1 rounded-t md:rounded- md:rounded-t-0">
                        <ScreenShots screenShots={screenShots?screenShots:[]}/>
                    </div>
                    <div className="col-span-2 md:col-span-1 rounded-b md:rounded-r md:rounded-b-0 space-y-2 bg-slate-50 p-6 py-10 select-none md:border-l">
                        {features.map((feature,index)=>{
                            return <div key={index} className="w-full flex lg:text-lg text-gray-900"><div className="w-1/12">
							<FontAwesomeIcon icon={faCheckCircle} className='fas fa-check-circle opacity-70'/></div><div className="w-11/12">{feature}</div></div>
                        })}
                    </div>
                </div>
            </section>
        )
    }
}