import { AppointmentModel, DoctorModel, PatientModel } from "../Models/Models"
import { checkForConflict } from "./check"

export const change = (data: AppointmentModel[], patients: PatientModel[], doctors: DoctorModel[]) => {
    let appointments = checkForConflict(data) 
    
    let conflictAppointments = appointments.filter(elem => elem.isConflict === true)
    let conflictDocs = conflictAppointments
    let length = conflictAppointments.length
    while(length){
        let isFinish = false
       
        for(const appointment of conflictDocs) {
            if(!isFinish) {
                let time = 0
                const patient = patients.find(patient => patient.patientId === appointment.patientId)
                const doctor = doctors.find(doctor => doctor.doctorId === appointment.doctorId)
                if (patient && doctor){
                  time = patient.visitTime[0]

                    while(time < patient.visitTime[1]){
                        let isPossible = ( patient.visitTime[0]<=time && (patient.visitTime[1]-1) >=time && doctor.workTime[0]<=time && (doctor.workTime[1]-1)>=time )
                        
                        if(isPossible){
                            const pat = appointments.filter(appointment => appointment.patientId === patient.patientId && appointment.time === time)
                            const doc = appointments.filter(appointment => appointment.doctorId === doctor.doctorId && appointment.time === time)
                            
                            if(!doc.length && !pat.length){
                                appointments = appointments.map(elem => {
                                    if(appointment.patientId === elem.patientId && appointment.doctorId === elem.doctorId){
                                        if(appointment.time === time ){
                                            return {...elem, time, isChanged: false}
                                        }
                                        else{
                                            return {...elem, time, isChanged: true}
                                        }
                                    }
                                    else{
                                        if(!elem.isChanged){
                                            return {...elem, isChanged: false}
                                        }
                                        else{
                                            return {...elem, isChanged: true}
                                        }
                                    }
                                })
                                isFinish = true
                                const  conflictAppointments = checkForConflict(appointments) 
                                conflictDocs = conflictAppointments.filter(elem => elem.isConflict === true)
                                length = conflictDocs.length 
                                break
                            }
                            time = time + 1
                        }
                        appointments = appointments.map(elem => {
                            if(appointment.patientId === elem.patientId && appointment.doctorId === elem.doctorId){
                                if(appointment.time === time ){
                                    return {...elem, time, isChanged: false}
                                }
                                else{
                                    return {...elem, time, isChanged: true}
                                }
                            }
                            else{
                                if(!elem.isChanged){
                                    return {...elem, isChanged: false}
                                }
                                else{
                                    return {...elem, isChanged: true}
                                }
                            }
                        })
                        const  conflictAppointments = checkForConflict(appointments) 
                        conflictDocs = conflictAppointments.filter(elem => elem.isConflict === true)
                        length = conflictDocs.length 
                        break
                    }
                }
            }
        }
        
    }

    return appointments
}