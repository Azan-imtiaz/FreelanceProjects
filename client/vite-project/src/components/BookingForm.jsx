import Swal from 'sweetalert2';
import React, { useState,useEffect } from 'react';
import { Autocomplete, DistanceMatrixService } from '@react-google-maps/api';
import { FaLocationArrow, FaCalendarAlt, FaClock,FaUser,FaSuitcase,
  FaCarAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Spinner from 'react-bootstrap/Spinner';
import {fetchDataPricing } from "../Services/apis";
const libraries = ['places'];

const BookingForm = () => {
  const [selectedPickupDate, setSelectedPickupDate] = useState(null);
  const [selectedReturnDate, setSelectedReturnDate] = useState(null);
  const [showReturn, setShowReturn] = useState(false);
  const [mode, setMode] = useState('ride');  // 'ride' is the default mode

  const [isSpin, setSpin] = useState(false);

  const [formData, setFormData] = useState({
    from: '',
    to: '',
    pickupDate: '',
    pickupTime: '',
    returnDate: '',
    returnTime: '',
    distance: '',
    estimatedTime: '',
    luggage:'',
    passenger:'',
    mode:'',
    hour:''
  });
  const [errors, setErrors] = useState({});
  const [autocompleteFrom, setAutocompleteFrom] = useState(null);
  const [autocompleteTo, setAutocompleteTo] = useState(null);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.from) newErrors.from = 'Pickup location is required';
    if (!formData.to) newErrors.to = 'Destination is required';
    if (!formData.pickupDate) newErrors.pickupDate = 'Pickup date is required';
    if (!formData.pickupTime) newErrors.pickupTime = 'Pickup time is required';
    if (!formData.luggage) newErrors.luggage = 'Luggage is required';
    if (!formData.passenger) newErrors.passenger = 'Passenger is required';
    if (showReturn && (!formData.returnDate || !formData.returnTime)) {
      if (!formData.returnDate) newErrors.returnDate = 'Return date is required';
      if (!formData.returnTime) newErrors.returnTime = 'Return time is required';
    }
    return newErrors;
  };


  const validateFormForHour = () => {
    const newErrors = {};
    if (!formData.from) newErrors.from = 'Pickup location is required';
    
    if (!formData.pickupDate) newErrors.pickupDate = 'Pickup date is required';
    if (!formData.pickupTime) newErrors.pickupTime = 'Pickup time is required';
    if (!formData.hour) newErrors.hour = 'Duration in hour is required';
    if (!formData.luggage) newErrors.luggage = 'Luggage is required';
    if (!formData.passenger) newErrors.passenger = 'Passenger is required';
   
    return newErrors;
  };
  const isWithinEngland = (place) => {
    const validCountries = ['England', 'United Kingdom', 'UK'];
    return validCountries.some(country => place.address_components.some(component => component.long_name.includes(country)));
  };
  
  // Helper function to get postal code from place
const extractPostalCode = (address) => {
  // Check for specific airports and return corresponding postal codes
  if (address.includes("Hounslow, UK")) {
    return "TW6"; // Hounslow postal code
  }
  if (address.includes("London Heathrow")) {
    return "TW6"; // London Heathrow postal code
  }
  if (address.includes("Gatwick Airport")) {
    return "RH6"; // Gatwick Airport postal code
  }
  if (address.includes("Stanstead Airport")) {
    return "CM24"; // Stanstead Airport postal code
  }
  if (address.includes("Luton Airport")) {
    return "LU2"; // Luton Airport postal code
  }
  if (address.includes("London City Airport")) {
    return "E16"; // London City Airport postal code
  }

  // Regex to find UK postal codes based on provided examples
  const postalCodeMatch = address.match(/\b[A-Z]{1,2}\d{1,2}[A-Z]?\d[A-Z]{2}\b|\b[A-Z]{1,2}\d{1,2}\b|\b[A-Z]{1}\d[A-Z]?\b/);
  return postalCodeMatch ? postalCodeMatch[0] : null;
};

