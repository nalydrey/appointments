
interface OutputProps {
    fields:{
        name: string
        data: string | number
    } []
    colorClass?: string
    colsClass?: string
}

export const Output = ({
    fields,
    colorClass = 'bg-white',
    colsClass = 'grid-cols-2'
}: OutputProps) => {
  return (
    <li className={`${colorClass} grid ${colsClass} gap-x-7 p-1 px-5 rounded shadow-lg font-medium w-full`}>
        {
            fields.map(field => (
                <div className="flex gap-5 justify-between"
                    key={field.name}
                > 
                {   
                    field.data &&
                    <>
                        <p>{field.name}</p>
                        <p>{field.data}</p>
                    </>
                }
                </div> 
            ))
        }
    </li>
  )
}
