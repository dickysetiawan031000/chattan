import App from '@/Layouts/App'
import { MdOutlineMessage } from "react-icons/md";
import { IoIosCall } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { Combobox } from '@headlessui/react';
import { useEffect, useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import useDebouncedSearch from '@/hooks/useDebouncedSearch';
import { Button } from '@/shadcn/ui/button';
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger, DrawerFooter, DrawerClose } from '@/shadcn/ui/drawer';
import { Input } from '@/shadcn/ui/input';

export default function Index(props) {

    const { filters, friends } = props
    const { params, setParams, setTimeDebounce } = useDebouncedSearch(
        route(route().current()),
        filters
    );

    return (

        <div className="py-6" >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <h1 className="text-2xl font-semibold text-gray-900">Friends</h1>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">

                {/* <div className='mt-5 mb-5'>
                    <div className="w-full max-w-md mx-auto">
                        <Combobox
                            as="div"
                            value={query}
                            onChange={setQuery}
                            onInput={(e) => {
                                setQuery(e.target.value);
                                handleSearch(e.target.value);
                            }}
                        >
                            <div className="relative">
                                <FaSearch
                                    className="absolute left-3 top-3 h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                />
                                <Combobox.Input
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Cari..."
                                />
                            </div>
                            {results.length > 0 && (
                                <Combobox.Options className="mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {results.map((result) => (
                                        <Combobox.Option
                                            key={result.id}
                                            value={result.name}
                                            className={({ active }) =>
                                                `relative cursor-default select-none py-2 pl-3 pr-9 ${active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                                                }`
                                            }
                                        >
                                            {result.name}
                                        </Combobox.Option>
                                    ))}
                                </Combobox.Options>
                            )}
                        </Combobox>
                    </div>
                </div> */}

                <input
                    type="text"
                    name='search'
                    className="mt-5 mb-5 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    onChange={(e) => {
                        setParams({ ...params, search: e.target.value });
                        setTimeDebounce(500);
                    }}
                    value={params.search}
                    placeholder="Search..."
                />

                <Drawer>
                    <DrawerTrigger asChild>
                        <Button className="mt-2 hover:bg-slate-300">Add New Friend</Button>
                    </DrawerTrigger>
                    <DrawerContent>
                        <div className="mx-auto w-full max-w-sm">
                            <DrawerHeader>
                                <DrawerTitle className={"text-center"}>Add New Friend</DrawerTitle>
                                <DrawerDescription className="mt-5 mb-4 text-center">Connect with new people by adding them to your friend list. Enter their username or email to send a friend request.</DrawerDescription>
                            </DrawerHeader>

                            <DrawerFooter>
                            <Input type="email" placeholder="Email or Username" className="mb-5" />
                                <Button className="mb-10">Search</Button>
                                {/* <DrawerClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DrawerClose> */}
                            </DrawerFooter>
                        </div>
                    </DrawerContent>
                </Drawer>

                <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-5">

                    {friends.length ? friends.map((friend, index) => (
                        <li key={index} className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200">
                            <div className="w-full flex items-center justify-between p-6 space-x-6">
                                <div className="flex-1 truncate">
                                    <div className="flex items-center space-x-3">
                                        <h3 className="text-gray-900 text-sm font-medium truncate">{friend.name}</h3>
                                        <span className="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                                            online
                                        </span>
                                    </div>
                                    <p className="mt-1 text-gray-500 text-sm truncate">{friend.email}</p>
                                </div>
                                <img
                                    className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"
                                    src={friend.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'}
                                    alt=""
                                />
                            </div>
                            <div>
                                <div className="-mt-px flex divide-x divide-gray-200">
                                    <div className="w-0 flex-1 flex">
                                        <a
                                            href={`/chat/${friend.username}`}
                                            className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
                                        >
                                            <MdOutlineMessage className="w-5 h-5 text-gray-400" aria-hidden="true" />
                                            <span className="ml-3">Chat</span>
                                        </a>
                                    </div>
                                    <div className="-ml-px w-0 flex-1 flex">
                                        <button
                                            // href={`tel:${friend.telephone}`}
                                            href='#'
                                            disabled={true}
                                            className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <IoIosCall className="w-5 h-5 text-gray-400" aria-hidden="true" />
                                            <span className="ml-3">Call</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    )) :
                        <div className='text-slate-400'>
                            You don't have any friends yet.
                        </div>
                    }

                </ul>
            </div>
        </div >
    )
}

Index.layout = (page) => <App children={page} title="Friends" />