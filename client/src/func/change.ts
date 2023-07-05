import { AppointmentModel, DoctorModel, PatientModel } from "../Models/Models"
import { checkForConflict } from "./check"

export const change = (data: AppointmentModel[], patients: PatientModel[], doctors: DoctorModel[]) => {
    let appointments = [...data]
    appointments = checkForConflict(appointments) 
    appointments = appointments.map(app => ({...app, isChanged: false}))
    console.log(appointments);
    let conflictAppointments = appointments.filter(appointment => appointment.isConflict === true || !appointment.time)
    let conflictCount = conflictAppointments.length
    console.log('conflictCount', conflictCount);
    let totalCounter = 100000
    while(conflictCount && totalCounter > 0){
        totalCounter = totalCounter - 1
        conflictAppointments.some((conflAppointment) => {
            const patient = patients.find(pat => conflAppointment.patientId === pat.patientId)
            const doctor = doctors.find(doc => conflAppointment.doctorId === doc.doctorId)
            let time = patient?.visitTime[0] || 0
            console.log('patient',patient);
            console.log('doctor',doctor);
            if(patient && doctor){
                while(time < patient.visitTime[1]){
                    let isPossible = time >= patient.visitTime[0] && time < patient.visitTime[1] && time >= doctor.workTime[0] && time < doctor.workTime[1]
                    console.log('isPossible',isPossible);
                    //If appointment is possible
                    if(isPossible){
                        let doctorIsBuisy = appointments.filter(app => doctor.doctorId === app.doctorId && app.time === time)
                        let doctorAppCount = doctorIsBuisy.length
                        if(doctorAppCount >=1){
                            time = time + 1
                        }
                        else{
                            if (time === conflAppointment.time){
                                appointments = appointments.map(appointment => {
                                    if(appointment._id === conflAppointment._id){
                                        return {...appointment, isChanged: false}
                                    }
                                    return appointment
                                })
                                break
                            }
                            else{
                                appointments = appointments.map(appointment => {
                                    if(appointment._id === conflAppointment._id){
                                        return {...appointment, time, isChanged: true}
                                    }
                                    return appointment
                                })
    
                                appointments = checkForConflict(appointments)
                                conflictAppointments = appointments.filter(appointment => appointment.isConflict === true || !appointment.time)
                               
                                conflictCount = conflictAppointments.length
                                console.log('conflictCount', conflictCount);
                                return true
                            }
                        }
                    }
                    //If appointment isn't possible
                    else{
                        if(time === doctor.workTime[1]){
                            appointments = appointments.map(appointment => {
                                if(appointment._id === conflAppointment._id){
                                    return {...appointment, time, isChanged: true}
                                }
                                return appointment
                            })
                            appointments = checkForConflict(appointments)
                            conflictAppointments = appointments.filter(appointment => appointment.isConflict === true || !appointment.time)
                            conflictCount = conflictAppointments.length
                            console.log('conflictCount', conflictCount);
                            return true
                        }
                        time = time + 1
                    }
                }
            }
          
        })
    }
    
    console.log('appointments', appointments);
    

    return appointments
}