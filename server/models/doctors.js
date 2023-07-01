import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
   doctorId: Number,
   workTime: [Number],
   firstName: String,
   lastName: String,
   born: String
})

export default mongoose.model('Doctor', doctorSchema) 