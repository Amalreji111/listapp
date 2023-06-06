import React, { useState } from 'react';
import { TextField, Button, FormControl, Select, MenuItem, SelectChangeEvent, Typography, FormHelperText } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addRow } from '../reduxStore/store';
import  "./Style.css"
import { doesntStartWithNumber, validMaxLength, validMinLength, validNumberString, validString } from '../Common/Utils';
import { Errors } from '../Common/Errors';

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
 const validate=(_event:React.FormEvent<HTMLFormElement>)=>{
  if(!name||name===""){
    setIsNameError(true);
    setNameErrorMessage(Errors.NAME_NOT_EMPTY);
    return false
  } 
  if(!validString(name)){
    
    setIsNameError(true);
    setNameErrorMessage(Errors.NAME_IS_NOT_VALID);
    return false
  } 
  if(!validMinLength(name,2)){
    
    setIsNameError(true);
    setNameErrorMessage(Errors.NAME_MUST_MINIMUM_TWO);
    return false
  } 
  if(!validMaxLength(name,20)){
    
    setIsNameError(true);
    setNameErrorMessage(Errors.NAME_MUST_BE_MAXIMUM_TWENTY);
    return false
  } 
  if(!address||address===""){
    
    setIsAddressError(true);
    setAddressErrorMessage(Errors.ADDRESS_NOT_EMPTY);
    return false 
  }
  if(!doesntStartWithNumber(address)||!validMinLength(address,5)){
    
    setIsAddressError(true);
    setAddressErrorMessage(Errors.NOT_A_VALID_ADDRESS);
    return false 
  }
  if(!validMaxLength(address,50)){
    
    setIsAddressError(true);
    setAddressErrorMessage(Errors.ADDRESS_MUST_BE_MAXIMUM_FIFTY);
    return false
  } 
  if(!pincode||pincode===""){
    
    setIsPinCodeError(true);
    setPinCodeErrorMessage(Errors.PIN_CODE_NOT_EMPTY);
    return false
  }

  if(!validNumberString(pincode)){
    
    setIsPinCodeError(true);
    setPinCodeErrorMessage(Errors.PIN_CODE_CONTAINS_ONLY_NUMBER);
    return false
  }
  if(!validMaxLength(pincode,8)){
    
    setIsPinCodeError(true);
    setPinCodeErrorMessage(Errors.PIN_CODE_MUST_BE_MAXIMUM_EIGHT);
    return false
  } 
  if(!status||status===""){
    
    setIsStatusError(true);
    setStatusErrorMessage(Errors.STATUS_NOT_EMPTY);
    return false
  }
  if(!validString(status)){
    
    setIsStatusError(true);
    setStatusErrorMessage(Errors.NOT_A_VALID_STATUS);
    return false
  }
  return true
 }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
   if(!validate(event))return
    dispatch(
      addRow({
        name,
        address,
        pincode,
        status,
      })
    );
  
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
