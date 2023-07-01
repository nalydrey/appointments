import { AppointmentModel } from "../Models/Models"

type textStringFunc = (appointments: AppointmentModel[]) => {blueString: string, greenString: string}

export const textString: textStringFunc = (appointments) => {
    const green = appointments.filter(appointment => (appointment.isPossible === true && appointment.isChanged === false))
    const blue = appointments.filter(appointment => (appointment.isPossible === true && appointment.isChanged === true))
   
    return {
        blueString: `Blue ${countString(blue.length)} ${oneOrMore(blue.length)}` ,
        greenString: `Green ${countString(green.length)} ${oneOrMore(green.length)}`
    }
}

type oneOrMoreFunc = (length: number) => string
const oneOrMore: oneOrMoreFunc = (length) => {
    let string = ''
    string = (length === 1) ? 'appoinpment' : 'appointments'
    return string    
}

type countStringFunc = (length: number) => string

const countString: countStringFunc = (length) => {
    switch (length){
        case 1: return 'One'
        case 2: return 'Two'
        case 3: return 'Three'
        case 4: return 'Four'
        case 5: return 'Five'
        case 6: return 'Six'
        case 7: return 'Seven'
        case 8: return 'Eight'
        case 9: return 'Nine'
        default: return length.toString()
    }
}