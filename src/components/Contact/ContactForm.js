import { useState } from "react";
import { useSendMessageMutation } from "@/redux/features/apiSlice";
import {BounceLoader} from 'react-spinners'
import {Input} from 'antd'

export default (props)=>{
    const {className}=props
    const [message,setMessage]=useState('')
    const [firstname,setFirstName]=useState('')
    const [lastname,setLastName]=useState('')
    const [subject,setSubject]=useState('')
    const [email,setEmail]=useState('')
    const [sendMessage,{isLoading:isSending}]=useSendMessageMutation()

    const doSendMessage=()=>{
        if(message && firstname && lastname && email && subject){
            sendMessage({firstname,lastname,email, subject,message})
            document.forms[0].reset()
            setMessage('')
            setFirstName('')
            setLastName('')
            setMessage('')
            setEmail('')
            setSubject('')
        }
    }

    return (
        <div className={className}>
            <form name='contactm' className='w-full' onSubmit={e=>{
                e.preventDefault()
                doSendMessage()
                }}>
                <div className="grid grid-cols-2 gap-4">
                    <Input type='text' placeholder="First name" name='first-name' id='first-name' onChange={(e)=>{setFirstName(e.target.value)}} className='col-span-2 border hover:border-indigo-800 rounded hover:outline-0 hover:ring-0 focus:outline-none focus:ring-0' required={true}/>
                    <Input type='text' placeholder='Last name' name='last-name' onChange={(e)=>{setLastName(e.target.value)}} className='col-span-2 border hover:border-indigo-800 rounded hover:outline-0 hover:ring-0 focus:outline-none focus:ring-0' required={true}/>
                    <Input type='email' placeholder='Email address' name='email' onChange={(e)=>{setEmail(e.target.value)}} className='col-span-2 border hover:border-indigo-800 rounded focus:outline-none focus:ring-0' required={true}/>
                    <Input type='text' placeholder='Message subject' name='subject' onChange={(e)=>{setSubject(e.target.value)}} className='col-span-2 border hover:border-indigo-800 rounded focus:outline-none focus:ring-0' required={true}/>
                    <Input.TextArea rows={4} showCount maxLength={1000} placeholder='Type your message...' onChange={(e)=>{setMessage(e.target.value)}} className="col-span-2 w-full border hover:border-indigo-800 rounded hover:outline-0 hover:ring-0 focus:outline-none focus:ring-0 " required={true}/>
                </div>
                <div className="w-full mt-4 lg:mt-6">
                <button type='submit' className='float-right w-2/3 md:w-1/4 lg:w-1/6 bg-indigo-800 hover:bg-indigo-900 focus:bg-indigo-900 text-indigo-50 shadow focus:shadow-inner shadow-lg py-3 px-2 rounded-md text-sm'>{isSending?<span>Sending <BounceLoader size={20}/></span>:<span>Send</span>}</button>
                </div>
            </form>
        </div>
    )
}