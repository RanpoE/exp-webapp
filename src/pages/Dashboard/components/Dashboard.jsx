import { useEffect, useState } from 'react'
import { Box, Container, Typography } from '@mui/material'
// import { Progress } from './Progress'
import dayjs from 'dayjs';
import { userDataAssets, modalContent } from '../../../constants';
import { getCurrentDate } from '../../../utils'
import AdsClickIcon from '@mui/icons-material/AdsClick';
import SavingsIcon from '@mui/icons-material/Savings';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import RadialPie from './RadialPie';
import LineChart from './LineChart';
import { Modal } from './Modal';
import Carousel from '../../../shared/Carousel';


{/* <Typography className='text-red-200'>
Current progress
</Typography>
<Progress value={20} /> */}


const DashboardItem = ({ item }) => {
  const amount = `${item?.value.toLocaleString()}.00`
  return (
    <div className="p-4 min-w-[255px] max-w-[255px]">
      <div className="flex rounded-lg h-full dark:bg-gray-800 bg-teal-400 p-8 flex-col">
        <div className="flex items-center mb-3">
          <div
            className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full dark:bg-indigo-500 bg-indigo-500 text-white flex-shrink-0">
            <AdsClickIcon />
          </div>
          <h2 className="text-white dark:text-white text-lg font-medium">{item?.title}</h2>
        </div>
        <div className="flex flex-col justify-between flex-grow">
          <p className="leading-relaxed text-base text-white dark:text-gray-300" title={amount}>
            <dt className="mb-2 text-3xl text-center font-extrabold truncate">
              {amount}
            </dt>
          </p>
          <a href="#" className="mt-3 text-black dark:text-white hover:text-blue-600 inline-flex items-center">Learn More
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
              strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}

const Dashboard = () => {
  const [today, setToday] = useState(null)
  const [userAsset] = useState(userDataAssets)

  useEffect(() => {
    const today = getCurrentDate()
    setToday(dayjs(today))
  }, [])

  const handleChangeDate = (e) => {
    setToday(e)
  }

  return (
    // <Container className='md:hidden'>
    //   {/* <Box sx={{ flexGrow: 1 }} display="flex"
    //     alignItems="center">
    //     <LocalizationProvider dateAdapter={AdapterDayjs}>
    //       <DesktopDatePicker defaultValue={today} value={today} onChange={handleChangeDate} />
    //     </LocalizationProvider>
    //   </Box> */}
    //   <Box sx={{ flexGrow: 1 }} display="flex"
    //     alignItems="center" justifyContent="space-between">
    //     {/* <RadialPie />
    //     <LineChart /> */}
    //   </Box>
    // </Container>
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex flex-wrap justify-center">
        {
          userAsset.map(item => <DashboardItem key={item.title} item={item} />)
        }
      </div>
      {/* <Carousel data={modalContent} /> */}
    </div>
  )
}

export default Dashboard