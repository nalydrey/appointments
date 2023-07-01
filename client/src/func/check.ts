import { AppointmentModel, DoctorModel, PatientModel } from "../Models/Models"

export const checkForConflict = (appointments: AppointmentModel[]) => {
    return appointments.map((appointment) => {
        const conflictAppointments = appointments.filter(elem => (appointment.doctorId===elem.doctorId && appointment.time === elem.time) )
        if (conflictAppointments.length > 1){
          return {...appointment, isConflict: true}
        }
        else{
          return {...appointment, isConflict: false}
        }
    })
}

export const checkForPossible = (appointments: AppointmentModel[], patiens: PatientModel[], doctors: DoctorModel[]) => {
    return appointments.map((appointment) => {
        const time = appointment.time
        const patient = patiens.find(patient => patient.patientId === appointment.patientId)
        const doctor = doctors.find(doctor => doctor.doctorId === appointment.doctorId)
        if(patient && doctor && ( patient.visitTime[0]<=time && (patient.visitTime[1]-1) >=time && doctor.workTime[0]<=time && (doctor.workTime[1]-1)>=time )){
        return {...appointment, isPossible: true}
        } 
        else{
        return {...appointment, isPossible: false}
        }
    })
}