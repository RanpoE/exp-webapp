import { useEffect, useState } from 'react'


import dayjs from 'dayjs';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AddIcon from '@mui/icons-material/Add';

import { makeStyles } from '@mui/material';

// import Stepper from '@mui/material/Stepper';
// import Step from '@mui/material/Step';
// import StepLabel from '@mui/material/StepLabel';

import { reportData } from '../../../constants';
import { FormModal } from '../../../shared/FormModal';
import { getCurrentDate, postRequest } from '../../../utils';


function ReportList({ date }) {
  const [data, setData] = useState([])
  const { username } = JSON.parse(localStorage.getItem('userInfo'))
  const [owner] = useState(username) 

  const totalAmount = (data) => data.reduce((a, b) => a += b.amount, 0)

  useEffect(() => {
    async function getReport() {
      const res = await fetchData()
      const resCopy = [...res]
      resCopy.push({
        name: 'Total Amount',
        amount: totalAmount(res),
      })
      setData(resCopy)
    }

    getReport()

    return () => setData([])

  }, [date])


  async function fetchData() {
    const url = `http://localhost:8080/api/v1/expense?owner=${owner}&date=${date}`
    
    const request = new Request(url, { method: 'GET'})
    const response = await fetch(request)
    if (response.status === 200) { 
      const data = await response.json();
      data.sort((a,b) => b.amount - a.amount)
      return data
    }

    return []

    // reportData.sort((a, b) => b.amount - a.amount)
    // console.log(reportData)

    // return reportData
  }

  return (
    <ul role="list" className="divide-y divide-gray-100">
      {data.map((item) => {
        const amount = `${item?.amount.toLocaleString()}.00`
        return (
          <li className="flex justify-between gap-x-6 py-5" key={item.name}>
            <div className="flex min-w-0 gap-x-4 items-center">
              <span>
                <MonetizationOnIcon fontSize='large' />
              </span>
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">{item.name}</p>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <p className="text-sm font-medium leading-6 text-gray-900">
                <dt className="text-center font-extrabold truncate">
                  {amount}
                </dt>
              </p>
              <p className="mt-1 text-xs leading-5 text-gray-500">Last seen <time dateTime={item?.time}>3h ago</time></p>
            </div>
          </li>
        )
      })}

    </ul>
  )
}


function StepOne() {
  return (
    <div className='text-center border-t'>
      <p>Hello world..</p>
      <button>Press here</button>
    </div>
  )
}

export function Report() {
  const [modal, setModal] = useState(false)
  const [currentDate, setCurrentDate] = useState(getCurrentDate())

  const handleModal = () => setModal(prev => !prev)

  const handleDateChange = (value) => {
    const dateString = value.toISOString()
    // console.log(value.$d.toISOString(), " date on changed")
    setCurrentDate(dateString.split('T')[0])
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className='flex justify-end'>
        <h1>
          <AddIcon className="hover:text-blue-300 cursor-pointer" onClick={handleModal} />
        </h1>
      </div>
      <div className='bg-black'>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker defaultValue={dayjs(currentDate)}
            inputFormat="YYYY/MM/DD" value={dayjs(currentDate)} onChange={handleDateChange} />
        </LocalizationProvider>
      </div>
      <ReportList date={currentDate} />
      <FormModal open={modal} handleClose={handleModal}>
        <CreateRecord handleClose={handleModal} />
      </FormModal>
    </div>
  )
}


function CreateRecord({ handleClose }) {
  const [loading, setLoading] = useState(false)
  const { username } = JSON.parse(localStorage.getItem('userInfo', {}))
  const [expenseInput, setExpenseInput] = useState({ owner: username })

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    const postURL = 'http://localhost:8080/api/v1/expense'
    const response = await postRequest(postURL, expenseInput, setTimeout(() => {
      handleClose();
    }, 5000))
    console.log(response, ' Submitted')
  }

  const steps = [
    {
      id: 1,
      label: 'Select master blaster campaign settings',
      component: <StepOne />
    },
    {
      id: 2,
      label: 'Select master sample campaign settings',
      // component: <StepOne />
    }
  ];

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setExpenseInput({ ...expenseInput, [id]: value })
  }

  return (
    // <div>
    //   <h2 className='text-xl mb-2'>Add record</h2>
    //   <form onSubmit={handleSubmit}>
    //     <div>
    //       <label htmlhtmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">Title</label>
    //       <div className="mt-2">
    //         <input id="title" name="title" type="text" autoComplete="off" required className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
    //       </div>
    //     </div>
    //     <div>
    //       <label htmlhtmlFor="amount" className="block text-sm font-medium leading-6 text-gray-900">Amount</label>
    //       <div className="mt-2">
    //         <input id="amount" name="amount" type="number" autoComplete="off" required className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
    //       </div>
    //     </div>
    //     <div className='mt-4'>
    //       <button type="submit" className="flex w-full justify-center rounded-md bg-gray-800 px-3 p-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600">Create</button>
    //     </div>
    //   </form>
    // </div>

    loading ? <h1>Loading</h1>
      :
      (<>
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
          <h3 className="text-xl font-semibold text-gray-900">
            Add new record
          </h3>
        </div>
        <div className="p-4 md:p-5">
          <form className="space-y-4" onSubmit={handleSubmit}>

            <div>
              <label htmlFor="title" className="block mb-2 text-sm font-medium">Name</label>
              <input type="name" name="name" id="name" onChange={handleInputChange} className="border border-gray-30 text-sm rounded-lg block w-full p-2.5 text-gray-700" required />
            </div>

            <div>
              <label htmlFor="amount" className="block mb-2 text-sm font-medium">Amount</label>
              <input type="amount" name="amount" id="amount" onChange={handleInputChange} className="border border-gray-30 text-sm rounded-lgblock w-full p-2.5 mb-3 text-gray-700" required />
            </div>

            <button type="submit" className="w-full text-white bg-gray-800 hover:bg-gray-600 focus:ring-4 focus:outline-none font-medium rounded-lg my-2 text-sm px-5 py-2.5 text-center">Create </button>

          </form>
        </div>
      </>)
  )
  {/* <Stepper activeStep={0} alternativeLabel>
        {steps.map((item) => (
          <Step key={item.id}>
            <StepLabel>
              <span className='text-black'>{item.label}</span>
            </StepLabel>
            {
              item?.component
            }
          </Step>
        ))}
      </Stepper> */}
  {/* </div> */ }
}