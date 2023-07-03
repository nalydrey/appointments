import mongoose from "mongoose";

const apointmentSchema = new mongoose.Schema({
    patientId: Number,
    doctorId: Number,
    time: Number,
})

export default mongoose.model('Appointment', apointmentSchema) 