import { validator } from '../customFunc/validator.js';
import Patient from '../models/patients.js'


export const getPatients = async () => {
    console.log('get patients');
    try {
        const patients = await Patient.find()
        return {
            patients
        }
    } catch (error) {
        console.log('get patients error', error);
    }
}

export const createPatient = async ({patientId, patientName, patientDateOfBorn, visitTime}) => {
    console.log('create patient');
    try {
        const {
            isError,
            errorText,
            times,
            firstName,
            lastName
        } = validator(patientId, visitTime, patientName, patientDateOfBorn)

        const dublicate = !isError ? await Patient.findOne({patientId}) : null
        if(!dublicate && !isError){

            const patient = new Patient({
                patientId, 
                visitTime: times,
                born: patientDateOfBorn,
                firstName,
                lastName
            })
            await patient.save()
        }

        const patients = await Patient.find()

        return {
            patients,
            patientDublicate: dublicate,
            wrongPatient: errorText
        }
        
    } catch (error) {
        console.log('create patient error ', error);
    }
}

export const dropPatients = async () => {
    console.log('delete patients');
    try {
        
        const deletedPatiens = await Patient.deleteMany({})

        return {deletedPatiens}
    } catch (error) {
        console.log('delete patients error ', error);
    }
}