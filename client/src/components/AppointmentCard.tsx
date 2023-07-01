
interface AppointmentCardProps {
    patientId: string | number
    doctorId: string | number
    time: string | number
    colors: string
    onDetail?: ()=>void
}

export const AppointmentCard = ({
    patientId,
    doctorId,
    time,
    colors,
    onDetail
}: AppointmentCardProps) => {


  return (
    <li className="relative">
        <ul className={`${colors} p-1 px-3 font-bold rounded-lg shadow-lg border border-sky-500 duration-700`}>
            <li className='flex justify-between'>
                <p>Patient ID:</p>
                <p>{patientId}</p>
            </li>
            <li className='flex justify-between'>
                <p>Doctor ID:</p>
                <p>{doctorId}</p>
            </li>
            <li className='flex justify-between'>
                <p>Time:</p>
                <p className='flex justify-between'>{time}</p>
            </li>
        </ul>
        {
            onDetail &&
            <button
                className="btn absolute top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2"
                onClick={onDetail}
            >
                Details
            </button>
        }
    </li>
  )
}
