import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import {config} from 'dotenv' 
import { createDoctor, dropDoctors, getDoctors } from './controllers/doctors.js'
import { createPatient, dropPatients, getPatients } from './controllers/patients.js' 
import { createAppointment, dropAppointments, getAppointments, changeTime } from './controllers/apointments.js'

config()
const PORT = +process.env.PORT
const TOKEN = process.env.TELEGRAM_TOKEN
const CHAT = process.env.CHAT_ID


const app = express()

app.use(cors());
app.use(express.json());

app.get('/api/telegram', async (req, res) => {
    try{
        console.log('telegram');
        await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage?chat_id=${CHAT}`, {
            method: 'POST',
            body: JSON.stringify({text: 'appointments'}), 
            headers: {
            'Content-Type': 'application/json'
            }
        })
        res.json({text: 'sent'})
    }
    catch{
        console.log('TELEGRAM ERROR');
        res.json({text: 'error'})
    }
})

app.post('/api/', async(req, res) => {
    console.log('post api');
    try {
        console.log(req.body);
        const patients = await createPatient(req.body)
        const doctors = await createDoctor(req.body)
        const appointments = await createAppointment(req.body)
        res.json({...patients, ...doctors, ...appointments})

    } catch (error) {
        console.log('post error', error);
    }
})

app.get('/api/', async(req, res) => {
    console.log('get api');
    try {
        console.log(req.body);


        const patients = await getPatients()
        const doctors = await getDoctors()
        const appointments = await getAppointments()
        res.json({...patients, ...doctors, ...appointments})
    } catch (error) {
        console.log('post error', error);
    }
})

app.put('/api/', changeTime)

app.delete('/api/', async(req, res) => {
    console.log('delete api');
    try {
        console.log(req.body);
        const patients = await dropPatients()
        const doctors = await dropDoctors()
        const appointments = await dropAppointments()
        res.json({...patients, ...doctors, ...appointments})

    } catch (error) {
        console.log('post error', error);
    }
})




const main = () => {
    try {
        mongoose.connect('mongodb://127.0.0.1:27017/test');

        app.listen(PORT, () => {
            console.log('Server is started on port ', PORT);
        })
    } catch (error) {
        console.log('server is not work');
    }
}

main()