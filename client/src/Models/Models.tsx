export interface FormModel {
    patientId: string
    patientName: string
    patientDateOfBorn: string
    visitTime: string
    doctorId: string
    doctorName: string
    doctorDateOfBorn: string
    workTime: string
    appointmentPatientId: string
    appointmentDoctorId: string
    appointmentTime: string
}
  
export interface PatientModel {
    _id: string
    patientId: number
    visitTime: number[]
    firstName: string
    lastName: string
    born: string
}

export interface DoctorModel {
    _id: string
    doctorId: number
    workTime: number[]
    firstName: string
    lastName: string
    born: string
}

export interface AppointmentModel {
    _id: string
    patientId: number,
    doctorId: number,
    time: number,
    isPossible: boolean,
    isConflict: boolean,
    isChanged: boolean
}

export interface ObjModel {
    patients: PatientModel[],
    doctors: DoctorModel[],
    appointments: AppointmentModel[],
    patientDublicate: PatientModel | null
    doctorDublicate: DoctorModel | null
    wrongPatient: string
    wrongDoctor: string
    wrongAppointment: string
}

export interface DeleteResponse {
    deletedCount: number
}
export interface DeleteMessage {
    deletedAppointments: DeleteResponse,
    deletedDoctors: DeleteResponse,
    deletedPatiens: DeleteResponse,
}

