
import { Fragment, useEffect, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'

import { FaBars } from "react-icons/fa6";
import { FaUserFriends } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { MdOutlineMessage } from "react-icons/md";
import Header from '@/Components/Header';
import { Link, router, usePage } from '@inertiajs/react';
import { Toaster, toast } from 'react-hot-toast';
import Toast from '@/Components/Toast';
import NavbarMobile from '@/Components/NavbarMobile';
import { Inertia } from '@inertiajs/inertia';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function App({ children, ...props }) {

    const { flash, auth } = usePage().props
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [totalFriendRequests, setTotalFriendRequests] = useState(0)

    const navigations = [
        { name: 'Dashboard', href: '/', icon: MdSpaceDashboard, countNotif: 0 },
        { name: 'Friends', href: '/friends', icon: FaUserFriends, countNotif: 0 },
        { name: 'Friend Request', href: '/friend-request', icon: FaUserFriends, countNotif: totalFriendRequests },
    ]

    useEffect(() => {
        flash.status && Toast(flash)
    }
        , [flash])

    Echo.channel('sent-friend-request').listen('AddFriendSent', () => {
        router.reload()
    })

    useEffect(() => {
        axios.get('friend-request/count').then(response => {
            setTotalFriendRequests(response.data.unreadFriendRequests)
        });
    }, [new Date().toLocaleTimeString()]);

    return (
        <>
            <div>
                <NavbarMobile navigations={navigations} auth={auth} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                {/* Static sidebar for desktop */}
                <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white">
                        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                            <div className="flex items-center flex-shrink-0 px-4">
                                <img
                                    className="h-8 w-auto"
                                    src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
                                    alt="Workflow"
                                />
                            </div>
                            <nav className="mt-5 flex-1 px-2 bg-white space-y-1">
                                {navigations.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={classNames(
                                            item.current ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                                            'group flex items-center px-2 py-2 text-sm font-medium rounded-md justify-between'
                                        )}
                                    >
                                        <div className="flex items-center">
                                            <item.icon
                                                className={classNames(
                                                    item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                                                    'mr-3 flex-shrink-0 h-6 w-6'
                                                )}
                                                aria-hidden="true"
                                            />
                                            {item.name}
                                        </div>
                                        {item.countNotif > 0 && (
                                            <span
                                                className={classNames(
                                                    item.current ? 'bg-gray-800' : 'bg-gray-900 group-hover:bg-gray-800',
                                                    'inline-block py-0.5 px-3 text-xs text-white font-medium rounded-full'
                                                )}
                                            >
                                                {item.countNotif}
                                            </span>

                                        )}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                        <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                            <Link
                                href={route('logout')}
                                method='post'
                                as='button'
                                className="flex-shrink-0 w-full group block"
                            >
                                <div className="flex items-center">
                                    <div>
                                        <img
                                            className="inline-block h-9 w-9 rounded-full"
                                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                            alt=""
                                        />
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{auth.user.name}</p>
                                        <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">{auth.user.username}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="md:pl-64 flex flex-col flex-1">
                    <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-white">
                        <button
                            type="button"
                            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <span className="sr-only">Open sidebar</span>
                            <FaBars className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <main className="flex-1">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                            {
                                flash.status && <Toaster
                                    position="top-center"
                                    reverseOrder={false}
                                />
                            }

                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}
