import {ReactNode} from 'react'

interface ContentBoxProps {
    className?: string
    title: string
    children: ReactNode
}

export const ContentBox = ({
    className = 'box',
    title,
    children
}: ContentBoxProps) => {
  return (
    <div className={`${className} box flex flex-col shadow-xl`}>
        <h3 className='rounded-t-md text-center text-xl font-bold p-1 border-b-2 bg-gray-300 border-gray-500'>{title}</h3>
        <div className='grow rounded-b-lg bg-white py-5 px-3'>
            {children}
        </div>
    </div>
  )
}
