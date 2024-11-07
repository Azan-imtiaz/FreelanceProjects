

import React, { useState, useContext,useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import suv from "../assets/suv.jpg";
import { GoogleMap, LoadScript, DirectionsRenderer } from '@react-google-maps/api';

import {
  FaCheckCircle, FaCar, FaClipboardList, FaCreditCard, FaArrowLeft, FaArrowRight, FaUser, FaSuitcase, FaBriefcase,FaClock,FaDoorOpen
} from 'react-icons/fa';
import { AuthContext } from './contextProvider';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import PaymentComponent from "../components/PaymentComponent";
import economy from "../assets/ecm.jpg"
import standard from "../assets/standardLast.jpg"
import firstClass from "../assets/excecutive.jpg"
import minibus1 from "../assets/minibus1.jpg"
import minibus2 from "../assets/suvLast.jpg"
import firstClassVan from "../assets/vanMain.jpg"
import suvs from "../assets/img6.jpg"
import standardVan from "../assets/img8.png"



const VehicleBookingSteps = () => {
  const { isSignedInFinal, signInFinal, signOutFinal,popUp,signInPopUpFalse,signInPopUpTrue   } = useContext(AuthContext);
  const [finalObject,setFinalObject]=useState({
    someoneElsePhone:'',
    persons: '',
    phoneNumber:'',
    handLuggage: '',
    checkedLuggage: '',
    flightNumber: '',
    landingTime: '',
  
    driverNote: '',
    addOns: [], // Initialize as an empty array

 from: '',
    to: '',
    pickupDate: '',
    pickupTime: '',
    returnDate: '',
    returnTime: '',
    distance: '',estimatedTime:'',
      // New fields for validation
      bookingForSomeoneElse: false, // Checkbox initial value
 
  someoneElseName: '', // Error for name for someone else
  someoneElseEmail: '', // Error for email for someone else



  })




  const [directions, setDirections] = useState(null);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false); // To track if the script is loaded

  const calculateRoute = () => {
    if (from && to && window.google) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: from,
          destination: to,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === 'OK') {
            setDirections(result);
          } else {
            setError('Could not calculate the route');
          }
        }
      );
    }
  };

  const MySwal = withReactContent(Swal);

  const stripePromise = loadStripe('');


  const [activeStep, setActiveStep] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  const [UserPassenger,setPassenger]=useState(0);
  const [UserLuggage,setLuggage]=useState(0);
  const [UserCheckLugged,setCheckedLuggage]=useState(0);

  const [count, setCount] = useState(0);

// Updated formData with new fields for 'Booking for someone else'
const [formData, setFormData] = useState({
  someoneElsePhone:'',
  phoneNumber:'',
  // persons: '',
  handLuggage: '',
  
  // checkedLuggage: '',
  flightNumber: '',
  landingTime: '',
  driverNote: '',
  addOns: [], // Initialize as an empty array

  // New fields for booking for someone else
  bookingForSomeoneElse: false, // Checkbox initial value
  someoneElseName: '', // Name for someone else
  someoneElseEmail: '', // Email for someone else
});

// Updated errors state with validation for new fields
const [errors, setErrors] = useState({
  someoneElsePhone:'',
  phoneNumber:'',
 
  // persons: '',
  handLuggage: '',
  // checkedLuggage: '',
  // flightNumber: '',
  // landingTime: '',

  // New fields for validation
  someoneElseName: '', // Error for name for someone else
  someoneElseEmail: '', // Error for email for someone else
});


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleAddOnChange = (addOn) => {
    setFormData(prevState => {
      const addOns = new Set(prevState.addOns);
      if (addOns.has(addOn)) {
        addOns.delete(addOn);
      } else {
        addOns.add(addOn);
      }
      return { ...prevState, addOns: Array.from(addOns) };
    });
  };

  let to;
  let from ;
  let data;
  let vData;
  const navigate = useNavigate(); // Hook to handle navigation
  const location = useLocation();
  if(location.state?.vehicleData){
    console.log("i m azan");
     data = location.state?.formData;
      vData=location.state?.vehicleData;
      console.log(vData);
   
  if(data.mode==='ride'){
     to=data.to;
     from=data.from;
  }
  data.postalCode=true;
    console.log(location.state?.vehicleData);
  }
 else{
   
   data = location.state?.formData;
   data.postalCode=false;
   
  if(data.mode==='ride'){
     to=data.to;
     from=data.from;
  }

 }
  
  
   


  
  useEffect(() => {
    
    calculateRoute(); // Ensure route calculation only happens after the script is loaded
 
}, [from, to]);


  
  

  const steps = [
    { id: 1, name: 'Select Vehicle', icon: <FaCar /> },
    { id: 2, name: 'Booking', icon: <FaClipboardList /> },
    { id: 3, name: 'Payment', icon: <FaCreditCard /> },
  ];

  const updatePrice = (name,name2) => {
    let vehiclePrice;
  
    // Check if the mode is 'ride'
    if (data.mode === 'ride') {
      const vehicleMainData = {
        "Economy": data.distance <= 5 ? 6 : 4,
        "Standard": data.distance <= 5 ? 8 : 5,
        "Executive": data.distance <= 5 ? 12 : 7,
        "MPV": data.distance <= 5 ? 15: 8,
        "Standard Van": data.distance <= 5 ? 15 : 9,
        "Luxuary Van": data.distance <= 5 ? 15 : 12,
        "Minibus": data.distance <= 5 ? 15 : 18,
      };
  
      // Assign price based on name
      const price = vehicleMainData[name] !== undefined ? vehicleMainData[name] : 0;
  
      // If postalCode is true, use vData; otherwise, calculate based on distance
      if (data.postalCode) {
        vehiclePrice = vData[name2]; // Use the vehicle price if postalCode is true
        vehiclePrice+=10;
      } else {
        vehiclePrice = data.distance * price; // Use distance-based calculation if postalCode is false
      }
    } else {
      const vehicleMainData = {
        "Economy": 39,
        "Standard": 40,
        "Executive": 63,
        "MPV": 55,
        "Standard Van": 75,
        "Luxuary Van": 79,
        "Minibus": 150,
      };
  
      // Assign price based on name and calculate based on hours
      const price = vehicleMainData[name] !== undefined ? vehicleMainData[name] : 0;
      vehiclePrice = data.hour * price;
    }
  
    return vehiclePrice ? (vehiclePrice).toFixed(2) : "0.00";

  };
  

  // {
  //   id: 1,
  //   name: 'Vw jatta or similar',
  //   price: `£ ${(data.mode === 'ride' ? data.distance * 4.5 :  data.hour * 4).toFixed(2)}`,
  //   passengers: '3',
  //   image: `${economy}`,
  //   luggage: '2',
  //   handLuggage: '2'
  // }
  const vehicles = [
    {
      id: 1,
      name: 'Vw Jetta, Toyota Prius or Similar',
      head:"Economy",
      price: `£ ${updatePrice("Economy","SALOON")}`,
      passengers: '3',
      image: `${economy}`,
      luggage: '2',
      handLuggage: '2'
    },
    {
      id: 2,
      head:"Standard",
      name: 'Kia Niro, Skoda or Similar',
      price: `£ ${updatePrice("Standard","Estate")}`,
      passengers: '4',
      image: `${standard}`,
      luggage: '2',
      handLuggage: '2'
    },
    {
      id: 3,
      head:"Executive",
      name: 'Mercedes E Class, BMW 5 Series or Similar',
      price: `£ ${updatePrice("Executive","EXECUTIVE")}`,
      passengers: '3',
      image: `${firstClass}`,
      luggage: '2',
      handLuggage: '2'
    },
    {
      id: 4,
      head:"MPV",
      name: 'Volkswagen XL, VW Van or Similar',
      price: `£ ${updatePrice("MPV","MPV5")}`,
      passengers: '5',
      image: `${suvs}`,
      luggage: '3',
      handLuggage: '3'
    },
    {
      id: 5,
      head:"Standard Van",
      name: 'Mercedes Vito, Hyundai or Similar',
      price: `£ ${updatePrice("Standard Van","MPV7")}`,
      passengers: '6',
      image: `${minibus2}`,
      luggage: '5',
      handLuggage: '3'
    },
    {
      id: 6,
      head:"Luxuary Van",
      name: 'Mercedes V Class, Vito 8seats or Similar',
      price: `£ ${updatePrice("Luxuary Van","MPV8")}`,
      passengers: '8',
      image: `${firstClassVan}`,
      luggage: '8',
      handLuggage: '8'
    },
    {
      id: 7,
      head:"Minibus",
      name: 'Vw Transporter, Renauld Traffic Sport or Similar',
      price: `£ ${updatePrice("Minibus","MPV16")}`,
      passengers: '14',
      image: `${standardVan}`,
      luggage: '14',
      handLuggage: '10'
    }
  ];
  

