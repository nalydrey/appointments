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


function App() {

  const navigate = useNavigate()

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
  },[])

  const checkAndChange = (data: ObjModel) => {
      const {appointments, patients, doctors} = data
      const possibleArr = checkForPossible(appointments, patients, doctors)
      const conflictArr = checkForConflict(possibleArr)
      const changeArr = change(possibleArr, patients, doctors)
      setObj({...obj, ...data, appointments: conflictArr})
      setAppointmentCopy(changeArr)
  }

  const loadData = async () => {
      const {data} = await axios.get<ObjModel>('http://localhost:3070/api') 
      checkAndChange(data)
  }

  const submit = async (fields: FormModel) => {
      const {data} = await axios.post<ObjModel>('http://localhost:3070/api', fields)
      checkAndChange(data)
      setIsOpen(true)
  }
  
  const clear = async () => {
    const {data} = await axios.delete<DeleteMessage>('http://localhost:3070/api', {})
    setObj({...obj, doctors: [], appointments: [], patients: []})
    setAppointmentCopy([])
    setDeletMessage({...deleteMessage, ...data})
    setIsOpenDel(true)
  }

  

  

const handleSave = async() => {
  const chengedAppointments = appointmentCopy.filter(appointment => appointment.isChanged);
  const {data} = await axios.put<{appointments: AppointmentModel[]}>('http://localhost:3070/api', chengedAppointments)
  const possibleArr = checkForPossible(data.appointments, obj.patients, obj.doctors)
  const conflictArr = checkForConflict(possibleArr)
  setObj({...obj, appointments: conflictArr})  
  
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
    </div>
  )
}

export default App
