import React from 'react'

const tag = ({tag="javascript"}) => {
    return <li className='bg-gray-100 py-2 px-4 rounded-full hover:bg-slate-200  shadow-sm cursor-pointer'>{tag}</li>
}

export default tag