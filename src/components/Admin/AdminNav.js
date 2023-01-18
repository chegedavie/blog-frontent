import React, { useState } from 'react'
import {
    FileTextFilled,
    PlusOutlined,
    UserOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    LogoutOutlined,
    DashboardOutlined,
    CaretLeftOutlined,
    CaretRightOutlined,
} from '@ant-design/icons'
import { Button, Menu, Icon, Switch } from 'antd'
const SubMenu = Menu.SubMenu
import { useAuth } from '@/hooks/auth'
import Link from 'next/link'

export default ({ user, className }) => {
    const [collapsed, setCollapsed] = useState(false)
    const { logout } = useAuth()
    const [theme, setTheme] = useState('dark')
    const [current, setCurrent] = useState(null)

    const setActive = e => {
        setCurrent(e.key)
    }

    return (
        <div
            className={`${collapsed ? null : 'md:w-60'} relative`}
            style={{ backgroundColor: '#001529' }}>
            {React.createElement(
                collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                    className: 'p-2 absolute top-0 -right-12 hidden md:block',
                    onClick: () => setCollapsed(!collapsed),
                },
            )}
            <div className={className}>
			<div className={`${collapsed?'':'p-4'} flex items-center w-full`}>
			<div
                style={{
                    height: 32,
                    background:  '#001529',
                }} className={`text-slate-100 border flex items-center w-full rounded p-4`}>
                <DashboardOutlined className={collapsed?null:'pr-4'}/><span className={collapsed?'hidden':'inline'}>Dashboard</span>
            </div>
			</div>
                <Menu
                    theme={theme}
                    onClick={setActive}
                    defaultOpenKeys={['sub1']}
                    selectedKeys={[current]}
                    inlineCollapsed={collapsed}
                    mode='inline'>
                    <SubMenu
                        key='blog-submenu'
                        title='Blog'
                        icon={<FileTextFilled/>}>
                        <Menu.Item key='manage-blog' icon={<DashboardOutlined/>}>
                            <Link href='/admin/blog'>Manage Blog</Link>
                        </Menu.Item>

                        <Menu.Item key='create-post' icon={<PlusOutlined/>}>
                            <Link href='/admin/blog/create'>New post</Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu
                        title={user?.name}
                        icon={<UserOutlined />}
                        key='user-sub-menu'>
                        <Menu.Item key='logout' icon={<LogoutOutlined/>}>
                            <div onClick={logout}>logout</div>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        </div>
    )
}
