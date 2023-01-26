import {
  Form, Input, Tooltip, Icon, Row, Col, Checkbox, Button,
} from 'antd';
import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
}
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
}

export default function RegistrationForm({setOpen}) {
	const router = useRouter()
    const currentPage=router.pathname
    const [form] = Form.useForm()
    const { register,user } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: currentPage,
    })

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [termsAgreement, setTermsAgreement] = useState(false)
    const [errors, setErrors] = useState([])

    const submitForm = () => {
        register({
            name,
            email,
            password,
            password_confirmation: passwordConfirmation,
            setErrors,
        })
    }
	useEffect(()=>{
		user?setOpen(false):null
	},[user])
    return (
        <Form
            {...formItemLayout}
            form={form}
            name='register'
            onFinish={submitForm}
            scrollToFirstError>
            <Form.Item
                {...formItemLayout}
                label='Name'
				rules={[
                        {
                            required: true,
                            message: 'Please input your name!',
                            whitespace: true,
                        },
                    ]}>
                
                    <Input
                        value={name}
                        onChange={event => setName(event.target.value)}
                    />
            </Form.Item>
            <Form.Item
                name='email'
                label='E-mail'
                rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                    },
                ]}>
                <Input
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />
            </Form.Item>

            <Form.Item
                name='password'
                label='Password'
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
                hasFeedback>
                <Input.Password
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                />
            </Form.Item>

            <Form.Item
                name='confirm'
                label='Confirm Password'
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator (_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve()
                            }
                            return Promise.reject(
                                new Error(
                                    'The two passwords that you entered do not match!',
                                ),
                            )
                        },
                    }),
                ]}>
                <Input.Password
                    value={passwordConfirmation}
                    onChange={event =>
                        setPasswordConfirmation(event.target.value)
                    }
                />
            </Form.Item>

            <Form.Item
                name='agreement'
                valuePropName='checked'
                rules={[
                    {
                        validator: (_, value) =>
                            value
                                ? Promise.resolve()
                                : Promise.reject(
                                      new Error('Should accept agreement'),
                                  ),
                    },
                ]}
                {...tailFormItemLayout}>
                <Checkbox
                    defaultChecked={termsAgreement}
                    onChange={e => {
                        setTermsAgreement(e.target.checked)
                    }}>
                    I have read the <a target={'_blank'} href='/terms'>agreement</a>
                </Checkbox>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
                <Button type='primary' htmlType='submit' className='text-gray-800'>
                    Register
                </Button>
            </Form.Item>
        </Form>
    )
}

