import { useEffect, useState } from 'react'
import { Box, Container, Typography } from '@mui/material'
// import { Progress } from './Progress'
import dayjs from 'dayjs';
import { getCurrentDate } from '../../utils'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import RadialPie from './components/RadialPie';
import LineChart from './components/LineChart';


{/* <Typography className='text-red-200'>
Current progress
</Typography>
<Progress value={20} /> */}

const Dashboard = () => {
  const [today, setToday] = useState(null)
  useEffect(() => {
    const today = getCurrentDate()
    setToday(dayjs(today))
  }, [])

  const handleChangeDate = (e) => {
    setToday(e)
  }

  return (
    <Container>
      <Box sx={{ flexGrow: 1 }} display="flex"
        alignItems="center">
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          Financial Dashboard
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker defaultValue={today} value={today} onChange={handleChangeDate} />
        </LocalizationProvider>
      </Box>
      <Box sx={{ flexGrow: 1 }} display="flex"
        alignItems="center" justifyContent="space-between">
        <RadialPie />
        <LineChart />
      </Box>
    </Container>
  )
}

export default Dashboard