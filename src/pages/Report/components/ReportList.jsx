import React from 'react'


import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';


import { dateFormat } from '../../../utils';

const ReportList = ({ data }) => {
    console.log("Rerendering ....")
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
                            <p className="mt-1 text-xs leading-5 text-gray-500">{dateFormat(item?.date_created)}</p>
                        </div>
                    </li>
                )
            })}

        </ul>
    )
}

const MemoizedReportList = React.memo(ReportList)

export default MemoizedReportList;