const selectVehicle = (vehicleId) => {
  // Reset passenger, luggage, and checked luggage to 0
  setPassenger(0);
  setLuggage(0);
  setCheckedLuggage(0);

  let totalPrice = 0;
  let currencySymbol = '';

  // Find the vehicle based on its ID
  const selectedVehicle = vehicles.find(vehicle => vehicle.id === vehicleId);
  const vehiclePrice = parseFloat(selectedVehicle.price.slice(1)); // Remove the currency symbol and convert to number

  if (selectedVehicle) {
    // Extract the currency symbol and numeric part
    currencySymbol = selectedVehicle.price.charAt(0); // Get the currency symbol (e.g., £)
    // const vehiclePrice = parseFloat(selectedVehicle.price.slice(1)); // Remove the currency symbol and convert to number

    // Update the count with the vehicle's price
    setCount(vehiclePrice);

    // Log the vehicle price
    console.log("Vehicle price:", vehiclePrice);

    // Set the base price to the vehicle's price
    totalPrice += vehiclePrice;

    // Add additional costs based on formData
    if (formData.addOns.includes("childSeat")) totalPrice += 5;   // Add £5 for child seat
    if (formData.addOns.includes("meetAndGreet")) totalPrice += 10; // Add £10 for meet and greet

    // Log add-ons costs
    console.log("Add-ons costs:", formData.addOns);

  } else {
    console.error("Selected vehicle not found");
    return; // Exit if the vehicle is not found
  }

  // Calculate the total price based on distance
  // const finalPrice = (totalPrice * data.distance).toFixed(2);
  
  // Set the total price in the state
  setTotalPrice(`${currencySymbol}${vehiclePrice}`);

  // Log the total price
  // console.log("Total price:", finalPrice);

  // Update passenger, hand luggage, and checked luggage details
  setPassenger(selectedVehicle.passengers);
  setLuggage(selectedVehicle.handLuggage);
  setCheckedLuggage(selectedVehicle.luggage);


  // Move to the next step
  setActiveStep(2);
};


  const goBack = () => {
    //  setFormData({
    //   persons: '',
    //   handLuggage: '',
    //   checkedLuggage: '',
    //   flightNumber: '',
    //   landingTime: '',
    //   driverNote: '',
    //   addOns: [], // Initialize as an empty array
    // });
    //  setTotalPrice(0)
    setActiveStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep));
  };



  const goNext = () => {
    // Validate form data and set errors
    const newErrors = {
      // persons: formData.persons ? '' : 'Total persons is required.',
      handLuggage: formData.handLuggage !== '' ? '' : 'Hand luggage quantity is required.',
      
     
      // landingTime: formData.landingTime ? '' : 'Landing time is required.',
      phoneNumber: formData.phoneNumber ? '' : 'Mobile no required.',
     };
  
    // If "Booking for someone else" is checked, validate name and email fields
    if (formData.bookingForSomeoneElse) {
      newErrors.someoneElsePhone  =formData.someoneElsePhone? '': 'Mobile no required',
      newErrors.someoneElseName = formData.someoneElseName ? '' : 'Name for someone else is required.';
      newErrors.someoneElseEmail = formData.someoneElseEmail ? '' : 'Email for someone else is required.';
    }
  
    setErrors(newErrors);
  
    // Check if there are any validation errors
    const hasErrors = Object.values(newErrors).some(error => error !== '');
  
    if (hasErrors) {
      return; // Stop here if there are validation errors
    }
  
    // Compute the total price based on selected add-ons
    let calculatedPrice = count;
  
    if (formData.addOns.includes('childSeat')) {
      calculatedPrice += 5;
    }
    if (formData.addOns.includes('meetAndGreet')) {
      calculatedPrice += 10;
    }
  
    // Set the updated total price
    setTotalPrice(calculatedPrice);
    console.log(finalObject);
  
    if (isSignedInFinal) {
      // Prepare the final object with all form data
      
  console.log("hello1234")
 
     const finalObject = { ...formData, ...data };
  
      setFinalObject(finalObject);
      console.log(finalObject);
      
          
  
      // Proceed to the next step if there are no errors
      setActiveStep((prevStep) => (prevStep < 3 ? prevStep + 1 : prevStep));
    } else {
      signInPopUpTrue();
      console.log("pop =" + popUp);
  
    }
  };
  

  const calculatePrice = () => {
    let totalPrice = 0;
    if (formData.childSeat) totalPrice += 5;
    if (formData.meetAndGreet) totalPrice += 10;
    return totalPrice;
  };



