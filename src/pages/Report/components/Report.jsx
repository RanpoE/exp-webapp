import React, { useState } from 'react'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { reportData } from '../../../constants';
import { FormModal } from '../../../shared/FormModal';
import AddIcon from '@mui/icons-material/Add';


reportData.sort((a, b) => b.amount - a.amount)

const totalAmount = () => reportData.reduce((a, b) => a += b.amount, 0)

reportData.push({
  name: 'Total Amount',
  amount: totalAmount(),
})


const ReportList = () => {
  return (
    <ul role="list" className="divide-y divide-gray-100">
      {reportData.map((item, i) => {
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

export const Report = () => {
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
        Create new record
      </FormModal>
    </div>
  )
}
