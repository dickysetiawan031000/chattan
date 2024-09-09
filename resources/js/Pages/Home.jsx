import React from 'react'
import App from '../Layouts/App-backup'

export default function Home() {
  return (
    <div className='px-6 py-4'>
        Start Chatting
    </div>
  )
}

Home.layout = (page) => <App children={page} title="Chattan"/>