// Function to handle checkbox toggle
const handleCheckboxChange = (e) => {
  const { name, checked } = e.target;
  setFormData((prevData) => ({
    ...prevData,
    [name]: checked,
    // Reset the fields if the checkbox is unchecked
    someoneElseName: checked ? prevData.someoneElseName : '',
    someoneElseEmail: checked ? prevData.someoneElseEmail : '',
    someoneElsePhone: checked ? prevData.someoneElsePhone : '',
  }));
};






  return (



    <div className="max-w-7xl mx-auto lg:p-16 md:p-16  p-4  bg-gray-50 rounded-lg shadow-lg">



      {/* Stepper */}
      <div className="flex justify-between mb-8 lg:mt-6">
    
        {steps.map((step) => (
          <div key={step.id} className="flex-1 text-center">
            <div
              className={`rounded-full w-12 h-12 mx-auto flex items-center justify-center mb-2
              ${activeStep === step.id ? 'bg-custom-purple text-white' : 'bg-purple-200 text-custom-purple'}`}
            >
              {activeStep > step.id ? <FaCheckCircle /> : step.icon}
            </div>
            <p className={`${activeStep === step.id ? 'font-bold text-custom-purple' : 'text-gray-600'}`}>
              {step.name}
            </p>
          </div>
        ))}
      </div>

      {/* Vehicle Selection */}
      {activeStep === 1 && (
        <div>
         
 
         {
  data.mode === 'ride' && (
    <div style={{ height: '500px', width: '100%' }}>
      <GoogleMap
        center={{ lat: 51.5074, lng: -0.1278 }} // Default center (London)
        zoom={10}
        mapContainerStyle={{ height: '100%', width: '100%' }}
      >
        {directions ? (
          <DirectionsRenderer
            directions={directions}
            options={{
              polylineOptions: {
                strokeColor: '#0000FF', // Blue route line
                strokeOpacity: 0.7,
                strokeWeight: 5,
              },
            }}
          />
        ) : (
          <div>{error || 'Loading route...'}</div>
        )}
      </GoogleMap>
    </div>
  )
}

        
         
         
         
          <h1 className="text-2xl font-bold mb-4  text-custom-purple font-sans mt-2">Select Your Vehicle</h1>
          <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 lg:p-6">
  <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
    {vehicles
      .filter(vehicle => {
        // Convert passengers and luggage to numbers for comparison
        const passengers = Number(vehicle.passengers);
        const luggage = Number(vehicle.luggage);
        return (passengers >= data.persons && luggage >= data.checkedLuggage);
      })
      .map((vehicle) => (
        <div
          key={vehicle.id}
          className="relative flex flex-col md:flex-row p-4 border border-gray-300 rounded-lg mb-6 cursor-pointer"
        >
         
          {/* Image and Details Section */}
          <div className="flex-shrink-0">
            <img 
              src={vehicle.image} 
              alt={vehicle.name} 
              className="w-32 lg:w-56 lg:h-40 h-24 object-cover rounded-lg" // Adjust image size
            />
            <div>
              <h3 className="text-sm text-gray-600">{vehicle.name}</h3>
              <h4 className="text-lg font-semibold text-black mt-1">Private Transfer</h4>
            </div>
          </div>

          <div className="flex-grow flex flex-col justify-between ml-4"> {/* Added margin-left for spacing */}
            {/* Centered Economy and Details */}
            <div className="flex flex-col mt-4"> {/* Economy Section */}
              <h1 className='font-sans text-black text-2xl font-bold'>{vehicle.head}</h1>

              <div className="flex items-center mt-3"> {/* Passengers and Luggage */}
                <div className="flex items-center">
                  <FaUser className="text-custom-gold mr-1 text-xl" />
                  <span className="text-gold-500 text-md md:text-lg font-semibold">Up to {vehicle.passengers} passengers</span>
                </div>
                <div className="flex items-center ml-4"> {/* Margin left to separate icons */}
                  <FaSuitcase className="text-custom-gold mx-2 text-xl" />
                  <span className="text-gold-500 text-md md:text-lg font-semibold">Up to {vehicle.luggage} luggage</span>
                </div>
              </div>
            </div>

            {/* Gray Background Features */}
            <div className="flex flex-row flex-wrap mt-4 gap-4"> 
              <div className="bg-gray-200 p-2 rounded-md flex items-center">
                <FaClock className="text-gold-500 mr-2" /> {/* Icon */}
                <span className="text-black text-md">Free Waiting Time</span>
              </div>
              <div className="bg-gray-200 p-2 rounded-md flex items-center">
                <FaBriefcase className="text-gold-500 mr-2" /> {/* Icon */}
                <span className="text-black text-md">Door to Door</span>
              </div>
              <div className="bg-gray-200 p-2 rounded-md flex items-center">
                <FaSuitcase className="text-gold-500 mr-2" /> {/* Icon for Porter Service */}
                <span className="text-black text-md">Porter Service</span>
              </div>
            </div>
          </div>

          {/* Total Price Section */}
          <div className="flex-shrink-0 text-center mt-4 md:mt-0 md:ml-4"> {/* Margin left for spacing on larger screens */}
            <p className="text-sm text-gray-600">Total One Price</p>
            <h2 className="text-3xl font-bold text-black">{vehicle.price}</h2>
            <div className="flex items-center justify-center mt-2">
              <FaCheckCircle className="text-custom-gold mr-1" /> {/* Tick icon */}
              <span className="text-sm text-gray-600">Best Service</span>
            </div>
            <div className="bg-black text-white text-md font-bold px-4 py-2 rounded-md mt-3" onClick={() => selectVehicle(vehicle.id)}>
              Select
            </div>
          </div>
        </div>
      ))}
  </div>
</div>


         
         
         
         
         
         
         
         
          {/* <div className="bg-white rounded-lg shadow-lg md:p-6 lg:p-6">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    {vehicles.map((vehicle) => (
      <div
        key={vehicle.id}
        className="relative flex flex-col p-4 border border-gray-300 rounded-lg mb-6 cursor-pointer transition-transform transform hover:scale-105"
      >
        <div className="absolute top-2 right-2 bg-purple-600 text-white text-xs px-2 py-1 rounded-full font-bold z-10">
          Select
        </div>

        <div className="flex items-center">
          <img 
            src={vehicle.image} 
            alt={vehicle.name} 
            className="w-32 lg:w-48 lg:h-40 h-24 object-cover rounded-lg mr-4"  />
          <div className="flex-grow">
         <h1 className='font-sans text-black text-2xl'>Economy</h1>
            <h3 className="text-lg md:text-xl font-bold text-purple-800">{vehicle.name}</h3> 
            <p className="text-sm md:text-md font-semibold text-yellow-600">
              Price: <span className="font-bold text-yellow-700">{vehicle.price}</span>
            </p>
            
            <div className="flex items-center mt-3 justify-between">
              <div className="flex items-center">
                <FaUser className="text-purple-800 mr-1 text-2xl" /> 
                <span className="text-purple-800 text-md md:text-lg font-semibold">{vehicle.passengers}</span>
              </div>
              <div className="flex items-center">
                <FaSuitcase className="text-purple-800 mx-2 text-2xl" /> 
                <span className="text-purple-800 text-md md:text-lg font-semibold">{vehicle.luggage}</span>
              </div>
              <div className="flex items-center">
                <FaBriefcase className="text-purple-800 ml-1 mr-2 text-2xl" /> 
                <span className="text-purple-800 text-md md:text-lg font-semibold">{vehicle.handLuggage}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
 */}


          {/* Navigation Back Button */}
          <button
            onClick={function () {
              setFormData({
                persons: '',
                handLuggage: '',
                checkedLuggage: '',
                flightNumber: '',
                landingTime: '',
                driverNote: '',
                addOns: [], // Initialize as an empty array
              });
              setTotalPrice("0£");
              navigate('/')
            }}
            className="mb-4 flex items-center bg-purple-100 text-custom-purple text mt-4 px-4 py-2 rounded-lg hover:bg-purple-200 focus:outline-none font-sans"
          >
            <FaArrowLeft className="mr-2 " />
            Go Home
          </button>
        </div>
      )}
 {/* Booking Form */}
 {activeStep === 2 && (
  <div className="bg-gray-50 rounded-lg shadow-lg p-6 lg:p-8 mt-8 mx-auto w-full lg:max-w-4xl md:max-w-2xl sm:max-w-md transition-transform transform hover:scale-100">
    {/* Stylish Instruction */}
    <div className="text-center mb-6 p-4 bg-purple-100 rounded-md border border-purple-300 text-custom-purple font-sans">
      <h2 className="text-xl font-bold">Please Log In to Proceed</h2>
      <p className="text-sm">To continue with your booking, you need to be logged in.</p>
    </div>

    <h2 className="text-3xl font-extrabold mb-6 text-custom-purple font-sans">Booking Details</h2>
    <form className="space-y-6">

{/* Phone Number */}
<div className="flex flex-col mb-4">
  <label className="text-xl font-sans font-semibold text-gray-700 mb-2">Phone Number<span className="text-red-500 ml-1">*</span></label>
  <input
    type="tel"
    name="phoneNumber"
    value={formData.phoneNumber} 
    onChange={handleChange}
    placeholder="Enter your phone number"
    pattern="[0-9]*" // Enforces numeric input
    onKeyPress={(e) => {
      if (!/[0-9]/.test(e.key)) {
        e.preventDefault(); // Prevent non-numeric input
      }
    }}
    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-purple bg-white placeholder-gray-500"
  />
  {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
</div>

      
     
      {/* Total Persons */}
      {/* <div className="flex flex-col mb-4">
        <label className=" font-semibold text-gray-700 mb-2 text-xl font-sans">Total Persons<span className="text-red-500 ml-1">*</span></label>
        <select
          name="persons"
          value={formData.persons}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-purple bg-white"
        >
          <option value="">Select number of persons</option>
          {
            Array.from({ length: (parseInt(UserPassenger) + 1) }, (_, index) => (
              <option key={index} value={index}>{index}</option>
            ))
          }
        </select>
        {errors.persons && <p className="text-red-500 text-sm mt-1">{errors.persons}</p>}
      </div> */}

      {/* Additional Fields */}
      
                  {/* Luggage Information */}
                  <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex flex-col w-full">
                <label className="text-xl font-semibold text-gray-700 mb-2 font-sans">Hand Luggage<span className="text-red-500 ml-1">*</span></label>
                <select
                  name="handLuggage"
                  value={formData.handLuggage}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-purple bg-white"
                >
                  <option value="">Select hand luggage quantity</option>
                  {/* {[0, 1, 2, 3, 4, 5].map(number => (
                    <option key={number} value={number}>{number}</option>
                  ))} */}

{Array.from({ length:parseInt(UserLuggage)+1 }, function (_, index) {
        return index; // Start from 0
      }).map(function (number) {
        return (
          <option key={number} value={number}>
            {number}
          </option>
        );
      })}

                </select>
                {errors.handLuggage && <p className="text-red-500 text-sm mt-1">{errors.handLuggage}</p>}
              </div>
              {/* <div className="flex flex-col w-full md:w-1/2">
                <label className="text-xl font-sans font-semibold text-gray-700 mb-2">Checked Luggage</label>
                <select
                  name="checkedLuggage"
                  value={formData.checkedLuggage}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-purple bg-white"
                >
                  <option value="">Select checked luggage quantity</option>

{Array.from({ length: parseInt(UserCheckLugged)+1 }, function (_, index) {
        return index; // Start from 0
      }).map(function (number) {
        return (
          <option key={number} value={number}>
            {number}
          </option>
        );
      })}
                </select>
                {errors.checkedLuggage && <p className="text-red-500 text-sm mt-1">{errors.checkedLuggage}</p>}
              </div> */}
            </div>

            {/* Add-ons */}
            <div className="flex flex-col mb-6">
              <label className="text-xl  font-sans font-semibold text-gray-700 mb-2">Add-Ons</label>
              <div className="flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={() => handleAddOnChange('childSeat')}
                  className={`py-3 font-sans px-4 rounded-md border ${formData.addOns.includes('childSeat') ? 'bg-custom-purple text-white' : 'bg-gray-200 text-gray-700'} focus:outline-none flex-1 sm:flex-none`}
                >
                  Child Seat (+£5)
                </button>
                <button
                  type="button"
                  onClick={() => handleAddOnChange('meetAndGreet')}
                  className={`py-3 px-4 rounded-md font-sans border ${formData.addOns.includes('meetAndGreet') ? 'bg-custom-purple text-white' : 'bg-gray-200 text-gray-700'} focus:outline-none flex-1 sm:flex-none`}
                >
                  Meet & Greet (+£10)
                </button>
              </div>
            </div>

            {/* New Fields */}
            <div className="flex flex-col mb-6">
              <label className="text-xl font-sans font-semibold text-gray-700 mb-2">Flight Number</label>
              <input
                type="text"
                name="flightNumber"
                value={formData.flightNumber}
                onChange={handleChange}
                placeholder="Enter your flight number"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-purple placeholder-gray-500"
              />
              {/* {errors.flightNumber && <p className="text-red-500 text-sm mt-1">{errors.flightNumber}</p>} */}
            
            </div>
           
            <div className="flex flex-col mb-6">
              
              <label className="text-xl font-sans font-semibold text-gray-700 mb-2">Landing Date/Time</label>
              <input

                type="datetime-local"
                name="landingTime"
                value={formData.landingTime}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-purple"
              


              />
              
              {/* {errors.landingTime && <p className="text-red-500 text-sm mt-1">{errors.landingTime}</p>} */}
            
            </div>
          
            <div className="flex flex-col mb-6">
              <label className="text-xl font-sans font-semibold text-gray-700 mb-2">Comment or Note for Drivers</label>
              <textarea
                name="driverNote"
                value={formData.driverNote}
                onChange={handleChange}
                placeholder="Enter any comments or notes for the drivers"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-purple h-32"
              />
          
            </div>

      
      {/* Your existing fields here */}




      {/* Checkbox for booking for someone else */}
      <div className="flex flex-col mb-4">
        <label className="text-sm font-sans font-semibold text-gray-700 mb-2">
          <input
            type="checkbox"
            name="bookingForSomeoneElse"
            checked={formData.bookingForSomeoneElse}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          Booking for Someone Else
        </label>
      </div>

      {/* Conditionally rendered fields for someone else */}
      {formData.bookingForSomeoneElse && (
        <>
          <div className="flex flex-col mb-4">
            <label className="text-xl font-semibold text-gray-700 mb-2 font-sans">Name of the Person<span className="text-red-500 ml-1">*</span></label>
            <input
              type="text"
              name="someoneElseName"
              value={formData.someoneElseName}
              onChange={handleChange}
              placeholder="Enter their name"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-purple bg-white"
            />
            {errors.someoneElseName && <p className="text-red-500 text-sm mt-1">{errors.someoneElseName}</p>}
          </div>

          <div className="flex flex-col mb-4">
            <label className="text-xl font-sans font-semibold text-gray-700 mb-2">Email of the Person <span className="text-red-500 ml-1">*</span> </label>
            <input
              type="email"
              name="someoneElseEmail"
              value={formData.someoneElseEmail}
              onChange={handleChange}
              placeholder="Enter their email"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-purple bg-white"
            />
            {errors.someoneElseEmail && <p className="text-red-500 text-sm mt-1">{errors.someoneElseEmail}</p>}
          </div>

          {/* Phone Number for Someone Else */}
          <div className="flex flex-col mb-4">
            <label className="text-xl font-sans font-semibold text-gray-700 mb-2">Phone Number of the Person  <span className="text-red-500 ml-1">*</span>  </label>
            <input
              type="tel"
              name="someoneElsePhone"
              value={formData.someoneElsePhone}
              onChange={handleChange}
              placeholder="Enter their phone number"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-purple bg-white"
            />
            {errors.someoneElsePhone && <p className="text-red-500 text-sm mt-1">{errors.someoneElsePhone}</p>}
          </div>
        </>
      )}
   

        {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-between mt-6 gap-4 font-sans">
              {activeStep > 1 && (
                <button
                  type="button"
                  onClick={goBack}
                  className="bg-purple-100 text-custom-purple font-sans px-6 py-3 rounded-lg flex items-center"
                >
                  <FaArrowLeft className="mr-2" />
                  Back
                </button>
              )}
              <button
                type="button"
                onClick={goNext}
                className="bg-custom-purple font-sans text-white px-6 py-3 rounded-lg flex items-center"
              >
                {activeStep < 3 ? (
                  <>
                    Next
                    <FaArrowRight className="ml-2" />
                  </>
                ) : (
                  'Confirm Booking'
                )}
              </button>
            </div>
          </form>
        </div>
      )} 
          

      {/* Payment Form */}


      {/* {activeStep === 3 && (
  <div>
    <Button>Add Cash</Button>
    <PaymentComponent totalPrice={totalPrice} finalObject={finalObject} />
  </div>
)} */}




      {activeStep === 3 && (
         <div>
        {   activeStep === 3 &&  <PaymentComponent totalPrice={totalPrice}    finalObject={finalObject}   />   }
       </div> ) }

       <div className="flex flex-col sm:flex-row justify-between mt-6 gap-4">
              {activeStep > 1 && activeStep === 3 && (
                <button
                  type="button"
                  onClick={goBack}
                  className="bg-purple-100 text-purple-700 px-6 py-3 rounded-lg flex items-center"
                >
                  <FaArrowLeft className="mr-2" />
                  Back
                </button>
              )}
              </div>

      {/* Trip Details Sidebar */}
            <div className="bg-gradient-to-r from-white via-gray-50 to-gray-100 rounded-lg shadow-lg p-4 lg:p-6 mt-6 mx-auto border border-gray-300 w-full lg:max-w-2xl md:max-w-lg sm:max-w-md">
        <h3 className="text-xl lg:text-2xl font-semibold mb-4 text-custom-purple border-b border-purple-300 pb-2 font-sans">Trip Details</h3>

        <div className="space-y-4">
          <div className="flex items-start py-2 border-b border-gray-200">
            <svg className="w-5 h-5 text-custom-purple mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 20c-6.627 0-12-5.373-12-12s5.373-12 12-12 12 5.373 12 12-5.373 12-12 12z" />
            </svg>
            <div className="flex-1">
              <p className="text-gray-600 font-medium mb-1 font-sans"><strong>Pickup:</strong></p>
              <p className="text-gray-800 font-sans">{data.from}</p>
            </div>
          </div>

        {
          data.to && (
            <div className="flex items-start py-2 border-b border-gray-200 font-sans">
            <svg className="w-5 h-5 text-custom-purple mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 20c-6.627 0-12-5.373-12-12s5.373-12 12-12 12 5.373 12 12-5.373 12-12 12z" />
            </svg>
            <div className="flex-1">
              <p className="text-gray-600 font-medium mb-1 font-sans"><strong>Dropoff:</strong></p>
              <p className="text-gray-800 font-sans">{data.to}</p>
            </div>
          </div>
          )
        }
                  {
        data.hour &&   (<div className="grid grid-cols-2 gap-4 py-2 border-b border-gray-200">
        <div>
          <p className="text-gray-600 font-medium font-sans"><strong>Duration: </strong></p>

        </div>
        <div>
          <p className="text-gray-800 font-sans"> {data.hour+" "} Hour</p>
        </div>
      </div>
       )}  

        

          <div className="grid grid-cols-2 gap-4 py-2 border-b border-gray-200">
            <div>
              <p className="text-gray-600 font-medium font-sans"><strong>Pickup Date:</strong></p>
              <p className="text-gray-800 font-sans">{data.pickupDate}</p>
            </div>
            <div>
              <p className="text-gray-600 font-medium font-sans"><strong>Pickup Time:</strong></p>
              <p className="text-gray-800 font-sans">{data.pickupTime}</p>
            </div>
          </div>

          {data.returnDate && data.returnTime && (
            <div className="grid grid-cols-2 gap-4 py-2 border-b border-gray-200">
              <div>
                <p className="text-gray-600 font-medium font-sans"><strong>Return Date:</strong></p>
                <p className="text-gray-800 font-sans">{data.returnDate}</p>
              </div>
              <div>
                <p className="text-gray-600 font-medium font-sans"><strong>Return Time:</strong></p>
                <p className="text-gray-800 font-sans">{data.returnTime}</p>
              </div>
            </div>
          )}

          {formData.landingTime && (
            <div className="grid grid-cols-2 gap-4 py-2 border-b border-gray-200">
              <div>
                <p className="text-gray-600 font-medium font-sans"><strong>Landing Date/Time: </strong></p>

              </div>
              <div>
                <p className="text-gray-800 font-sans">{" " + formData.landingTime}</p>
              </div>
            </div>
          )}

          {formData.flightNumber && (

            <div className="grid grid-cols-2 gap-4 py-2 border-b border-gray-200 font-sans">
              <div>
                <p className="text-gray-600 font-medium font-sans"><strong>Flight Number: </strong></p>

              </div>
              <div>
                <p className="text-gray-800 font-sans">{" " + formData.flightNumber}</p>
              </div>
            </div>


          )}

          {data.checkedLuggage && (
            <div className="grid grid-cols-2 gap-4 py-2 border-b border-gray-200">
              <div>
                <p className="text-gray-600 font-medium font-sans"><strong>Luggage:</strong></p>
                <p className="text-gray-800 font-sans">{data.checkedLuggage}</p>
              </div>
              <div>
                <p className="text-gray-600 font-medium font-sans"><strong>Hand Luggage:</strong></p>
                <p className="text-gray-800 font-sans">{formData.handLuggage}</p>
              </div>
            </div>
          )}



       {
        data.estimatedTime &&   (<div className="grid grid-cols-2 gap-4 py-2 border-b border-gray-200 font-sans">
        <div>
          <p className="text-gray-600 font-medium font-sans"><strong>Distance: </strong></p>

        </div>
        <div>
          <p className="text-gray-800 font-sans"> {data.distance+" miles "}  ({data.estimatedTime})</p>
        </div>
      </div>
       )}  


{formData.addOns.length > 0 && (
  <div className="py-2 border-b border-gray-200">
    <p className="text-gray-600 font-medium font-sans"><strong>Selected Add-ons:</strong></p>
    <ul className="list-disc pl-5">
      {formData.addOns.map((addOn, index) => (
        <li key={index} className="text-gray-800 font-sans">{addOn}</li>
      ))}
    </ul>
  </div>
)}

    


          <div className="grid grid-cols-2 gap-4 py-2 border-b border-gray-200">
            <div>
              <p className="text-gray-600 font-medium font-sans"><strong>Passengers: </strong></p>

            </div>
            <div>
              <p className="text-gray-800 font-sans"> { data.persons}</p>
            </div>
          </div>

          {
        formData.someoneElseName &&   (<div className="grid grid-cols-2 gap-4 py-2 border-b border-gray-200 font-sans">
        <div>
          <p className="text-gray-600 font-medium font-sans"><strong>Booking For: </strong></p>

        </div>
        <div>
          <p className="text-gray-800 font-sans"> {formData.someoneElseName}</p>
        </div>
      </div>
       )}  
        
        {formData.someoneElseEmail && formData.someoneElsePhone && (
            <div className="grid lg:grid-cols-2 gap-4 py-2 border-b border-gray-200 sm:grid-cols-1">
              <div>
                <p className="text-gray-600 font-medium font-sans"><strong>Email:</strong></p>
                <p className="text-gray-800 font-sans">{formData.someoneElseEmail}</p>
              </div>
              <div>
                <p className="text-gray-600 font-medium font-sans"><strong> Phone No:</strong></p>
                <p className="text-gray-800 font-sans">{formData.someoneElsePhone}</p>
              </div>
            </div>
          )}


{
        formData.driverNote &&   (<div className="grid grid-cols-2 gap-4 py-2 border-b border-gray-200 font-sans">
        <div>
          <p className="text-gray-600 font-medium font-sans"><strong>Driver Note: </strong></p>

        </div>
        <div>
          <p className="text-gray-800 font-sans"> {formData.driverNote}</p>
        </div>
      </div>
       )}  


          <div className="py-2">
            <p className="text-gray-800 text-xl font-extrabold font-sans"><strong>Total:</strong> <span className="text-custom-purple font-extrabold text-2xl font-sans">{totalPrice+" "} £</span></p>
          </div>
        </div>
      </div>


      
    </div>
  );
};

export default VehicleBookingSteps;












// import React, { useState, useContext } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import suv from "../assets/suv.jpg";

// import {
//   FaCheckCircle, FaCar, FaClipboardList, FaCreditCard, FaArrowLeft, FaArrowRight, FaUser, FaSuitcase, FaBriefcase
// } from 'react-icons/fa';
// import { AuthContext } from './contextProvider';
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import PaymentComponent from "../components/PaymentComponent";
// import economy from "../assets/economy.jpg"
// import standard from "../assets/standard.jpg"
// import firstClass from "../assets/firstClass.jpg"
// import minibus1 from "../assets/minibus1.jpg"
// import minibus2 from "../assets/minibus2.jpg"
// import firstClassVan from "../assets/firstClassVan.jpg"
// import suvs from "../assets/suv.jpg"
// import standardVan from "../assets/standardVan.jpg"



// const VehicleBookingSteps = () => {
//   const { isSignedInFinal, signInFinal, signOutFinal,popUp,signInPopUpFalse,signInPopUpTrue   } = useContext(AuthContext);
//   const [finalObject,setFinalObject]=useState({
//     someoneElsePhone:'',
//     persons: '',
//     phoneNumber:'',
//     handLuggage: '',
//     checkedLuggage: '',
//     flightNumber: '',
//     landingTime: '',
  
//     driverNote: '',
//     addOns: [], // Initialize as an empty array

//  from: '',
//     to: '',
//     pickupDate: '',  
//     pickupTime: '',
//     returnDate: '',
//     returnTime: '',
//     distance: '',estimatedTime:'',
//       // New fields for validation
//       bookingForSomeoneElse: false, // Checkbox initial value
 
//   someoneElseName: '', // Error for name for someone else
//   someoneElseEmail: '', // Error for email for someone else



//   })
//   const MySwal = withReactContent(Swal);

//   const stripePromise = loadStripe('');


//   const [activeStep, setActiveStep] = useState(1);
//   const [totalPrice, setTotalPrice] = useState(0);

//   const [UserPassenger,setPassenger]=useState(0);
//   const [UserLuggage,setLuggage]=useState(0);
//   const [UserCheckLugged,setCheckedLuggage]=useState(0);

//   const [count, setCount] = useState(0);

// // Updated formData with new fields for 'Booking for someone else'
// const [formData, setFormData] = useState({
//   someoneElsePhone:'',
//   phoneNumber:'',
//   persons: '',
//   handLuggage: '',
  
//   checkedLuggage: '',
//   flightNumber: '',
//   landingTime: '',
//   driverNote: '',
//   addOns: [], // Initialize as an empty array

//   // New fields for booking for someone else
//   bookingForSomeoneElse: false, // Checkbox initial value
//   someoneElseName: '', // Name for someone else
//   someoneElseEmail: '', // Email for someone else
// });

// // Updated errors state with validation for new fields
// const [errors, setErrors] = useState({
//   someoneElsePhone:'',
//   phoneNumber:'',
 
//   persons: '',
//   handLuggage: '',
//   checkedLuggage: '',
//   flightNumber: '',
//   landingTime: '',

//   // New fields for validation
//   someoneElseName: '', // Error for name for someone else
//   someoneElseEmail: '', // Error for email for someone else
// });


//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({ ...prevState, [name]: value }));
//   };

//   const handleAddOnChange = (addOn) => {
//     setFormData(prevState => {
//       const addOns = new Set(prevState.addOns);
//       if (addOns.has(addOn)) {
//         addOns.delete(addOn);
//       } else {
//         addOns.add(addOn);
//       }
//       return { ...prevState, addOns: Array.from(addOns) };
//     });
//   };


//   const navigate = useNavigate(); // Hook to handle navigation
//   const location = useLocation();
//   const data = location.state?.formData;
//   console.log(data.to)

  
  

//   const steps = [
//     { id: 1, name: 'Select Vehicle', icon: <FaCar /> },
//     { id: 2, name: 'Booking', icon: <FaClipboardList /> },
//     { id: 3, name: 'Payment', icon: <FaCreditCard /> },
//   ];

//   const vehicles = [
//     { id: 1, name: 'Vw jatta or similar', price: `£ ${(data.distance*4.5).toFixed(2)}`, passengers: '3', image: `${economy}`, luggage: '2', handLuggage: '2' },
//     { id: 2, name: 'Kia niro or similar', price: `£ ${(data.distance * 6.5).toFixed(2)}`, passengers: '4', image: `${standard}`, luggage: '2', handLuggage: '2' },
//     { id: 3, name: 'Mercedes e class or similar', price: `£ ${(data.distance * 9.5).toFixed(2)}`, passengers: '3', image: `${firstClass}`, luggage: '2', handLuggage: '2' },
//     { id: 4, name: 'Toyota voxy or similar', price: `£${(data.distance * 6.2).toFixed(2)}`, passengers: '5', image: `${suvs}`, luggage: '3', handLuggage: '3' },
//     { id: 5, name: 'Mercedes v class or similar', price: `£ ${(data.distance * 6.9).toFixed(2)}`, passengers: '6', image: `${standardVan}`, luggage: '5', handLuggage: '3' },
//     { id: 6, name: 'Vw transporter, ford tourneo or similar', price: `£ ${(data.distance * 9.2).toFixed(2)}`, passengers: '8', image: `${firstClassVan}`, luggage: '8', handLuggage: '8' },
//     // { id: 7, name: 'Vw transporter, ford tourneo or similar', price: `£ ${(data.distance * 11.8).toFixed(2)}`, passengers: '12', image: `${minibus1}`, luggage: '8', handLuggage: '4' },
//     { id: 8, name: 'Renauld traffic sport, vw transporter or similar', price: `£ ${(data.distance * 12.4).toFixed(2)}`, passengers: '14', image: `${minibus2}`, luggage: '14', handLuggage: '10' },
// ];

// const selectVehicle = (vehicleId) => {
//   // Reset passenger, luggage, and checked luggage to 0
//   setPassenger(0);
//   setLuggage(0);
//   setCheckedLuggage(0);

//   let totalPrice = 0;
//   let currencySymbol = '';

//   // Find the vehicle based on its ID
//   const selectedVehicle = vehicles.find(vehicle => vehicle.id === vehicleId);
//   const vehiclePrice = parseFloat(selectedVehicle.price.slice(1)); // Remove the currency symbol and convert to number

//   if (selectedVehicle) {
//     // Extract the currency symbol and numeric part
//     currencySymbol = selectedVehicle.price.charAt(0); // Get the currency symbol (e.g., £)
//     // const vehiclePrice = parseFloat(selectedVehicle.price.slice(1)); // Remove the currency symbol and convert to number

//     // Update the count with the vehicle's price
//     setCount(vehiclePrice);

//     // Log the vehicle price
//     console.log("Vehicle price:", vehiclePrice);

//     // Set the base price to the vehicle's price
//     totalPrice += vehiclePrice;

//     // Add additional costs based on formData
//     if (formData.addOns.includes("childSeat")) totalPrice += 5;   // Add £5 for child seat
//     if (formData.addOns.includes("meetAndGreet")) totalPrice += 10; // Add £10 for meet and greet

//     // Log add-ons costs
//     console.log("Add-ons costs:", formData.addOns);

//   } else {
//     console.error("Selected vehicle not found");
//     return; // Exit if the vehicle is not found
//   }

//   // Calculate the total price based on distance
//   // const finalPrice = (totalPrice * data.distance).toFixed(2);
  
//   // Set the total price in the state
//   setTotalPrice(`${currencySymbol}${vehiclePrice}`);

//   // Log the total price
//   // console.log("Total price:", finalPrice);

//   // Update passenger, hand luggage, and checked luggage details
//   setPassenger(selectedVehicle.passengers);
//   setLuggage(selectedVehicle.handLuggage);
//   setCheckedLuggage(selectedVehicle.luggage);


//   // Move to the next step
//   setActiveStep(2);
// };


//   const goBack = () => {
//     //  setFormData({
//     //   persons: '',
//     //   handLuggage: '',
//     //   checkedLuggage: '',
//     //   flightNumber: '',
//     //   landingTime: '',
//     //   driverNote: '',
//     //   addOns: [], // Initialize as an empty array
//     // });
//     //  setTotalPrice(0)
//     setActiveStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep));
//   };



//   const goNext = () => {
//     // Validate form data and set errors
//     const newErrors = {
//       persons: formData.persons ? '' : 'Total persons is required.',
//       handLuggage: formData.handLuggage !== '' ? '' : 'Hand luggage quantity is required.',
//       checkedLuggage: formData.checkedLuggage !== '' ? '' : 'Checked luggage quantity is required.',
//       flightNumber: formData.flightNumber ? '' : 'Flight number is required.',
//       landingTime: formData.landingTime ? '' : 'Landing time is required.',
//       phoneNumber: formData.phoneNumber ? '' : 'Mobile no required.',
//      };
  
//     // If "Booking for someone else" is checked, validate name and email fields
//     if (formData.bookingForSomeoneElse) {
//       newErrors.someoneElsePhone  =formData.someoneElsePhone? '': 'Mobile no required',
//       newErrors.someoneElseName = formData.someoneElseName ? '' : 'Name for someone else is required.';
//       newErrors.someoneElseEmail = formData.someoneElseEmail ? '' : 'Email for someone else is required.';
//     }
  
//     setErrors(newErrors);
  
//     // Check if there are any validation errors
//     const hasErrors = Object.values(newErrors).some(error => error !== '');
  
//     if (hasErrors) {
//       return; // Stop here if there are validation errors
//     }
  
//     // Compute the total price based on selected add-ons
//     let calculatedPrice = count;
  
//     if (formData.addOns.includes('childSeat')) {
//       calculatedPrice += 5;
//     }
//     if (formData.addOns.includes('meetAndGreet')) {
//       calculatedPrice += 10;
//     }
  
//     // Set the updated total price
//     setTotalPrice(calculatedPrice);
//     console.log(finalObject);
  
//     if (isSignedInFinal) {
//       // Prepare the final object with all form data
//       const finalObject = { ...formData, ...data };
  
//       setFinalObject(finalObject);
//       console.log(finalObject);
      
          
  
//       // Proceed to the next step if there are no errors
//       setActiveStep((prevStep) => (prevStep < 3 ? prevStep + 1 : prevStep));
//     } else {
//       signInPopUpTrue();
//       console.log("pop =" + popUp);
  
//     }
//   };
  

//   const calculatePrice = () => {
//     let totalPrice = 0;
//     if (formData.childSeat) totalPrice += 5;
//     if (formData.meetAndGreet) totalPrice += 10;
//     return totalPrice;
//   };



// // Function to handle checkbox toggle
// const handleCheckboxChange = (e) => {
//   const { name, checked } = e.target;
//   setFormData((prevData) => ({
//     ...prevData,
//     [name]: checked,
//     // Reset the fields if the checkbox is unchecked
//     someoneElseName: checked ? prevData.someoneElseName : '',
//     someoneElseEmail: checked ? prevData.someoneElseEmail : '',
//     someoneElsePhone: checked ? prevData.someoneElsePhone : '',
//   }));
// };






//   return (



//     <div className="max-w-7xl mx-auto lg:p-16 md:p-16  p-4  bg-gray-50 rounded-lg shadow-lg">



//       {/* Stepper */}
//       <div className="flex justify-between mb-8 lg:mt-6">
//         {steps.map((step) => (
//           <div key={step.id} className="flex-1 text-center">
//             <div
//               className={`rounded-full w-12 h-12 mx-auto flex items-center justify-center mb-2
//               ${activeStep === step.id ? 'bg-purple-600 text-white' : 'bg-purple-200 text-purple-600'}`}
//             >
//               {activeStep > step.id ? <FaCheckCircle /> : step.icon}
//             </div>
//             <p className={`${activeStep === step.id ? 'font-bold text-purple-600' : 'text-gray-600'}`}>
//               {step.name}
//             </p>
//           </div>
//         ))}
//       </div>

//       {/* Vehicle Selection */}
//       {activeStep === 1 && (
//         <div>
//           <h2 className="text-2xl font-bold mb-4  text-purple-700">Select Your Vehicle</h2>

//           <div className="bg-white rounded-lg shadow-md md:p-4 lg:p-4">
//             <div className="grid grid-cols-1 lg:grid-cols-2  gap-4">
//               {vehicles.map((vehicle) => (
//                 <div
//                   key={vehicle.id}
//                   className="relative flex items-center p-4 border border-gray-300 rounded-lg mb-4 cursor-pointer"
//                   onClick={() => selectVehicle(vehicle.id)}
//                 >
//                   <img src={vehicle.image} alt={vehicle.name} className="w-24 lg:w-40 lg:h-36 h-16 object-cover rounded-lg mr-4" />
//                   <div className="flex-grow">
//                     <h3 className="text-lg font-semibold text-purple-800">{vehicle.name}</h3>
//                     <p className="text-sm text-yellow-600">Price: <span className="text-yellow-600">{vehicle.price}</span></p>
//                     <div className="flex items-center mt-2 justify-between">
//                       <div className="flex items-center">
//                         <FaUser className="text-purple-800 mr-1 text-2xl" />
//                         <span className="text-purple-800 text-lg">{vehicle.passengers}</span>
//                       </div>
//                       <div className="flex items-center">
//                         <FaSuitcase className="text-purple-800 mx-2 text-2xl" />
//                         <span className="text-purple-800 text-lg">{vehicle.luggage}</span>
//                       </div>
//                       <div className="flex items-center">
//                         <FaBriefcase className="text-purple-800 ml-1 mr-2 text-2xl" />
//                         <span className="text-purple-800 text-lg">{vehicle.handLuggage}</span>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="absolute top-2 right-2 bg-purple-600 text-white text-xs px-2 py-1 rounded-full">
//                     Select
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Navigation Back Button */}
//           <button
//             onClick={function () {
//               setFormData({
//                 persons: '',
//                 handLuggage: '',
//                 checkedLuggage: '',
//                 flightNumber: '',
//                 landingTime: '',
//                 driverNote: '',
//                 addOns: [], // Initialize as an empty array
//               });
//               setTotalPrice("0£");
//               navigate('/')
//             }}
//             className="mb-4 flex items-center bg-purple-100 text-purple-700 mt-4 px-4 py-2 rounded-lg hover:bg-purple-200 focus:outline-none"
//           >
//             <FaArrowLeft className="mr-2" />
//             Go Home
//           </button>
//         </div>
//       )}
//  {/* Booking Form */}
//  {activeStep === 2 && (
//   <div className="bg-gray-50 rounded-lg shadow-lg p-6 lg:p-8 mt-8 mx-auto w-full lg:max-w-4xl md:max-w-2xl sm:max-w-md transition-transform transform hover:scale-100">
//     {/* Stylish Instruction */}
//     <div className="text-center mb-6 p-4 bg-purple-100 rounded-md border border-purple-300 text-purple-800">
//       <h2 className="text-xl font-bold">Please Log In to Proceed</h2>
//       <p className="text-sm">To continue with your booking, you need to be logged in.</p>
//     </div>

