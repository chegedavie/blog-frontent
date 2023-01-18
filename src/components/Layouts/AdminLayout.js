import Navigation from '@/components/Layouts/Navigation'
import { useAuth } from '@/hooks/auth'
import AdminNavigation from '../Navigation/AdminNavigation';

const AdminLayout=({children})=>{
    const {user}=useAuth({middleware:'auth'});
    return (
        <div className='w-full grid grid-cols-4 lg:grid-cols-6 relative bg-gray-100'>
            <AdminNavigation/>
            <section className='col-span-4 md:col-span-3 lg:col-span-5 bg-red-100'>{children}</section>
        </div>

    )
}
export default AdminLayout;