import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ClassCard from '../ClassCard';
import axios from 'axios';
export const Contact = () => {
  const [dataClasses, setDataClasses] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  
  const handleClickOpen = async () => {
    setOpen(true);
    const response = await axios.get('http://localhost:8080/Cah/classes_CAH');
        setDataClasses(response.data);
  };

  const handleClose = () => {
    setOpen(false);
  };
  

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Afficher toutes les classes
      </Button>
            {dataClasses && dataClasses.map((table, index) =>{
              
                if(table.some(e=> e.includes("§"))) {
                  return <div style = {{display : "flex",flexWrap: "wrap"}}>
                   <p style={{fontSize:"1rem"}}>Step : </p> {table.map(myClass=>{
                    return myClass.includes("§") ? <ClassCard text={myClass.replaceAll("§","_")} isMerged={myClass.includes("§")}/> : <></>
                   } )}
                  <br />
                </div>
                }
               
              
            } )}

    </div>
  );
};