const calculateDistance = () => {
  return new Promise((resolve, reject) => {
    if (!formData.from || !formData.to) {
      reject('Origin and destination are required');
      return;
    }

    const service = new window.google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [formData.from],
        destinations: [formData.to],
        travelMode: 'DRIVING',
      },
      (response, status) => {
        if (status === 'OK') {
          const element = response.rows[0].elements[0];
          const distanceValueInMeters = element.distance.value;
          const distanceValueInMiles = distanceValueInMeters * 0.000621371;
          const distanceTextInMiles = distanceValueInMiles.toFixed(2) + ' miles';
          const durationText = element.duration.text;

          // Extract postal codes from formatted addresses
          const fromPostalCode = extractPostalCode(response.originAddresses[0]);
          const toPostalCode = extractPostalCode(response.destinationAddresses[0]);

          // console.log("fromPostalCode: " + fromPostalCode);
          // console.log("toPostalCode: " + toPostalCode);
           console.log("distanceValueInMiles : " + distanceValueInMiles);
          resolve({ 
            distanceTextInMiles, 
            distanceValueInMiles, 
            durationText, 
            fromPostalCode, 
            toPostalCode 
          });
        } else {
          reject('Error calculating distance');
        }
      }
    );
  });
};

 
  const handleSubmit = async (event) => {
    event.preventDefault();
    formData.mode = mode;
  
    if (mode === 'ride') {
      const validationErrors = validateForm();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
  
      if (!isWithinEngland({ address_components: [{ long_name: formData.from }] })) {
        Swal.fire({
          icon: 'error',
          title: 'Invalid Location',
          text: 'Pickup location outside England is not supported.',
        });
        return;
      }
  
      if (!isWithinEngland({ address_components: [{ long_name: formData.to }] })) {
        Swal.fire({
          icon: 'error',
          title: 'Invalid Location',
          text: 'Destination outside England is not supported.',
        });
        return;
      }

      let distanceValueInMile, durationTex,fromPostalCod,toPostalCod;
  
      try {
        setSpin(true);
        console.log("hello")
       
        const { distanceTextInMiles, distanceValueInMiles, durationText, fromPostalCode, toPostalCode } = await calculateDistance();
        distanceValueInMile=distanceValueInMiles;
        durationTex=durationText;
        fromPostalCod= fromPostalCode;
        toPostalCod= toPostalCode;

     if((toPostalCode !="TW6" && toPostalCode != "RH6" &&  toPostalCode != "CM24" && toPostalCode != "LU2" && toPostalCode != "E16") && (fromPostalCode !="TW6" && fromPostalCode != "RH6" &&  fromPostalCode != "CM24" && fromPostalCode != "LU2" && fromPostalCode != "E16") ){
  
      const updatedFormData = {
        ...formData,
        distance: distanceValueInMiles.toFixed(2),
        estimatedTime: durationText,
        fromPostalCode,
        toPostalCode,
        postalCode:false
       };

       updatedFormData.checkedLuggage = formData.luggage;
       updatedFormData.persons = formData.passenger;
       
     clearFormData();
     setSpin(false);
    //  console.log("chekced="+updatedFormData)
     navigate('/vehicle-selection', { state: { formData: updatedFormData, vehicleData:null} });
   }
       


      else{

        
        const resp=await fetchDataPricing (toPostalCode,fromPostalCode);
        console.log(resp);
        if(resp){

         const updatedFormData = {
           ...formData,
           distance: distanceValueInMiles.toFixed(2),
           estimatedTime: durationText,
           fromPostalCode,
           toPostalCode,
           postalCode:false
          };
          
          updatedFormData.checkedLuggage = formData.luggage;
          updatedFormData.persons = formData.passenger;
          
          clearFormData();
        setSpin(false);
        // console.log("chekced="+updatedFormData)
        navigate('/vehicle-selection', { state: { formData: updatedFormData,vehicleData:resp } });
      }
      else{
        Swal.fire({
          icon: 'error',
          title: 'Invalid Location',
          text: 'No package .',
        });
        return;

      }
      }
    } catch (error) {
      const updatedFormData = {
        ...formData,
        distance: distanceValueInMile.toFixed(2),
        estimatedTime: durationTex,
        fromPostalCod,
        toPostalCod,
        postalCode:false
       };

       updatedFormData.checkedLuggage = formData.luggage;
       updatedFormData.persons = formData.passenger;
       
     clearFormData();
     setSpin(false);
    //  console.log("chekced="+updatedFormData)
     navigate('/vehicle-selection', { state: { formData: updatedFormData, vehicleData:null} });

    }
  } else {
      const validationErrors = validateFormForHour();
      if(formData.hour < 3 || formData.hour > 24){
        Swal.fire({
          icon: 'error',
          title: 'Invalid Duration',
          text: 'Enter Duration in correct Range(3h to 24h).',
        });

        return;

      }

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
  
      if (!isWithinEngland({ address_components: [{ long_name: formData.from }] })) {
        Swal.fire({
          icon: 'error',
          title: 'Invalid Location',
          text: 'Pickup location outside England is not supported.',
        });
        return;
      }
      try {
        setSpin(true);
        const updatedFormData = {
          from: formData.from,
          persons: formData.passenger,
          checkedLuggage: formData.luggage,
          pickupDate: formData.pickupDate,
          pickupTime: formData.pickupTime,
          mode: formData.mode,
          hour: formData.hour,
          postalCode:false
        };
  
        setSpin(false);
        clearFormData();
        // console.log("checked"+updatedFormData);
        navigate('/vehicle-selection', { state: { formData: updatedFormData,vehicleData:null } });
      } catch (error) {
        setErrors((prevErrors) => ({ ...prevErrors, distance: 'Could not calculate distance', estimatedTime: "Could not calculate" }));
      }
    }
  };
  
  

   // Function to clear all values
   const clearFormData = () => {
    setMode('ride');
    setFormData({
      from: '',
      to: '',
      pickupDate: '',
      pickupTime: '',
      returnDate: '',
      returnTime: '',
      distance: '',
      estimatedTime: '',
      luggage: '',
      passenger: '',
      mode: '',
      hour:''
    });
    
    setErrors({}); // Clear errors
  
    // Do not log formData immediately here because state update is asynchronous
    console.log("Form data is being cleared");
  };
  
  

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSelectFrom = () => {
    if (autocompleteFrom) {
      const place = autocompleteFrom.getPlace();
      setFormData({ ...formData, from: place.formatted_address });
    }
  };

  const handleSelectTo = () => {
    if (autocompleteTo) {
      const place = autocompleteTo.getPlace();
      setFormData({ ...formData, to: place.formatted_address });
    }
  };

  return (
    <div className="hero-section flex flex-col lg:flex-row lg:items-center font-sans lg:justify-between bg-purple-50 md:p-6  lg:p-12 rounded-lg shadow-lg lg:mt-11 sm:mt-0 sm:mb-16 ">
      <div className="overlay"></div>
      <div className="content-wrapper flex-1 lg:w-1/2 flex flex-col justify-center items-center lg:items-start lg:pr-8 lg:py-12 mb-6 lg:mb-0">
        <div className="text-center lg:text-left max-w-md">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-custom-purple  mb-4 lg:mb-6 leading-tight font-sans">
            Your Reliable Airport Transfers
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-gray-700 mb-4 font-sans">
            Book your airport transfer with ease and comfort. Experience seamless travel with our dependable service.
          </p>
        </div>
      </div>


      <div className="zindexing flex-none  lg:w-1/2 bg-white p-4 sm:pt-0 md:p-6 rounded-lg shadow-md relative">
  {/* Ride and By the Hour selection on the border */}
  <div className="absolute top-0 left-0 transform -translate-y-1/2 flex space-x-4 bg-white p-1 rounded-t-lg shadow-sm border-t border-l border-r border-gray-300">
    <span
      className={`cursor-pointer px-2 py-1 text-sm flex items-center font-semibold rounded-l-lg ${mode === 'ride' ? 'bg-custom-purple text-white' : 'bg-gray-200 text-gray-600'}`}
      onClick={() => setMode('ride')}
    >
      <FaCarAlt className="mr-1" /> {/* Ride icon */}
      Ride
    </span>
    <span
      className={`cursor-pointer px-2 py-1 text-sm flex items-center font-semibold rounded-r-lg ${mode === 'byHour' ? 'bg-custom-purple text-white' : 'bg-gray-200 text-gray-600'}`}
      onClick={() => setMode('byHour')}
    >
      <FaClock className="mr-1" /> {/* Hour icon */}
      By the Hour
    </span>
  </div>

  {/* Form Section */}
  <form onSubmit={handleSubmit} className="pt-8">
     {/* From Location */}
     <div className="mb-4">
      <label htmlFor="from" className="block text-gray-700 text-xl font-semibold mb-2 font-sans">
        From
      </label>
      <div className="flex items-center border  border-gray-300 rounded-lg font-sans">
        <FaLocationArrow className="text-gray-500 ml-3 font-sans" />
        <Autocomplete
          onLoad={(autocomplete) => setAutocompleteFrom(autocomplete)}
          onPlaceChanged={handleSelectFrom}
          options={{ componentRestrictions: { country: 'gb' } }} // Restrict to Great Britain
        >
          <input
            type="text"
            id="from"
            placeholder="Enter pickup location"
            value={formData.from}
            onChange={(e) => setFormData({ ...formData, from: e.target.value })}
            className="flex-1 p-2 rounded-r-lg focus:outline-none text-sm md:text-base font-sans"
          />
        </Autocomplete>
      </div>
      {errors.from && <p className="text-red-500 text-sm font-sans">{errors.from}</p>}
    </div>

    {/* To Destination (only visible in Ride mode) */}
    {mode === 'ride' && (
      <div className="mb-4">
        <label htmlFor="to" className="block text-gray-700 text-xl font-semibold mb-2 font-sans ">
          To
        </label>
        <div className="flex items-center border border-gray-300 rounded-lg font-sans">
          <FaLocationArrow className="text-gray-500 ml-3 font-sans" />
          <Autocomplete
            onLoad={(autocomplete) => setAutocompleteTo(autocomplete)}
            onPlaceChanged={handleSelectTo}
            options={{ componentRestrictions: { country: 'gb' } }} // Restrict to Great Britain
          >
            <input
              type="text"
              id="to"
              placeholder="Enter destination"
              value={formData.to}
              onChange={(e) => setFormData({ ...formData, to: e.target.value })}
              className="flex-1 p-2 rounded-r-lg focus:outline-none text-sm md:text-base font-sans"
            />
          </Autocomplete>
        </div>
        {errors.to && <p className="text-red-500  font-sans text-sm">{errors.to}</p>}
      </div>
    )}

    {/* Pickup Date and Time */}
    <div className="flex flex-wrap md:flex-nowrap gap-4 mb-4">
      <div className="flex-1 min-w-[170px]">
        <label htmlFor="pickup-date" className="block text-gray-700 text-xl font-semibold mb-2">
          Pickup Date
        </label>
        <div className="flex items-center border border-gray-300 rounded-lg">
          <FaCalendarAlt className="text-gray-500 ml-3" />
          <DatePicker
            selected={selectedPickupDate}
            onChange={(date) => {
              setSelectedPickupDate(date);
              setFormData({ ...formData, pickupDate: date ? date.toISOString().split('T')[0] : '' });
            }}
            className="flex-1 p-2 rounded-r-lg focus:outline-none text-sm md:text-base"
            placeholderText="Select date"
          />
        </div>
        {errors.pickupDate && <p className="text-red-500 text-sm">{errors.pickupDate}</p>}
      </div>

      <div className="flex-1 min-w-[170px]">
        <label htmlFor="pickup-time" className="block text-gray-700 text-xl font-semibold mb-2 font-sans">
          Pickup Time
        </label>
        <div className="flex items-center border border-gray-300 rounded-lg">
          <FaClock className="text-gray-500 ml-3" />
          <input
            type="time"
            id="pickup-time"
            value={formData.pickupTime}
            onChange={(e) => setFormData({ ...formData, pickupTime: e.target.value })}
            className="flex-1 p-2 rounded-r-lg focus:outline-none text-sm md:text-base font-sans"
          />
        </div>
        {errors.pickupTime && <p className="text-red-500 text-sm">{errors.pickupTime}</p>}
      </div>
    </div>

    {/* Return Options (only visible in Ride mode) */}
    {mode === 'ride' && (
      <div className="mb-4">
        <label className="inline-flex items-center font-sans">
          <input
            type="checkbox"
            checked={showReturn}
            onChange={() => setShowReturn(!showReturn)}
            className="form-checkbox"
          />
          <span className="ml-2 text-gray-700 font-sans">Add Return Trip</span>
        </label>
      </div>
    )}

    {/* Return Date and Time (only if "Add Return Trip" is checked and in Ride mode) */}
    {showReturn && mode === 'ride' && (
      <div className="flex flex-wrap md:flex-nowrap gap-4 mb-4 font-sans">
        <div className="flex-1 min-w-[170px]">
          <label htmlFor="return-date" className="block text-gray-700 text-xl font-semibold mb-2 font-sans">
            Return Date
          </label>
          <div className="flex items-center border border-gray-300 rounded-lg font-sans">
            <FaCalendarAlt className="text-gray-500 ml-3" />
            <DatePicker
              selected={selectedReturnDate}
              onChange={(date) => {
                setSelectedReturnDate(date);
                setFormData({ ...formData, returnDate: date ? date.toISOString().split('T')[0] : '' });
              }}
              className="flex-1 p-2 rounded-r-lg focus:outline-none text-sm md:text-base font-sans"
              placeholderText="Select date"
            />
          </div>
          {errors.returnDate && <p className="text-red-500 text-sm font-sans">{errors.returnDate}</p>}
        </div>

        <div className="flex-1 min-w-[170px]">
          <label htmlFor="return-time" className="block text-gray-700 text-xl font-semibold mb-2 font-sans">
            Return Time
          </label>
          <div className="flex items-center border border-gray-300 rounded-lg font-sans">
            <FaClock className="text-gray-500 ml-3 font-sans" />
            <input
              type="time"
              id="return-time"
              value={formData.returnTime}
              onChange={(e) => setFormData({ ...formData, returnTime: e.target.value })}
              className="flex-1 p-2 rounded-r-lg focus:outline-none text-sm md:text-base font-sans"
            />
          </div>
          {errors.returnTime && <p className="text-red-500 text-sm">{errors.returnTime}</p>}
        </div>
      </div>
    )}

    {/* Passenger field (always visible) */}
    <div className="mb-4">
      <label htmlFor="passenger" className="block text-gray-700 text-xl font-semibold mb-2 font-sans">
        Passenger
      </label>
      <div className="flex items-center border border-gray-300 rounded-lg font-sans">
        <FaUser className="text-gray-500 ml-3 font-sans" />
        <input
          type="number"
          id="passenger"
          placeholder="Number of passengers"
          value={formData.passenger}
          onChange={handleChange}
          className="flex-1 p-2 rounded-r-lg focus:outline-none text-sm md:text-base font-sans"
        />
      </div>
      {errors.passenger && <p className="text-red-500 text-sm font-sans">{errors.passenger}</p>}
    </div>

{/* talking hours  */}
{
  mode==='byHour' && (
<div className="mb-4">
      <label htmlFor="passenger" className="block text-gray-700 text-xl font-semibold mb-2 font-sans">
       Duration 
      </label>
      <div className="flex items-center border border-gray-300 rounded-lg font-sans">
        <FaClock className="text-gray-500 ml-3 font-sans" />
        <input
          type="number"
          id="hour"
          placeholder="Duration of Booking(In Hours) Range (3h-24h)"
          value={formData.hour}
          onChange={handleChange}
          className="flex-1 p-2 rounded-r-lg focus:outline-none text-sm md:text-base font-sans"
        />
      </div>
      {errors.hour && <p className="text-red-500 text-sm font-sans">{errors.hour}</p>}
    </div>


  ) 
}



    <div className="mb-4">
      <label htmlFor="passenger" className="block text-gray-700 text-xl font-semibold mb-2 font-sans">
        Luggage
      </label>
      <div className="flex items-center border border-gray-300 rounded-lg font-sans">
        <FaSuitcase className="text-gray-500 ml-3 font-sans" />
        <input
          type="number"
          id="luggage"
          placeholder="Number of Luggages"
          value={formData.luggage}
          onChange={handleChange}
          className="flex-1 p-2 rounded-r-lg focus:outline-none text-sm md:text-base font-sans"
        />
      </div>
      {errors.luggage && <p className="text-red-500 text-sm font-sans">{errors.luggage}</p>}
    </div>


    <div className="flex justify-between">
      <button
        type="submit"
        className="bg-custom-purple hover:bg-purple-700 text-white font-bold py-2 px-4 font-sans rounded focus:outline-none focus:shadow-outline"
        disabled={isSpin}
      >
        {isSpin ? <Spinner animation="border" size="sm" /> : 'Search'}
      </button>
    </div>
  </form>
</div>



    </div>
  );
};

 export default BookingForm;








