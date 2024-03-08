import * as React from 'react'
import Chip from '@mui/material/Chip'

function ChipState ({ state }) {
  return (
    <Chip
      label={state}
      size="small"
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          textTransform: 'uppercase',
          padding: '4px 6px',
          fontSize: '10px',
          fontWeight: 'bold',
          borderRadius: '14px',
          letterSpacing: '0.4px',
          lineHeight: 1,
          boxShadow: '1px 2px 5px 0px rgb(0 0 0 / 5%)',
          color: '#ffffff',
          backgroundColor: state === 'Activa' ? '#a7e8bd' : state === 'En Revisión' ? '#F9E38B' : state === 'Cerrada' ? '#ffb3b3' : '',
          '&[data-state="Activa"]': {
            backgroundColor: '#a7e8bd',
            color: '#036c39'
          },
          '&[data-state="En Revision"]': {
            backgroundColor: '#F9E38B',
            color: '#9E8211'
          },
          '&[data-state="Cerrado"]': {
            backgroundColor: '#ffb3b3',
            color: '#8c0000'
          }
        }}
      data-state={state}
    />
  )
}

export default ChipState
