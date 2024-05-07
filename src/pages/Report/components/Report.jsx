import React from 'react'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';


const mockData = [
  {
    name: 'Groceries',
    amount: 2000,
    time: '2024-01-02'
  },
  {
    name: 'Internet bill',
    amount: 1500,
    time: '2024-01-02'
  },
  {
    name: 'Electric bill',
    amount: 1300,
    time: '2024-01-02'
  },
  {
    name: 'Other',
    amount: 500,
    time: '2024-01-02'
  },
]


const totalAmount = () => mockData.reduce((a, b) => a += b.amount, 0)

mockData.push({
  name: 'Total Amount',
  amount: totalAmount(),
})


const ReportList = () => {
  return (
    <ul role="list" className="divide-y divide-gray-100">
      {mockData.map((item, i) => {
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
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <h1 className='text-2xl font-bold tracking-tight text-gray-900 sm:text-2xl'>Report</h1>
      <ReportList />
    </div>
  )
}
