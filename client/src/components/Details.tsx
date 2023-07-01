import { AppointmentModel, DoctorModel, PatientModel } from "../Models/Models"
import { Output } from "./Output"

interface DetailsProps {
    doctor: DoctorModel
    patient: PatientModel
    appoinpment: AppointmentModel
}


export const Details = ({
    doctor,
    patient,
    appoinpment
}: DetailsProps) => {

    const {doctorId, workTime, firstName, lastName, born} = doctor
    const {patientId, visitTime} = patient
    const {time} = appoinpment

  return (
    <div className="bg-gray-200 p-5 rounded-lg shadow-2xl flex flex-col items-center gap-5 ">
        <h2 className="text-3xl font-bold text-sky-700">Details</h2>
         <Output
            colorClass="bg-yellow-100"
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
         <Output
            colorClass="bg-yellow-100"
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
                    data: patient.firstName || patient.lastName ? `${patient.firstName} ${patient.lastName}`:''
                },
                {
                    name: 'Born',
                    data: patient.born
                },
            ]}
        />
         <Output
            colorClass="bg-yellow-100"
            fields={[
                {
                    name: 'Patient ID',
                    data: patientId
                },
                {
                    name: 'Doctor Id',
                    data: doctorId
                },
                {
                    name: 'Time',
                    data: time
                },
            ]}
        />
    </div>
  )
}
