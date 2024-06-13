import { Head, Link, usePage } from '@inertiajs/react'
import React from 'react'

export default function App({ title, children }) {
    console.log(usePage())
    const { users, auth } = usePage().props
    return (
        <div className='flex min-h-screen'>
            <Head title={title} />
            <div className="w-1/3">
                <div className='w-1/3 flex flex-col fixed h-full px-6 py-4 text-right border-r space-y-3'>
                    <div className='flex-1 overflow-y-auto'>
                        {users.map(user => (
                            <Link
                                key={user.id}
                                href={route('chats.show', user.username)}
                                className={`block p-1 hover:bg-gray-200 ${route().current('chats.show', user.username) ? 'text-black font-semibold bg-slate-200' : 'text-slate-400'}`}
                            >
                                {user.name}
                            </Link>
                        ))}
                    </div>
                    <div className='bg-gray-100 rounded-xl p-4 space-y-3'>
                        <div>{auth.user.name}</div>
                        <Link
                            className='border bg-white rounded-xl font-medium px-4 py-2 hover:bg-gray-200 cursor-pointer'
                            href={route('logout')}
                            method='post'
                            as='button'
                        >
                            Logout
                        </Link>
                    </div>
                </div>
            </div>
            <div className="w-2/3">
                {children}
            </div>
        </div>
    )
}
