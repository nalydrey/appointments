import Doctor from '../models/doctors.js'
import { validator } from '../customFunc/validator.js'


export const getDoctors = async () => {
    console.log('get doctors');
    try {
        const doctors = await Doctor.find()
        return {
            doctors
        }
    } catch (error) {
        console.log('get doctors error', error);
    }
}

export const createDoctor = async ({ doctorId, doctorName, workTime, doctorDateOfBorn }) => {
    console.log('create doctor');
    try {
        const {
            isError,
            errorText,
            firstName,
            lastName,
            times
        } = validator(doctorId, workTime, doctorName, doctorDateOfBorn) 

        const dublicate = await Doctor.findOne({doctorId})

        if(!dublicate && !isError){
            const doctor = new Doctor({
                doctorId, 
                workTime: times,
                born: doctorDateOfBorn,
                firstName,
                lastName
            })
    
            await doctor.save()
        }

        const doctors = await Doctor.find()

        return {
            doctors,
            doctorDublicate: dublicate,
            wrongDoctor: errorText
        }
        
    } catch (error) {
        console.log('create doctor error ', error);
    }
}

export const dropDoctors = async () => {
    console.log('delete doctors');
    try {
        
        const deletedDoctors = await Doctor.deleteMany({})

        return {deletedDoctors}
        
    } catch (error) {
        console.log('delete doctors error ', error);
    }
}