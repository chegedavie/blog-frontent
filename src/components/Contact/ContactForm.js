import Input from "../textInput";
import Textarea from "../Textarea";
import { useState } from "react";
import { useSendMessageMutation } from "@/redux/features/apiSlice";
import {CircleLoader} from 'react-spinners'

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
            <h2 className="py-4 text-white text-base font-sembold">Send me a message</h2>
            <form name='contactm' className='w-full' onSubmit={e=>{
                e.preventDefault()
                doSendMessage()
                }}>
                <div className="grid grid-cols-2  gap-2">
                    <Input type='text' placeholder="First name" name='first-name' id='first-name' onChange={(e)=>{setFirstName(e.target.value)}} className='col-span-2 lg:col-span-1 border rounded' required={true}/>
                    <Input type='text' placeholder='Last name' name='last-name' onChange={(e)=>{setLastName(e.target.value)}} className='col-span-2 lg:col-span-1 border rounded' required={true}/>
                    <Input type='email' placeholder='Email address' name='email' onChange={(e)=>{setEmail(e.target.value)}} className='col-span-2 border rounded focus:outline-none focus:border-0 focus:ring-0' required={true}/>
                    <Input type='text' placeholder='Message subject' name='subject' onChange={(e)=>{setSubject(e.target.value)}} className='col-span-2 border rounded focus:outline-none focus:border-0 focus:ring-0' required={true}/>
                    <Textarea placeholder='Type your message...' onChange={(e)=>{setMessage(e.target.value)}} className="col-span-2 w-full border rounded h-48 md:h-48 xl:h-120 resize-none focus:outline-none focus:border-0 focus:ring-0" required={true}/>
                </div>
                <div className="w-full mt-4 lg:mt-6">
                <button type='submit' className='float-right w-2/3 md:w-1/4 lg:w-1/6 bg-indigo-50 hover:bg-indigo-800 focus:bg-indigo-800 text-gray-900 hover:text-indigo-100 focus:text-indigo-100 border border-indigo-600 hover:border-gray-50 focus:border-gray-50 py-1 px-3 rounded-md shadow focus:shadow-inner text-base font-medium'>{isSending?<span>Sending <CircleLoader loading={isSending}/></span>:<span>Send</span>}</button>
                </div>
            </form>
        </div>
    )
}