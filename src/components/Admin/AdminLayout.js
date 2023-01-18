import AdminNav from './AdminNav'
import { useAuth } from '@/hooks/auth'
import { Layout, Menu, theme } from 'antd'
import AdminMenu from './AdminMenu'
import React, { useState } from 'react'
const { Header, Sider, Content } = Layout
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons'

export default ({ children, className }) => {
    const { user } = useAuth({ middleware: 'role_or_permission:Admin|Editor' })
    return (
        <div className='w-full md:flex relative'>
            <AdminNav user={user} className='sticky top-0 left-0' />
            <Layout className='min-h-screen bg-indigo-200 items-center w-full'>
                <Content style={{ overflow: 'initial' }} className={`${className} w-full`}>
                    {children}
                </Content>
            </Layout>
        </div>
    )
}