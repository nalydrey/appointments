import React from 'react'

interface BlockProps {
    title: string
    children: React.ReactNode
}

export const Block = ({
    title,
    children
}: BlockProps) => {
  return (
    <div>
        <h2  className='text-2xl text-center font-medium text-sky-700 mb-3'>{title}</h2>
        <ul className='flex flex-col gap-1 max-h-[150px] overflow-y-auto'>
            {children}
        </ul>
    </div>
  )
}
