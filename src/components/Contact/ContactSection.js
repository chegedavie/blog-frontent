import ContactForm from "./ContactForm"
import ContactSidebar from "./ContactSidebar"
import { getCsrfToken } from '@/redux/features/apiSlice'

export default ()=>{
    getCsrfToken()
    return(
        <section className="h-full flex items-center" >
            <h1 className='text-indigo-900/90 hiddn md:pb-4 font-bold leading-tight text-xl lg:text-2xl'></h1>
            <div className="grid grid-cols-5 rounded border-t md:border-0 border-indigo-900 shadow shadow-lg w-full bg-indigo-900/20">
                <ContactSidebar className='col-span-5 md:col-span-2 bg-slate-50/80 text-slate-500 font-semibold text-sm md:rounded-l md:rounded-r-none py-4 md:py-12'/>
                <ContactForm className='col-span-5 md:col-span-3 bg-white px-3 lg:px-8 text-sm md:rounded-r md:rounded-l-none py-4 md:py-12'/>
            </div>
        </section>
    )
}