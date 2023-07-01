import { DeleteMessage, FormModel, ObjModel } from "../Models/Models"

export const initialState: FormModel = {
    patientId: '',
    patientName: '',
    patientDateOfBorn: '',
    visitTime: '',
    doctorId: '',
    doctorName: '',
    doctorDateOfBorn: '',
    workTime: '',
    appointmentPatientId: '',
    appointmentDoctorId: '',
    appointmentTime: ''
}
  
export const initialData: ObjModel = {
    patients: [],
    doctors: [],
    appointments: [],
    patientDublicate: null,
    doctorDublicate: null,
    wrongPatient: '',
    wrongDoctor: '',
    wrongAppointment: ''
}

export const initialMessage: DeleteMessage = {
    deletedAppointments: {deletedCount: 0},
    deletedDoctors: {deletedCount: 0},
    deletedPatiens: {deletedCount: 0},
}
