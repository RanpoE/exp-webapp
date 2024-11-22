import React, { useEffect, useState, useRef } from 'react'


import dayjs from 'dayjs';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AddIcon from '@mui/icons-material/Add';

import { Button, makeStyles } from '@mui/material';

// import Stepper from '@mui/material/Stepper';
// import Step from '@mui/material/Step';
// import StepLabel from '@mui/material/StepLabel';

import { ollamaResponse, reportData } from '../../../constants';
import ReportList from './ReportList';
import { FormModal } from '../../../shared/FormModal';
import { getCurrentDate, postRequest, dateFormat, addDays, randomNum } from '../../../utils';


import { useSelector, useDispatch } from 'react-redux';
import { getUserFetch, hideUsers } from '../../../actions/userAction';

function StepOne() {
  return (
    <div className='text-center border-t'>
      <p>Hello world..</p>
      <button>Press here</button>
    </div>
  )
}

function Users() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch()
  return (
    <div>
      <p>
        <Button onClick={() => dispatch(getUserFetch())}>Display users</Button>
        <Button onClick={() => dispatch(hideUsers())}>Hide users</Button>
      </p>
      <div>
        Users: <ul> {user.map((us, i) => (<li key={i}>{us.name}</li>))}</ul>
      </div>
    </div>
  )
}

export function LoadOnScroll() {
  const [items, setItems] = useState(Array.from({ length: 10 }, (_, i) => `Item ${i + 1}`))
  const [hasMore, setHasMore] = useState(true)
  const loader = useRef(null)

  const loadMore = () => {
    if (!hasMore) return;
    setTimeout(() => {
      setItems((prev) => {
        const newItems = Array.from({ length: 10 }, (_, i) => `Items ${prev.length + i + 1}`)
        return [...prev, ...newItems]
      });
      console.log(items.length)
      if (items.length + 10 >= 50) {
        setHasMore(false);
      }
      // Example limit
    }, 1000);

  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadMore();
        }
      },
      { threshold: 1 }
    );

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => observer.disconnect();

  }, [items, hasMore]);

  return (
    <div>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      {hasMore && (
        <div
          ref={loader}
          style={{ height: "300px", background: "lightgray", textAlign: "center" }}
        >
          Loading...
        </div>
      )}
    </div>
  );
}

function ChatBox() {
  const chatResponse = ollamaResponse;
  const { message: { content } } = chatResponse;
  return (
    <div>
      <h1 className='text-xl mb-2'>Chat bot</h1>
      <p className="mx-auto whitespace-pre-line text-gray-500">
        {content}
      </p>
    </div>
  )

}

export function Report() {
  const [modal, setModal] = useState(false)
  const [currentDate, setCurrentDate] = useState(dateFormat())
  const [endDate, setEndDate] = useState(addDays(1))
  const [data, setData] = useState([])
  const { username } = JSON.parse(localStorage.getItem('userInfo'))
  const [owner] = useState(username)
  const [reprocess, setReprocess] = useState(false)

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

  }, [currentDate, endDate, reprocess])


  async function fetchData() {
    const url = `http://localhost:8080/api/v1/expense?owner=${owner}&date=${currentDate}&endDate=${endDate}`

    const request = new Request(url, { method: 'GET' })
    const response = await fetch(request).catch(err => [])
    if (response.status === 200) {
      const data = await response.json();
      data.sort((a, b) => b.amount - a.amount)
      return data
    }
    return []

    // reportData.sort((a, b) => b.amount - a.amount)
    // console.log(reportData)

    // return reportData
  }

  const handleModal = () => setModal(prev => !prev)

  const handleDateChange = (value) => {
    console.log(value)
    setCurrentDate(dateFormat(value))
  }

  const handleEndDateChange = (value) => {
    console.log(value)
    setEndDate(dateFormat(value))
  }

  const handleToday = () => setCurrentDate(dateFormat())

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className='flex justify-end'>
        <h1>
          <AddIcon className="hover:text-blue-300 cursor-pointer" onClick={handleModal} />
        </h1>
      </div>
      <div className='dark:bg-gray-700'>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker defaultValue={dayjs(currentDate)}
            inputFormat="YYYY/MM/DD" value={dayjs(currentDate)} onChange={handleDateChange} />
          <DesktopDatePicker defaultValue={dayjs(endDate)}
            inputFormat="YYYY/MM/DD" value={dayjs(endDate)} onChange={handleEndDateChange} />
        </LocalizationProvider>
      </div>
      <ReportList data={data} />
      <FormModal open={modal} handleClose={handleModal}>
        <CreateRecord handleClose={handleModal} reprocess={setReprocess} />
      </FormModal>
      {/* <Users /> */}
      {/* <ChatBox /> */}
      {/* <LoadOnScroll /> */}
    </div>
  )
}


function CreateRecord({ handleClose, reprocess }) {
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const { username } = JSON.parse(localStorage.getItem('userInfo', {}))
  const [expenseInput, setExpenseInput] = useState({ owner: username })

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    setDisabled(prev => !prev)
    const postURL = 'http://localhost:8080/api/v1/expense'
    const response = await postRequest(postURL, expenseInput, setTimeout(() => {
      handleClose();
      setDisabled(prev => !prev)
      reprocess(prev => !prev)
    }, 2000))
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

    loading ? <div className='flex items-center'><h1>Loading</h1></div>
      :
      (
        <>
          {/* <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
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

              <button type="submit" disabled={disabled} className="w-full text-white bg-gray-800 hover:bg-gray-600 focus:ring-4 focus:outline-none font-medium rounded-lg my-2 text-sm px-5 py-2.5 text-center">Create </button>

            </form>
          </div> */}

          <div className="relative p-4 w-full max-w-md max-h-full mx-auto">
            {/* <!-- Modal content --> */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {/* <!-- Modal header --> */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Create New Product
                </h3>
                <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal" onClick={handleClose}>
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* <!-- Modal body --> */}
              <form className="p-4 md:p-5">
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                    <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required="" />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label for="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                    <input type="number" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$2999" required="" />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label for="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                    <select id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                      <option selected="">Select category</option>
                      <option value="TV">TV/Monitors</option>
                      <option value="PC">PC</option>
                      <option value="GA">Gaming/Console</option>
                      <option value="PH">Phones</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label for="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Description</label>
                    <textarea id="description" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write product description here"></textarea>
                  </div>
                </div>
                <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                  Add new product
                </button>
              </form>
            </div>
          </div>
        </>
      )
  )
  // {/* <Stepper activeStep={0} alternativeLabel>
  //       {steps.map((item) => (
  //         <Step key={item.id}>
  //           <StepLabel>
  //             <span className='text-black'>{item.label}</span>
  //           </StepLabel>
  //           {
  //             item?.component
  //           }
  //         </Step>
  //       ))}
  //     </Stepper> */}
  // {/* </div> */ }
}