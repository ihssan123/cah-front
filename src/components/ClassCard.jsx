import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
export default function ClassCard({text,isMerged=false}) {
  return (
    <Card sx={{ minWidth: "150px",margin:"2px",backgroundColor : isMerged ? "grey":"white" }}>
        <CardContent>
        <p style={{fontSize:"1rem"}}>{text}</p>  
        </CardContent>
    </Card>
  )
}
