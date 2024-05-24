import React from 'react'

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#fff',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export function FormModal({ children, open, handleClose }){
  return (
    <>
      <Modal open={open} onClose={handleClose} className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <Box sx={style}>
          {children}
        </Box>
      </Modal>
    </>
  )
}