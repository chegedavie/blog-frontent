import ContactForm from "./ContactForm"
import ContactSidebar from "./ContactSidebar"
import { getCsrfToken } from '@/redux/features/apiSlice'

export default ()=>{
    getCsrfToken()
    return(
        <section className="p-0 md:px-6 md:py-6 h-full flex items-center" >
            <h1 className='text-indigo-900/90 hiddn md:pb-4 font-bold leading-tight text-xl lg:text-2xl'><span className="hidden">Pull request</span></h1>
            <div className="grid grid-cols-5 lg:grid-cols-4 rounded border-t md:border-0 border-indigo-900 shadow shadow-lg w-full bg-indigo-900/20">
                <ContactSidebar className='col-span-5 md:col-span-2 lg:col-span-1 bg-indigo-900 md:bg-indigo-900/90 text-indigo-200 md:text-indigo-50 text-sm p-3 lg:p-4 md:rounded-l md:rounded-r-none shadow border-r'/>
                <ContactForm className='col-span-5 md:col-span-3 lg:col-span-3 bg-indigo-700/20 p-3 lg:p-8 text-sm md:rounded-r md:rounded-l-none'/>
            </div>
        </section>
    )
}