//     <h2 className="text-3xl font-extrabold mb-6 text-purple-800">Booking Details</h2>
//     <form className="space-y-6">

// {/* Phone Number */}
// <div className="flex flex-col mb-4">
//   <label className="text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
//   <input
//     type="tel"
//     name="phoneNumber"
//     value={formData.phoneNumber} 
//     onChange={handleChange}
//     placeholder="Enter your phone number"
//     pattern="[0-9]*" // Enforces numeric input
//     onKeyPress={(e) => {
//       if (!/[0-9]/.test(e.key)) {
//         e.preventDefault(); // Prevent non-numeric input
//       }
//     }}
//     className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white placeholder-gray-500"
//   />
//   {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
// </div>

      
     
//       {/* Total Persons */}
//       <div className="flex flex-col mb-4">
//         <label className="text-sm font-semibold text-gray-700 mb-2">Total Persons</label>
//         <select
//           name="persons"
//           value={formData.persons}
//           onChange={handleChange}
//           className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
//         >
//           <option value="">Select number of persons</option>
//           {
//             Array.from({ length: (parseInt(UserPassenger) + 1) }, (_, index) => (
//               <option key={index} value={index}>{index}</option>
//             ))
//           }
//         </select>
//         {errors.persons && <p className="text-red-500 text-sm mt-1">{errors.persons}</p>}
//       </div>

