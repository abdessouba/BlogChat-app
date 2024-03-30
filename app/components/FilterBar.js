import React from 'react'
import Image from 'next/image'
import filter from "../../public/images/filter.png"

const FilterBar = () => {
  return (
    <div className='flex gap-3 items-center justify-start '>
        <div className='text-2xl font-semibold mb-4 flex gap-1 items-center'>
            <Image alt='' src={filter} className='w-[30px]'/>
            <h1>Filter By:</h1>
        </div>
    </div>
  )
}

export default FilterBar