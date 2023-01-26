import React from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input } from 'antd'
import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
export default ({setOpen}) => {
    const router = useRouter()
    const currentPage=router.pathname

    const { login,user } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: currentPage,
    })

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [shouldRemember, setShouldRemember] = useState(false)
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)

    useEffect(() => {
        if (router.query.reset?.length > 0 && errors.length === 0) {
            setStatus(atob(router.query.reset))
        } else {
            setStatus(null)
        }
    })

    const submitForm = async () => {

        login({
            email,
            password,
            remember: shouldRemember,
            setErrors,
            setStatus,
        })
    }
	useEffect(()=>{
		user?setOpen(false):null
	},[user])

    return (
        <Form
            name='normal_login'
            className='login-form'
            initialValues={{ remember: true }}
            onFinish={submitForm}>
            <Form.Item
                name='email'
                rules={[
                    { required: true, message: 'Please input your Email!' },
                ]}>
                <Input
                    prefix={<UserOutlined className='site-form-item-icon' />}
                    placeholder='Username'
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />
            </Form.Item>
            <Form.Item
                name='password'
                rules={[
                    { required: true, message: 'Please input your Password!' },
                ]}>
                <Input
                    prefix={<LockOutlined className='site-form-item-icon' />}
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                />
            </Form.Item>
            <Form.Item>
                <Form.Item name='remember' valuePropName='checked' noStyle>
                    <Checkbox
                        onChange={event =>
                            setShouldRemember(event.target.checked)
                        }>
                        Remember me
                    </Checkbox>
                </Form.Item>

                <Link
                    href='/forgot-password'
                    className='underline text-sm text-gray-600 hover:text-gray-900'>
                    Forgot your password?
                </Link>
            </Form.Item>

            <Form.Item>
                <Button
                    type='primary'
                    htmlType='submit'
                    className='login-form-button text-gray-800'>
                    Log in
                </Button>
            </Form.Item>
        </Form>
    )
}
