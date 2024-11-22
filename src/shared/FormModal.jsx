import React from 'react'

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 425,
  height: 400,
  bgcolor: '#fff',
  borderRadius: 2,
};

export function FormModal({ children, open, handleClose }) {
  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <div id="crud-modal" tabIndex="-1" aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
          <div style={style}>
            {children}
          </div>
        </div>
      </Modal>
    </>
  )
}