//       {/* Additional Fields */}
      
//                   {/* Luggage Information */}
//                   <div className="flex flex-col md:flex-row gap-4 mb-4">
//               <div className="flex flex-col w-full md:w-1/2">
//                 <label className="text-sm font-semibold text-gray-700 mb-2">Hand Luggage</label>
//                 <select
//                   name="handLuggage"
//                   value={formData.handLuggage}
//                   onChange={handleChange}
//                   className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
//                 >
//                   <option value="">Select hand luggage quantity</option>
//                   {/* {[0, 1, 2, 3, 4, 5].map(number => (
//                     <option key={number} value={number}>{number}</option>
//                   ))} */}

// {Array.from({ length:parseInt(UserLuggage)+1 }, function (_, index) {
//         return index; // Start from 0
//       }).map(function (number) {
//         return (
//           <option key={number} value={number}>
//             {number}
//           </option>
//         );
//       })}

//                 </select>
//                 {errors.handLuggage && <p className="text-red-500 text-sm mt-1">{errors.handLuggage}</p>}
//               </div>
//               <div className="flex flex-col w-full md:w-1/2">
//                 <label className="text-sm font-semibold text-gray-700 mb-2">Checked Luggage</label>
//                 <select
//                   name="checkedLuggage"
//                   value={formData.checkedLuggage}
//                   onChange={handleChange}
//                   className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
//                 >
//                   <option value="">Select checked luggage quantity</option>
//                   {/* {[0, 1, 2, 3, 4, 5].map(number => (
//                     <option key={number} value={number}>{number}</option>
//                   ))} */}

