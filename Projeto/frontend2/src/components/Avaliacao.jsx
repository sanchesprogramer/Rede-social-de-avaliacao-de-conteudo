import React from 'react'
import Typography from '@mui/material/Typography';
function Avaliacao({item,type}) {

  return (
    <div>
        <Typography sx={{
              fontFamily: 'monospace',
              fontWeight: 700,
              marginRight: "10px"
            }}>
            Avaliação {item.idavaliacoes}: {item.avaliacao}
        </Typography>
    </div>

  )
}

export default Avaliacao