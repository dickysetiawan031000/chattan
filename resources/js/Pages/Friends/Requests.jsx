import useDebouncedSearch from '@/hooks/useDebouncedSearch';
import App from '@/Layouts/App'
import { FaCheck, FaUserCheck, FaUserXmark } from 'react-icons/fa6';
import { IoIosCall } from 'react-icons/io';
import { MdOutlineMessage } from 'react-icons/md';

export default function Request(props) {

    console.log(props);

    const { friendRequests, filters } = props
    const { params, setParams, setTimeDebounce } = useDebouncedSearch(
        route(route().current()),
        filters
    );


    return (
        <div className="py-6" >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <h1 className="text-2xl font-semibold text-gray-900">Friend Request</h1>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                {/* <input
                    type="text"
                    name='search'
                    className="mt-5 mb-5 w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    onChange={(e) => {
                        setParams({ ...params, search: e.target.value });
                        setTimeDebounce(500);
                    }}
                    value={params.search}
                    placeholder="Search..."
                /> */}

                <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-5">

                    {friendRequests.length ? friendRequests.map((friend, index) => (
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
                                            className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500 hover:bg-gray-100 hover:border-gray-300"
                                        >
                                            <FaUserCheck
                                                className="w-5 h-5 text-gray-400"
                                                aria-hidden="true"
                                            />
                                            <span className="ml-3">Accept</span>
                                        </a>
                                    </div>
                                    <div className="-ml-px w-0 flex-1 flex">
                                        <button
                                            href='#'
                                            className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 hover:border-gray-300"
                                        >
                                            <FaUserXmark
                                                className="w-5 h-5 text-gray-400"
                                                aria-hidden="true"
                                            />
                                            <span className="ml-3">Decline</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    )) :
                        <div className='text-slate-400'>
                            No friend requests found
                        </div>
                    }

                </ul>
            </div>
        </div >
    )
}

Request.layout = (page) => <App children={page} title="Friends" />