// {Array.from({ length: parseInt(UserCheckLugged)+1 }, function (_, index) {
//         return index; // Start from 0
//       }).map(function (number) {
//         return (
//           <option key={number} value={number}>
//             {number}
//           </option>
//         );
//       })}
//                 </select>
//                 {errors.checkedLuggage && <p className="text-red-500 text-sm mt-1">{errors.checkedLuggage}</p>}
//               </div>
//             </div>

//             {/* Add-ons */}
//             <div className="flex flex-col mb-6">
//               <label className="text-sm font-semibold text-gray-700 mb-2">Add-Ons</label>
//               <div className="flex flex-wrap gap-4">
//                 <button
//                   type="button"
//                   onClick={() => handleAddOnChange('childSeat')}
//                   className={`py-3 px-4 rounded-md border ${formData.addOns.includes('childSeat') ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'} focus:outline-none flex-1 sm:flex-none`}
//                 >
//                   Child Seat (+£5)
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => handleAddOnChange('meetAndGreet')}
//                   className={`py-3 px-4 rounded-md border ${formData.addOns.includes('meetAndGreet') ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'} focus:outline-none flex-1 sm:flex-none`}
//                 >
//                   Meet & Greet (+£10)
//                 </button>
//               </div>
//             </div>

//             {/* New Fields */}
//             <div className="flex flex-col mb-6">
//               <label className="text-sm font-semibold text-gray-700 mb-2">Flight Number</label>
//               <input
//                 type="text"
//                 name="flightNumber"
//                 value={formData.flightNumber}
//                 onChange={handleChange}
//                 placeholder="Enter your flight number"
//                 className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500"
//               />
//               {errors.flightNumber && <p className="text-red-500 text-sm mt-1">{errors.flightNumber}</p>}
            
