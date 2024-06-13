import App from '@/Layouts/App'
import { Head, useForm } from '@inertiajs/react'
import React from 'react'

export default function Show(props) {

    const { user } = props
    const { data, setData, reset, errors, post } = useForm({ message: '' })
    const submitHandler = (e) => {
        e.preventDefault()
        post(route('chats.store', user.username), {
            onSuccess: () => {
                reset('message');
            }
        })
    }

    return (
        <div>
            <Head title={`Chat with ${user.name}`} />

            <div className='flex flex-col justify-between h-screen'>
                <div className='border-b px-6 py-4 text-lg'>
                    {user.name}
                </div>
                <div className='px-6 py-4 flex-1 overflow-y-auto'>
                    <div className='text-slate-400'>
                        Start Chatting...
                    </div>
                </div>
                <div className='border-t px-6 py-2'>
                    <form onSubmit={submitHandler}>
                        <input value={data.message} onChange={(e) => setData({ ...data, message: e.target.value })} type="text" className='w-full form-text border-0 focus:border-0 focus:ring-0 focus:outline-none' placeholder='Type a message...' />
                    </form>
                </div>
            </div>
        </div>
    )
}


Show.layout = (page) => <App children={page} />
