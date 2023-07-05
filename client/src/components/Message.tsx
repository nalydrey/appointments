import { ObjModel } from "../Models/Models"
import { Block } from "./Block"
import { Output } from "./Output"


export const Message = ({
    doctors,
    patients,
    appointments,
    wrongDoctor,
    wrongPatient,
    doctorDublicate,
    patientDublicate,
    wrongAppointment,

}: ObjModel) => {

 const length = patients.length + doctors.length + appointments.length

  return (
    <div className=' bg-yellow-100 rounded-md shadow-xl py-3 pb-7 px-7 flex flex-col gap-3'>
        <h1 className='text-3xl font-bold text-center'>Response</h1>
        {
            (!!length || !!wrongPatient || !!wrongDoctor || !!wrongAppointment || !!doctorDublicate || !!patientDublicate) ? 
            <>
                {
                !!patients.length &&
                    <Block
                        title="Successfull Patients:"
                    >
                        {
                            patients.map(patient =>{
                            const {_id, patientId, visitTime, firstName, lastName, born} = patient
                            return (
                                <Output
                                    key = {_id}
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
                                            data: firstName || lastName ? `${firstName} ${lastName}` : ''
                                        },
                                        {
                                            name: 'Born',
                                            data: born
                                        },
                                    ]}
                                />
                            )})
                        }
                    </Block>
                }
                {
                    !!doctors.length &&
                        <Block
                            title="Successfull Doctors:"
                        >
                            {
                                doctors.map(doctor =>{
                                const {_id, doctorId, workTime, firstName, lastName, born} = doctor
                                return (
                                    <Output
                                        key = {_id}
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
                        </Block>
                }
                {
                !! appointments.length &&
                    <Block
                        title="Successfull Appointments:"
                    >
                        {
                            appointments.map(appointment =>{
                            const {_id, doctorId, patientId, time} = appointment
                            return (
                                <Output
                                    key = {_id}
                                    fields={[
                                        {
                                            name: 'Patient ID',
                                            data: doctorId
                                        },
                                        {
                                            name: 'Time',
                                            data: time
                                        },
                                        {
                                            name: 'Doctor ID',
                                            data: patientId
                                        },
                                    ]}
                                />
                            )})
                        }
                    </Block>
                       
                }
                </>
                :
                <div className="text-3xl font-bold text-sky-500">No data in order to display</div>
        }
        {
            patientDublicate &&
            <Block
                title="Dublicate Patients:"
            >
                <Output
                    fields={[
                        {
                            name: 'Patient ID',
                            data: patientDublicate.patientId
                        },
                        {
                            name: 'Visit Time',
                            data: !!patientDublicate.visitTime.length ? `${patientDublicate.visitTime[0]} - ${patientDublicate.visitTime[1]}`: ''
                        },
                        {
                            name: 'Name',
                            data: patientDublicate.firstName || patientDublicate.lastName ? `${patientDublicate.firstName} ${patientDublicate.lastName}` : ''
                        },
                        {
                            name: 'Born',
                            data: patientDublicate.born
                        },
                    ]}
                />
            </Block>
        }
        {
            doctorDublicate && 
            <Block title="Dublicate Doctors:">
                <Output
                fields={[
                    {
                        name: 'Patient ID',
                        data: doctorDublicate.doctorId
                    },
                    {
                        name: 'Visit Time',
                        data: !!doctorDublicate.workTime.length ? `${doctorDublicate.workTime[0]} - ${doctorDublicate.workTime[1]}`: ''
                    },
                    {
                        name: 'Name',
                        data: doctorDublicate.firstName || doctorDublicate.lastName ? `${doctorDublicate.firstName} ${doctorDublicate.lastName}` : ''
                    },
                    {
                        name: 'Born',
                        data: doctorDublicate.born
                    },
                ]}
                />
            </Block>
        }
            
        
        {
            wrongPatient && 
            <Block title="Wrong Format Patients:">
                <p className="bg-white rounded-md p-1 px-5 font-medium text-xl text-red-500">{wrongPatient}</p>
            </Block>
        }
        {
            wrongDoctor &&
            <Block title="Wrong Format Doctor:">
                <p className="bg-white rounded-md p-1 px-5 font-medium text-xl text-red-500">{wrongDoctor}</p>
            </Block>
        }

        {   
            wrongAppointment &&
            <Block title="Wrong Format Appointment:">
                <p className="bg-white rounded-md p-1 px-5 font-medium text-xl text-red-500">{wrongAppointment}</p>
            </Block>
        }


       
        
    </div>
  )
}
