import mongoose from "mongoose";

const apointmentSchema = new mongoose.Schema({
    patientId: Number,
    doctorId: Number,
    time: Number,
    // isPossible: Boolean,
    // isConflict: Boolean,
    // isChanged: {
        // type: Boolean,
        // default: false
    // } 
})

export default mongoose.model('Appointment', apointmentSchema) 