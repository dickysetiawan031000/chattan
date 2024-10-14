import { Dialog, Transition } from "@headlessui/react";
import { Link } from "@inertiajs/react";
import { Fragment, useEffect, useState } from 'react'
import { FaBars } from "react-icons/fa6";

export default function NavbarMobile({ navigations, auth, sidebarOpen, setSidebarOpen }) {
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    return (
        <Transition.Root show={sidebarOpen} as={Fragment}>
            <Dialog as="div" className="fixed inset-0 flex z-40 md:hidden" onClose={setSidebarOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="transition-opacity ease-linear duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-linear duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                </Transition.Child>
                <Transition.Child
                    as={Fragment}
                    enter="transition ease-in-out duration-300 transform"
                    enterFrom="-translate-x-full"
                    enterTo="translate-x-0"
                    leave="transition ease-in-out duration-300 transform"
                    leaveFrom="translate-x-0"
                    leaveTo="-translate-x-full"
                >
                    <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-in-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in-out duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="absolute top-0 right-0 -mr-12 pt-2">
                                <button
                                    type="button"
                                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    <span className="sr-only">Close sidebar</span>
                                    <FaBars className="h-6 w-6 text-white" aria-hidden="true" />
                                </button>
                            </div>
                        </Transition.Child>
                        <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                            <div className="flex-shrink-0 flex items-center px-4">
                                <img
                                    className="h-8 w-auto"
                                    src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
                                    alt="Workflow"
                                />
                            </div>
                            <nav className="mt-5 px-2 space-y-1">
                                {navigations.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className={classNames(
                                            item.current
                                                ? 'bg-gray-100 text-gray-900'
                                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                                            'group flex items-center px-2 py-2 text-base font-medium rounded-md justify-between'
                                        )}
                                    >
                                        <div className="flex items-center">
                                            <item.icon
                                                className={classNames(
                                                    item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                                                    'mr-4 flex-shrink-0 h-6 w-6'
                                                )}
                                                aria-hidden="true"
                                            />
                                            {item.name}
                                        </div>
                                        <span
                                            className={classNames(
                                                item.current ? 'bg-gray-800' : 'bg-gray-900 group-hover:bg-gray-800',
                                                'inline-block py-0.5 px-3 text-xs text-white font-medium rounded-full'
                                            )}
                                        >
                                            14
                                        </span>
                                    </a>
                                ))}
                            </nav>
                        </div>
                        <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                            <Link
                                href={route('logout')}
                                method='post'
                                as='button'
                                className="flex-shrink-0 group block"
                            >
                                <div className="flex items-center">
                                    <div>
                                        <img
                                            className="inline-block h-10 w-10 rounded-full"
                                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                            alt=""
                                        />
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-base font-medium text-gray-700 group-hover:text-gray-900">{auth.user.name}</p>
                                        <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700">{auth.user.username}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </Transition.Child>
                {/* <div className="flex-shrink-0 w-14">Force sidebar to shrink to fit close icon</div> */}
            </Dialog>
        </Transition.Root>

    );
}