//             </div>
           
//             <div className="flex flex-col mb-6">
              
//               <label className="text-sm font-semibold text-gray-700 mb-2">Landing Date/Time</label>
//               <input

//                 type="datetime-local"
//                 name="landingTime"
//                 value={formData.landingTime}
//                 onChange={handleChange}
//                 className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              


//               />
              
//               {errors.landingTime && <p className="text-red-500 text-sm mt-1">{errors.landingTime}</p>}
            
//             </div>
          
//             <div className="flex flex-col mb-6">
//               <label className="text-sm font-semibold text-gray-700 mb-2">Comment or Note for Drivers</label>
//               <textarea
//                 name="driverNote"
//                 value={formData.driverNote}
//                 onChange={handleChange}
//                 placeholder="Enter any comments or notes for the drivers"
//                 className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 h-32"
//               />
          
//             </div>

      
//       {/* Your existing fields here */}




//       {/* Checkbox for booking for someone else */}
//       <div className="flex flex-col mb-4">
//         <label className="text-sm font-semibold text-gray-700 mb-2">
//           <input
//             type="checkbox"
//             name="bookingForSomeoneElse"
//             checked={formData.bookingForSomeoneElse}
//             onChange={handleCheckboxChange}
//             className="mr-2"
//           />
//           Booking for Someone Else
//         </label>
//       </div>

