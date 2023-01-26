import { Tabs } from 'antd'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
const TabPane = Tabs.TabPane

export default ({ defaultKey,setOpen }) => {
    return (
        <Tabs defaultActiveKey={defaultKey}>
            <TabPane tab='Login' key='1' className='flex items-center'>
                <LoginForm setOpen={setOpen}/>
            </TabPane>
            <TabPane tab='Create Account' key='2'>
                <RegisterForm setOpen={setOpen}/>
            </TabPane>
        </Tabs>
    )
}
