
export interface FormElements {
    name : string
    label: string
    placeholder: string
}


export const patientForm: FormElements[] = [
    {
        name :'patientId',
        label:'Id',
        placeholder:'Enter patient Id'
    },
    {
        name :'visitTime',
        label:'Time',
        placeholder:'Enter visit time 0-24'
    },
    {
        name :'patientName',
        label:'Name',
        placeholder:'Enter patient Name'
    },
    {
        name :'patientDateOfBorn',
        label:'Date of Born',
        placeholder:'DD.MM.YYYY'
    },
]

export const doctorForm: FormElements[] = [
    {
        name :'doctorId',
        label:'Id',
        placeholder:'Enter doctor Id'
    },
    {
        name :'workTime',
        label:'text',
        placeholder:'Enter working time 0-24'
    },
    {
        name :'doctorName',
        label:'Name',
        placeholder:'Enter doctor Name'
    },
    {
        name :'doctorDateOfBorn',
        label:'Date of Born',
        placeholder:'DD.MM.YYYY'
    },
]
export const appointmentForm: FormElements[] = [
    {
        name :'appointmentPatientId',
        label:'Patient Id',
        placeholder:'Enter patient Id'
    },
    {
        name :'appointmentDoctorId',
        label:'Doctor Id',
        placeholder:'Enter doctor Id'
    },
    {
        name :'appointmentTime',
        label:'Time',
        placeholder:'Enter visit time'
    },
]