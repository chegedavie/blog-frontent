import { useState } from 'react'
import {
    MailOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons'
import { Button, Menu, Icon, Switch } from 'antd'
const SubMenu = Menu.SubMenu
import { useAuth } from '@/hooks/auth'
import Link from 'next/link'


export default ({ user,current, setActive }) => {
    const {logout}=useAuth()
    return (
        <Menu
            theme='dark'
            onClick={setActive}
            defaultOpenKeys={['sub1']}
            selectedKeys={[current]}
            mode='inline'>
            <Menu.SubMenu
                key='blog-submenu'
                title='Blog'
                icon={<MailOutlined />}>
                <Menu.Item key='manage-blog'>
                    <Link href='/admin/blog'>Manage Blog</Link>
                </Menu.Item>

                <Menu.Item key='create-post' itemIcon={<MenuFoldOutlined />}>
                    <Link href='/admin/blog/create'>New post</Link>
                </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu title={user?.name} icon={<MailOutlined />} key='user-sub-menu'>
                <Menu.Item key='logout'>
                    <div onClick={logout}>logout</div>
                </Menu.Item>
            </Menu.SubMenu>
        </Menu>
    )
}
