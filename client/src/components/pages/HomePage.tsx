import { ContentBox } from '../ContentBox'
import { Form } from '../Form'
import { doctorForm, patientForm, appointmentForm } from "../../data/formData"
import { Output } from '../Output'
import { ChangeEvent, useState } from 'react'
import { AppointmentModel, DoctorModel, FormModel, PatientModel } from '../../Models/Models'
import { initialState } from '../../data/initialData'


interface HomePageProps {
    doctors: DoctorModel[]
    patients: PatientModel[]
    appointments: AppointmentModel[]
    onSubmit: (data: FormModel) => void
    onClear: () => void
}

export const HomePage = ({
    doctors,
    patients,
    appointments,
    onSubmit,
    onClear
}: HomePageProps) => {

  const [fields, setFields] = useState<FormModel>(initialState)

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFields({...fields, [e.target.name]: e.target.value})
    }

  const handleOnSubmit = () => {
    setFields(initialState)
    onSubmit(fields)
  }  

  return (
    <>
        <div className="flex container m-auto gap-5">
            <ContentBox
            className="w-full"
            title='Patients'
            >
                <Form
                    obj={fields}
                    fields = {patientForm}
                    onChange = {handleOnChange}
                />

                <ul className='flex flex-col gap-1 mt-5 overflow-y-auto'>
                {
                    patients.map(patient =>{
                    const {_id, patientId, visitTime, firstName, lastName, born} = patient
                    return (
                        <Output
                            key = {_id}
                            colorClass=' bg-yellow-100'
                            colsClass='grid-colls-1'
                            fields={[
                                {
                                    name: 'Patient ID',
                                    data: patientId
                                },
                                {
                                    name: 'Visit Time',
                                    data: !!visitTime.length ? `${visitTime[0]} - ${visitTime[1]}`: ''
                                },
                                {
                                    name: 'Name',
                                    data: firstName || lastName ? `${firstName} ${lastName}`:''
                                },
                                {
                                    name: 'Born',
                                    data: born
                                },
                            ]}
                        />
                    )})
                }
                </ul>
            </ContentBox>

            <ContentBox
            className="w-full"
            title='Doctors'
            >
                <Form
                    obj={fields}
                    fields = {doctorForm}
                    onChange = {handleOnChange}
                />


                <ul className='flex flex-col gap-1 mt-5 overflow-y-auto'>
                {
                    doctors.map(doctor =>{
                    const {_id, doctorId, workTime, firstName, lastName, born} = doctor
                    return (
                        <Output
                            key = {_id}
                            colorClass=' bg-yellow-100'
                            colsClass='grid-colls-1'
                            fields={[
                                {
                                    name: 'Doctor ID',
                                    data: doctorId
                                },
                                {
                                    name: 'Work Time',
                                    data: !!workTime.length ? `${workTime[0]} - ${workTime[1]}`: ''
                                },
                                {
                                    name: 'Name',
                                    data: firstName || lastName ? `${firstName} ${lastName}`:''
                                },
                                {
                                    name: 'Born',
                                    data: born
                                },
                            ]}
                        />
                    )})
                }
                </ul>
            </ContentBox>

            <ContentBox
            className="w-full"
            title='Appointments'
            >
                <Form
                    obj={fields}
                    fields = {appointmentForm}
                    onChange = {handleOnChange}
                />
                 <ul className='flex flex-col gap-1 mt-5 overflow-y-auto'>
                    {
                        appointments.map(appointmentForm =>{
                        const {_id, patientId, doctorId, time} = appointmentForm
                        return (
                            <Output
                                key = {_id}
                                colorClass=' bg-yellow-100'
                                colsClass='grid-colls-1'
                                fields={[
                                    {
                                        name: 'Patient ID',
                                        data: patientId
                                    },
                                    {
                                        name: 'Doctor ID',
                                        data: doctorId
                                    },
                                    {
                                        name: 'Time',
                                        data: time
                                    },
                                    
                                ]}
                            />
                        )})
                    }
                </ul>
            </ContentBox>
        </div>
        <div className="flex mt-5 justify-center gap-5">
            <button 
                className="btn"
                onClick={handleOnSubmit}
            >
                Send
            </button>
            <button 
                className="btn"
                onClick={onClear}
            >
                Clear DB
            </button>
        </div>
    </>
  )
}
