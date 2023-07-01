
interface ModalWindowProps {
    onEmptySpace: () => void
    isOpen: boolean
    children: React.ReactNode
    
}

export const ModalWindow = ({
    onEmptySpace,
    isOpen,
    children
}: ModalWindowProps) => {
  return (
    <div 
        className={`${isOpen? '': 'hidden'} absolute top-0 left-0 w-screen h-screen`}
        onClick = {onEmptySpace}
    >
        <div className={` absotute top-0 left-0 bg-black/70 duration-200 w-full h-full`}/>
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}>
            {children}
        </div>
    </div>
  )
}
