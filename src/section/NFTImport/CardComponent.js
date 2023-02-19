import React from 'react'
import Box from '@mui/material/Box';

const Card = (props) => {
    
    const { img, text } = props

    return  <Box style={{fontSize: 30, marginBottom: 20}} display="flex" justifyContent={'flex-start'}>
                <Box style={{marginRight: 20}}>
                    <img src={img} style={{width: 80, height: 80}} />
                </Box>
                <Box display="flex" alignItems={"center"} style={{fontSize: 20, fontWeight: "bold"}}>
                    {text}
                </Box>
            </Box>

}

export default Card