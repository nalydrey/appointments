import { DeleteMessage } from '../Models/Models'

interface DeletedResponseProps {
    deleteMessage: DeleteMessage
}

export const DeletedResponse = ({
    deleteMessage
}: DeletedResponseProps) => {
  return (
    <div className=' bg-yellow-100 p-5 rounded-md shadow-xl'>
        <h2 className=' text-3xl font-bold text-sky-700 text-center mb-5'>Deleted</h2>
        <ul className='text-2xl'> 
            <li className='flex gap-10 justify-between'>
                <p>Patients</p>
                <p>{deleteMessage.deletedPatiens.deletedCount}</p>
            </li>
            <li className='flex gap-10 justify-between'>
                <p>Doctors</p>
                <p>{deleteMessage.deletedDoctors.deletedCount}</p>
            </li>
            <li className='flex gap-10 justify-between'>
                <p>Appointments</p>
                <p>{deleteMessage.deletedAppointments.deletedCount}</p>
            </li>
        </ul>
    </div>
  )
}
