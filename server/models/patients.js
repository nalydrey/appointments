import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
   patientId: Number,
   visitTime: [Number],
   firstName: String,
   lastName: String,
   born: String
})

export default mongoose.model('Patient', patientSchema) 