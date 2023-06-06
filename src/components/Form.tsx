import React, { useState } from 'react';
import { TextField, Button, FormControl, Select, MenuItem, SelectChangeEvent, Typography, FormHelperText } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addRow } from '../reduxStore/store';
import  "./Style.css"
import { doesntStartWithNumber, validMaxLength, validMinLength, validNoNumbers, validNumberString, validString } from '../Common/Utils';

const Form = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [status, setStatus] = useState('');
  const [isNameError,setIsNameError] = useState(false);
  const [nameErrorMessage,setNameErrorMessage] = useState("");
  const [isAddressError,setIsAddressError] = useState(false);
  const [addressErrorMessage,setAddressErrorMessage] = useState("");
  const [isPinCodeError,setIsPinCodeError] = useState(false);
  const [pinCodeErrorMessage,setPinCodeErrorMessage] = useState("");
  const [isStatusError,setIsStatusError] = useState(false);
  const [statusErrorMessage,setStatusErrorMessage] = useState("");
  // const [isNameError,setIsNameError] = useState(false);
  const dispatch=useDispatch()
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsNameError(false);
    setNameErrorMessage("")
    setName(event.target.value);
  };

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsAddressError(false);
    setAddressErrorMessage("")
    setAddress(event.target.value);
  };

  const handlePincodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsPinCodeError(false)
    setPinCodeErrorMessage("")
    setPincode(event.target.value);
  };

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    setIsStatusError(false)
    setStatusErrorMessage("")
    setStatus(event.target.value);
  };
 const validate=(event:React.FormEvent<HTMLFormElement>)=>{
  if(!name||name===""){
    //name not valid
    setIsNameError(true);
    setNameErrorMessage("Name must not be empty");
    return false
  } 
  if(!validString(name)){
    //name not valid
    setIsNameError(true);
    setNameErrorMessage("Not a valid name.");
    return false
  } 
  if(!validMinLength(name,2)){
    //name not valid
    setIsNameError(true);
    setNameErrorMessage("Name contains atleast two characters");
    return false
  } 
  if(!validMaxLength(name,20)){
    //name not valid
    setIsNameError(true);
    setNameErrorMessage("Name must contain maximum 4 characters.");
    return false
  } 
  if(!address||address===""){
    //name not valid
    setIsAddressError(true);
    setAddressErrorMessage("Address must not be empty.");
    return false 
  }
  if(!doesntStartWithNumber(address)||!validMinLength(address,5)){
    //name not valid
    setIsAddressError(true);
    setAddressErrorMessage("Invalid Address provided.");
    return false 
  }
  if(!validMaxLength(address,50)){
    //name not valid
    setIsAddressError(true);
    setAddressErrorMessage("Name max contains 50 characters");
    return false
  } 
  if(!pincode||pincode===""){
    //name not valid
    setIsPinCodeError(true);
    setPinCodeErrorMessage("Pin Code must not be empty");
    return false
  }

  if(!validNumberString(pincode)){
    //name not valid
    setIsPinCodeError(true);
    setPinCodeErrorMessage("Pincode must contains only numbers");
    return false
  }
  if(!validMaxLength(address,8)){
    //name not valid
    setIsPinCodeError(true);
    setPinCodeErrorMessage("Pincode must be less than 8 numbers.");
    return false
  } 
  if(!status||status===""){
    //name not valid
    setIsStatusError(true);
    setStatusErrorMessage("Status must not be empty");
    return false
  }
  if(!validString(status)){
    //name not valid
    setIsStatusError(true);
    setStatusErrorMessage("Status must not be empty");
    return false
  }
  return true
 }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
   if(!validate(event))return
    // Dispatch an action to add a new row to the table
    dispatch(
      addRow({
        name,
        address,
        pincode,
        status,
      })
    );
  
    // Reset the form inputs
    setName('');
    setAddress('');
    setPincode('');
    setStatus('');
  
    console.log('Form submitted:', { name, address, pincode, status });
  };
  
  return (
    <form onSubmit={handleSubmit} className="form-container">
        <Typography variant="h6"  component="div">
          Add Details Here
        </Typography>
      <TextField
        label="Name"
        value={name}
        error={isNameError}
        helperText={nameErrorMessage}
        onChange={handleNameChange}
        className="form-input"
      />
      <TextField
        label="Address"
        value={address}
        error={isAddressError}
        helperText={addressErrorMessage}
        onChange={handleAddressChange}
        className="form-input"
      />
      <TextField
        label="Pincode"
        value={pincode}
        error={isPinCodeError}
        helperText={pinCodeErrorMessage}
        onChange={handlePincodeChange}
        className="form-input"
      />
      <FormControl className="form-input" error={isStatusError}  >
        <Select value={status}  onChange={handleStatusChange}  >
          <MenuItem  value="ACTIVE">ACTIVE</MenuItem>
          <MenuItem value="INACTIVE">INACTIVE</MenuItem>
        </Select>
        <FormHelperText >{statusErrorMessage}</FormHelperText>
      </FormControl>
      <Button type="submit" variant="contained" color="primary" className="form-button">
        Add
      </Button>
    </form>
  );
};

export default Form;
