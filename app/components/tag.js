import Link from 'next/link'
import React from 'react'

const tag = ({tag="javascript"}) => {
    return <Link  className='bg-gray-100 py-2 px-4 rounded-full hover:bg-slate-200  shadow-sm cursor-pointer' href={`/posts?theme=${tag}`}>{tag}</Link>
}

export default tag