//       {/* Conditionally rendered fields for someone else */}
//       {formData.bookingForSomeoneElse && (
//         <>
//           <div className="flex flex-col mb-4">
//             <label className="text-sm font-semibold text-gray-700 mb-2">Name of the Person</label>
//             <input
//               type="text"
//               name="someoneElseName"
//               value={formData.someoneElseName}
//               onChange={handleChange}
//               placeholder="Enter their name"
//               className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
//             />
//             {errors.someoneElseName && <p className="text-red-500 text-sm mt-1">{errors.someoneElseName}</p>}
//           </div>

//           <div className="flex flex-col mb-4">
//             <label className="text-sm font-semibold text-gray-700 mb-2">Email of the Person</label>
//             <input
//               type="email"
//               name="someoneElseEmail"
//               value={formData.someoneElseEmail}
//               onChange={handleChange}
//               placeholder="Enter their email"
//               className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
//             />
//             {errors.someoneElseEmail && <p className="text-red-500 text-sm mt-1">{errors.someoneElseEmail}</p>}
//           </div>

//           {/* Phone Number for Someone Else */}
//           <div className="flex flex-col mb-4">
//             <label className="text-sm font-semibold text-gray-700 mb-2">Phone Number of the Person</label>
//             <input
//               type="tel"
//               name="someoneElsePhone"
//               value={formData.someoneElsePhone}
//               onChange={handleChange}
//               placeholder="Enter their phone number"
//               className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
//             />
//             {errors.someoneElsePhone && <p className="text-red-500 text-sm mt-1">{errors.someoneElsePhone}</p>}
//           </div>
//         </>
//       )}
   

//         {/* Action Buttons */}
//             <div className="flex flex-col sm:flex-row justify-between mt-6 gap-4">
//               {activeStep > 1 && (
//                 <button
//                   type="button"
//                   onClick={goBack}
//                   className="bg-purple-100 text-purple-700 px-6 py-3 rounded-lg flex items-center"
//                 >
//                   <FaArrowLeft className="mr-2" />
//                   Back
//                 </button>
//               )}
//               <button
//                 type="button"
//                 onClick={goNext}
//                 className="bg-purple-600 text-white px-6 py-3 rounded-lg flex items-center"
//               >
//                 {activeStep < 3 ? (
//                   <>
//                     Next
//                     <FaArrowRight className="ml-2" />
//                   </>
//                 ) : (
//                   'Confirm Booking'
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>
//       )} 
          

//       {/* Payment Form */}


//       {/* {activeStep === 3 && (
//   <div>
//     <Button>Add Cash</Button>
//     <PaymentComponent totalPrice={totalPrice} finalObject={finalObject} />
//   </div>
// )} */}




//       {activeStep === 3 && (
//          <div>
//         {   activeStep === 3 &&  <PaymentComponent totalPrice={totalPrice}    finalObject={finalObject}   />   }
//        </div> ) }

//        <div className="flex flex-col sm:flex-row justify-between mt-6 gap-4">
//               {activeStep > 1 && activeStep === 3 && (
//                 <button
//                   type="button"
//                   onClick={goBack}
//                   className="bg-purple-100 text-purple-700 px-6 py-3 rounded-lg flex items-center"
//                 >
//                   <FaArrowLeft className="mr-2" />
//                   Back
//                 </button>
//               )}
//               </div>

//       {/* Trip Details Sidebar */}
//             <div className="bg-gradient-to-r from-white via-gray-50 to-gray-100 rounded-lg shadow-lg p-4 lg:p-6 mt-6 mx-auto border border-gray-300 w-full lg:max-w-2xl md:max-w-lg sm:max-w-md">
//         <h3 className="text-xl lg:text-2xl font-semibold mb-4 text-purple-800 border-b border-purple-300 pb-2">Trip Details</h3>

//         <div className="space-y-4">
//           <div className="flex items-start py-2 border-b border-gray-200">
//             <svg className="w-5 h-5 text-purple-600 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 20c-6.627 0-12-5.373-12-12s5.373-12 12-12 12 5.373 12 12-5.373 12-12 12z" />
//             </svg>
//             <div className="flex-1">
//               <p className="text-gray-600 font-medium mb-1"><strong>Pickup:</strong></p>
//               <p className="text-gray-800">{data.from}</p>
//             </div>
//           </div>

//           <div className="flex items-start py-2 border-b border-gray-200">
//             <svg className="w-5 h-5 text-purple-600 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 20c-6.627 0-12-5.373-12-12s5.373-12 12-12 12 5.373 12 12-5.373 12-12 12z" />
//             </svg>
//             <div className="flex-1">
//               <p className="text-gray-600 font-medium mb-1"><strong>Dropoff:</strong></p>
//               <p className="text-gray-800">{data.to}</p>
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-4 py-2 border-b border-gray-200">
//             <div>
//               <p className="text-gray-600 font-medium"><strong>Pickup Date:</strong></p>
//               <p className="text-gray-800">{data.pickupDate}</p>
//             </div>
//             <div>
//               <p className="text-gray-600 font-medium"><strong>Pickup Time:</strong></p>
//               <p className="text-gray-800">{data.pickupTime}</p>
//             </div>
//           </div>

//           {false && false && (
//             <div className="grid grid-cols-2 gap-4 py-2 border-b border-gray-200">
//               <div>
//                 <p className="text-gray-600 font-medium"><strong>Return Date:</strong></p>
//                 <p className="text-gray-800">{data.returnDate}</p>
//               </div>
//               <div>
//                 <p className="text-gray-600 font-medium"><strong>Return Time:</strong></p>
//                 <p className="text-gray-800">{data.returnTime}</p>
//               </div>
//             </div>
//           )}

//           {true && true && (
//             <div className="grid grid-cols-2 gap-4 py-2 border-b border-gray-200">
//               <div>
//                 <p className="text-gray-600 font-medium"><strong>Landing Date/Time: </strong></p>

//               </div>
//               <div>
//                 <p className="text-gray-800">{" " + formData.landingTime}</p>
//               </div>
//             </div>
//           )}

//           {true && (

//             <div className="grid grid-cols-2 gap-4 py-2 border-b border-gray-200">
//               <div>
//                 <p className="text-gray-600 font-medium"><strong>Flight Number: </strong></p>

//               </div>
//               <div>
//                 <p className="text-gray-800">{" " + formData.flightNumber}</p>
//               </div>
//             </div>


//           )}

//           {true && true && (
//             <div className="grid grid-cols-2 gap-4 py-2 border-b border-gray-200">
//               <div>
//                 <p className="text-gray-600 font-medium"><strong>Luggage:</strong></p>
//                 <p className="text-gray-800">{formData.checkedLuggage}</p>
//               </div>
//               <div>
//                 <p className="text-gray-600 font-medium"><strong>Hand Luggage:</strong></p>
//                 <p className="text-gray-800">{formData.handLuggage}</p>
//               </div>
//             </div>
//           )}



//           <div className="grid grid-cols-2 gap-4 py-2 border-b border-gray-200">
//             <div>
//               <p className="text-gray-600 font-medium"><strong>Distance: </strong></p>

//             </div>
//             <div>
//               <p className="text-gray-800"> {data.distance+" miles "}  ({data.estimatedTime})</p>
//             </div>
//           </div>


    


//           <div className="grid grid-cols-2 gap-4 py-2 border-b border-gray-200">
//             <div>
//               <p className="text-gray-600 font-medium"><strong>Passengers: </strong></p>

//             </div>
//             <div>
//               <p className="text-gray-800"> { formData.persons}</p>
//             </div>
//           </div>

//           <div className="py-2">
//             <p className="text-gray-800 text-xl font-extrabold"><strong>Total:</strong> <span className="text-purple-700 font-extrabold text-2xl">{totalPrice}</span></p>
//           </div>
//         </div>
//       </div>


      
//     </div>
//   );
// };

// export default VehicleBookingSteps;
