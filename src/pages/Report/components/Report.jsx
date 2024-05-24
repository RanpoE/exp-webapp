import React, { useEffect, useState } from 'react'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { reportData } from '../../../constants';
import { FormModal } from '../../../shared/FormModal';
import AddIcon from '@mui/icons-material/Add';


function ReportList() {
  const [data, setData] = useState([])
  
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

  }, [])




  async function fetchData(){
    reportData.sort((a, b) => b.amount - a.amount)

    return reportData
  }

  return (
    <ul role="list" className="divide-y divide-gray-100">
      {data.map((item, i) => {
        const amount = `${item?.amount.toLocaleString()}.00`
        return (
          <li className="flex justify-between gap-x-6 py-5" key={i}>
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

export function Report(){
  const [modal, setModal] = useState(false)

  const handleModal = () => setModal(prev => !prev)

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className='flex justify-between'>
        <h1 className='text-2xl font-bold tracking-tight text-gray-900 sm:text-2xl'>Report</h1>
        <h1>
          <AddIcon className="hover:text-blue-300 cursor-pointer" onClick={handleModal} />
        </h1>
      </div>
      <ReportList />
      <FormModal open={modal} handleClose={handleModal}>
        <CreateRecord handleClose={handleModal} />
      </FormModal>
    </div>
  )
}


function CreateRecord({ handleClose }){

  const handleSubmit = (evt) => {
    evt.preventDefault()
    alert("Form was submitted")
    setTimeout(() => {
      handleClose();
    }, 5000)
  }

  return (
    <>
      <h2 className='text-xl mb-2'>Add record</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">Title</label>
          <div className="mt-2">
            <input id="title" name="title" type="text" autoComplete="off" required className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
        <div>
          <label htmlFor="amount" className="block text-sm font-medium leading-6 text-gray-900">Amount</label>
          <div className="mt-2">
            <input id="amount" name="amount" type="number" autoComplete="off" required className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
        <div className='mt-4'>
          <button type="submit" className="flex w-full justify-center rounded-md bg-gray-800 px-3 p-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600">Create</button>
        </div>
      </form>
    </>
  )
}