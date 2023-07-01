import Appointment from '../models/apointments.js'
import {validAppointment} from '../customFunc/validAppointment.js'

export const getAppointments = async () => {
    console.log('get appointments');
    try {
        const appointments = await Appointment.find()
        return {
            appointments
        }
    } catch (error) {
        console.log('get appointments error', error);
    }
}

export const createAppointment = async ({appointmentPatientId, appointmentDoctorId, appointmentTime}) => {
    console.log('create appointment');
    try {

        const {
            errorText,
            isError
        } = validAppointment(appointmentPatientId, appointmentDoctorId, appointmentTime)

        let isPossible = false
        let isConflict = false
        
        let time = +appointmentTime

        if(!isError){
            const appointment = new Appointment({
                patientId: appointmentPatientId,
                doctorId: appointmentDoctorId,
                time,
                isPossible,
                isConflict
            })
            await appointment.save()
        }

        const appointments = await Appointment.find()

        return {
            appointments,
            wrongAppointment: errorText
        }
        
    } catch (error) {
        console.log('create appointment error ', error);
    }
}

export const changeTime = async (req, res) => {
    console.log('change time');
    console.log(req.body);
    try {
        await Promise.all(req.body.map(appointment =>  Appointment.findByIdAndUpdate(appointment._id, {$set: {time: appointment.time}})))
        const appointments = await Appointment.find()
       res.json({appointments})
    } catch (error) {
        console.log('change time error ', error);
    }
}

export const dropAppointments = async (req, res) => {
    console.log('delete appointments');
    try {
        
        const deletedAppointments = await Appointment.deleteMany({})
        return {deletedAppointments}
        
    } catch (error) {
        console.log('delete appointments error ', error);
    }
}