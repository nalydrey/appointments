import {Routes, Route, useNavigate} from 'react-router-dom'
import { HomePage } from "./components/pages/HomePage"
import { ViewPage } from './components/pages/ViewPage'
import { useState, useEffect } from 'react'
import { AppointmentModel, DeleteMessage, FormModel, ObjModel } from './Models/Models'
import { initialData, initialMessage } from './data/initialData'
import axios from 'axios'
import { ModalWindow } from './components/ModalWindow'
import { Message } from './components/Message'
import { checkForConflict, checkForPossible } from './func/check'
import { change } from './func/change'
import { DeletedResponse } from './components/DeletedResponse'


const home = `${import.meta.env.VITE_PROTOKOL}://${import.meta.env.VITE_SERVER}:${import.meta.env.VITE_PORT}`

function App() {

  const navigate = useNavigate()

  const [errorMessage, setErrorMessage]  = useState<boolean>(false)
  const [isPreloader, setPreloader] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isOpenDel, setIsOpenDel] = useState<boolean>(false)
  const [obj, setObj] = useState<ObjModel>(initialData)
  const [deleteMessage, setDeletMessage] = useState<DeleteMessage>(initialMessage)
  const [appointmentCopy, setAppointmentCopy] = useState<AppointmentModel[]>([])

  
  const sort = (appointments: AppointmentModel[]) => {
    const arr: AppointmentModel[] = []
    appointments.sort((a, b) => a.patientId - b.patientId)
    const b = appointments.map(appoinpment => appoinpment.patientId)
    const c = new Set(b)
    c.forEach(elem => arr.push(...appointments.filter(appoinpment => appoinpment.patientId === elem).sort((a, b) => a.doctorId - b.doctorId)))
    return arr
  }

  useEffect(()=> {
      loadData()
      axios.get(`${home}/api/telegram`)
        .then(() => console.log('!'))
        .catch(() => console.log('!!!'));
  },[])

  const checkAndChange = (data: ObjModel) => {
      const {appointments, patients, doctors} = data
      const possibleArr = checkForPossible(appointments, patients, doctors)
      const conflictArr = checkForConflict(possibleArr)
      const changeArr = change(possibleArr, patients, doctors)
      const checkedArr = checkForPossible(changeArr, patients, doctors)
      console.log(checkedArr);
      
      setObj({...obj, ...data, appointments: conflictArr})
      setAppointmentCopy(checkedArr)
  }

  const loadFinishWithError = () => {
    setErrorMessage(true)
    setPreloader(false)
  }

  const loadData = async () => {
    try{
      setPreloader(true)
      const {data} = await axios.get<ObjModel>(`${home}/api`) 
      checkAndChange(data)
      setPreloader(false)
    }
    catch{
      loadFinishWithError()
    }
  }

  const submit = async (fields: FormModel) => {
    try{
      setPreloader(true)
      const {data} = await axios.post<ObjModel>(`${home}/api`, fields)
      checkAndChange(data)
      setIsOpen(true)
      setPreloader(false)
    }
    catch{
      loadFinishWithError()
    }
  }
  
  const clear = async () => {
    try{
      setPreloader(true)
      const {data} = await axios.delete<DeleteMessage>(`${home}/api`, {})
      setObj({...obj, doctors: [], appointments: [], patients: []})
      setAppointmentCopy([])
      setDeletMessage({...deleteMessage, ...data})
      setIsOpenDel(true)
      setPreloader(false)
    }
    catch{
      loadFinishWithError()
    }
  }

  

  

const handleSave = async() => {
  try{
    setPreloader(true)
    const chengedAppointments = appointmentCopy.filter(appointment => appointment.isChanged);
    const {data} = await axios.put<{appointments: AppointmentModel[]}>(`${home}/api`, chengedAppointments)
    const possibleArr = checkForPossible(data.appointments, obj.patients, obj.doctors)
    const conflictArr = checkForConflict(possibleArr)
    setObj({...obj, appointments: conflictArr})  
    setPreloader(false)
  }
  catch{
    loadFinishWithError()
  }
}

  return (
    <div className="bg-sky-200 min-h-screen">
      <header className="bg-blue-700 min-h-[50px] mb-5 flex justify-center items-center">
        <nav className={'flex justify-center gap-5'}>
          <button  
            className="btn"
            onClick={()=> navigate('/')}
          >
            Home
          </button>
          <button  
            className="btn"
            onClick={()=> navigate('/table')}
          >
            Appointments
          </button>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={
          <HomePage
            doctors={obj.doctors}
            patients={obj.patients}
            appointments={obj.appointments}
            onSubmit={submit}
            onClear={clear}
          />
        }
        />
        <Route path="/table" element={
          <ViewPage 
            onSave = {handleSave}
            doctors={obj.doctors}
            patients={obj.patients}
            appointments={obj.appointments}
            appointmentsCopy = {sort(appointmentCopy)}
          />
          }
        />
      </Routes>

      <ModalWindow
        onEmptySpace={()=>{setIsOpen(false)}}
        isOpen={isOpen}
      >
        <Message {...obj}/>
      </ModalWindow>
      <ModalWindow
          onEmptySpace={()=>{setIsOpenDel(false)}}
          isOpen={isOpenDel}
      >
          <DeletedResponse
            deleteMessage={deleteMessage}
          />
      </ModalWindow>
      <ModalWindow
          onEmptySpace={()=>{}}
          isOpen={isPreloader}
      >
         <div className='text-3xl text-white'>Loading...</div>
      </ModalWindow>
      <ModalWindow
          onEmptySpace={()=>{setErrorMessage(false)}}
          isOpen={errorMessage}
      >
         <div className='text-3xl text-red-500'>Server isn't available</div>
      </ModalWindow>
    </div>
  )
}

export default App
