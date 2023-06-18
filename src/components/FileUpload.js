import React, { useState } from "react";
import axios from "axios";
import "./FileUpload.css";
import ColumnGroupingTable from "./ColumnGroupingTable";
import CircularProgress from '@mui/joy/CircularProgress';
const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [matrix, setMatrix] = useState(undefined);
  const [cellValues, setCellValues] = useState([]);
  const [showTbale, setShowTbale] = useState(false);
  const [output,setOutput]=useState("");
  const [imagePath, setImagePath] = useState("");
  const [isLoading, setIsLoading] = React.useState(false);
 
  
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);
    
    
    
      

    axios
      .post("http://localhost:8080/Cah/Matrice_similarite", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        const { matrice, cellValues,output } = response.data;
        console.log("data",response.data);
      
        setImagePath(`http://localhost:8080/images/${output}`); // Update the state with the image path
        setMatrix(matrice);
        setCellValues(cellValues);
        console.log(matrice,cellValues,output);
        setShowTbale(true);
        setIsLoading(false);
        //<ColumnGroupingTable columns={cellValues} rows={matrix} />;
       
        
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="file-upload-container">
      <input
        type="file"
        className="file-upload-input"
        onChange={handleFileChange}
      />
      {
        isLoading ? <CircularProgress/> :
        <button className="file-upload-button" onClick={handleFileUpload}>
        Upload
        </button>
       }
      
       <p></p>
       
      {matrix && showTbale  &&  <ColumnGroupingTable cellValues={cellValues} matrix={matrix} />} 
      <p></p>
      {matrix && showTbale  &&  <img src={imagePath} alt=""/>} 
      
     
      
    
    </div>
  );
};

export default FileUpload;
