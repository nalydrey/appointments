import { useState } from 'react'
import { AppointmentCard } from '../AppointmentCard'
import { AppointmentModel, DoctorModel, PatientModel } from '../../Models/Models'
import { textString } from '../../func/textString'
import { checkForConflict } from '../../func/check'
import { ModalWindow } from '../ModalWindow'
import { Details } from '../Details'

interface ViewPageProps {
  doctors: DoctorModel[]
  patients: PatientModel[]
  appointments: AppointmentModel[]
  appointmentsCopy: AppointmentModel[]
  onSave: ()=>void
}

interface DetailMessage {
  doctor: DoctorModel
  patient: PatientModel
  appointment: AppointmentModel
}


export const ViewPage = ({
  doctors,
  patients,
  appointments,
  appointmentsCopy,
  onSave
}: ViewPageProps) => {

  const [isOpen, setIsOpen] = useState(false)
  const [detailMessage, setDetailMessage] = useState<DetailMessage>()

  const {
    greenString,
    blueString
  } = textString(checkForConflict(appointmentsCopy))

  console.log();
  
  
  const handlerDetails = (appointment: AppointmentModel) => {
    setIsOpen(true)

    const doctor = doctors.find(doctor => doctor.doctorId === appointment.doctorId)
    const patient = patients.find(patient => patient.patientId === appointment.patientId)
    
    if(doctor && patient){
    const message = {
      doctor,
      patient,
      appointment
    }
      setDetailMessage(message)
    }
  }

  
  return (
    <>
      <div className='container mx-auto flex gap-5'>
        {
          !!appointments.length ?
          <>
            <ul className='grow flex flex-col gap-2 w-full'>
            {
              appointments.map(appointment =>{
                const { isConflict, isPossible }: AppointmentModel = appointment
                return (
                  <AppointmentCard
                    key={appointment._id}
                    colors={isPossible ? isConflict ? 'bg-orange-300' : 'bg-green-300': 'bg-red-400'}
                    patientId={appointment.patientId}
                    doctorId={appointment.doctorId}
                    time={appointment.time}
                  />
                )
              })
            }
          </ul>
          <div className='grow w-full'>
            <ul className='grow flex flex-col gap-2'>
              {
                appointmentsCopy.map(appointment =>{
                  const { isChanged, isPossible }: AppointmentModel = appointment
                  return (
                    <AppointmentCard
                      key={appointment._id}
                      colors={isPossible ? isChanged ? 'bg-blue-400': 'bg-green-300' : 'bg-red-400' }
                      patientId={appointment.patientId}
                      doctorId={appointment.doctorId}
                      time={appointment.time}
                      onDetail={() => handlerDetails(appointment)}
                    />
                  )
                })
              }
            </ul>
            <div className='mt-5 flex flex-col items-center gap-3'>
              <div className='flex gap-5 font-bold'>
                <p className='text-green-700'>{greenString}</p>
                <p className='text-blue-700'>{blueString}</p>
              </div>
              <button className='btn'
                onClick = {onSave}
              >
                Save Changes
              </button>
            </div>
          </div>
          </>
          :
          <div className='text-2xl font-bold grow text-center'>Appointments aren't exist</div>
        }
        
      </div>
      <ModalWindow
        isOpen = {isOpen}
        onEmptySpace={()=>{setIsOpen(false)}}
      >
      {
        detailMessage &&
        <Details
          doctor={detailMessage.doctor}
          patient={detailMessage.patient}
          appoinpment={detailMessage.appointment}
        />
      }
      </ModalWindow>
    </>
  )
}
