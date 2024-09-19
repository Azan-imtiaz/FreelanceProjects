import Swal from 'sweetalert2';
import React, { useState } from 'react';
import { Autocomplete, DistanceMatrixService } from '@react-google-maps/api';
import { FaLocationArrow, FaCalendarAlt, FaClock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Spinner from 'react-bootstrap/Spinner';

const libraries = ['places'];

const BookingForm = () => {
  const [selectedPickupDate, setSelectedPickupDate] = useState(null);
  const [selectedReturnDate, setSelectedReturnDate] = useState(null);
  const [showReturn, setShowReturn] = useState(false);
  const [isSpin, setSpin] = useState(false);

  const [formData, setFormData] = useState({
    from: '',
    to: '',
    pickupDate: '',
    pickupTime: '',
    returnDate: '',
    returnTime: '',
    distance: '',
    estimatedTime: ''
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
    if (showReturn && (!formData.returnDate || !formData.returnTime)) {
      if (!formData.returnDate) newErrors.returnDate = 'Return date is required';
      if (!formData.returnTime) newErrors.returnTime = 'Return time is required';
    }
    return newErrors;
  };

  const isWithinEngland = (place) => {
    const validCountries = ['England', 'United Kingdom','UK'];
    return validCountries.some(country => place.address_components.some(component => component.long_name.includes(country)));
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
            resolve({ distanceTextInMiles, distanceValueInMiles, durationText });
          } else {
            reject('Error calculating distance');
          }
        }
      );
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

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

    try {
      setSpin(true);
      const { distanceTextInMiles, distanceValueInMiles, durationText } = await calculateDistance();
      const updatedFormData = {
        ...formData,
        distance: distanceValueInMiles.toFixed(2),
        estimatedTime: durationText,
      };

      setSpin(false);
      navigate('/vehicle-selection', { state: { formData: updatedFormData } });
    } catch (error) {
      setSpin(false);
      console.error('Error calculating distance:', error);
      setErrors((prevErrors) => ({ ...prevErrors, distance: 'Could not calculate distance', estimatedTime: "Could not calculate" }));
    }
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
    <div className="hero-section flex flex-col lg:flex-row lg:items-center lg:justify-between bg-purple-50 md:p-6 lg:p-12 rounded-lg shadow-lg">
      <div className="overlay"></div>
      <div className="content-wrapper flex-1 lg:w-1/2 flex flex-col justify-center items-center lg:items-start lg:pr-8 lg:py-12 mb-6 lg:mb-0">
        <div className="text-center lg:text-left max-w-md">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-purple-800 mb-4 lg:mb-6 leading-tight">
            Your Reliable Airport Transfers
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-gray-700 mb-4">
            Book your airport transfer with ease and comfort. Experience seamless travel with our dependable service.
          </p>
        </div>
      </div>

      <div className="zindexing flex-1 lg:w-1/2 bg-white p-4 sm:pt-0  md:p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          {/* From Location */}
          <div className="mb-4">
            <label htmlFor="from" className="block text-gray-700 text-sm font-semibold mb-2">
              From
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <FaLocationArrow className="text-gray-500 ml-3" />
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
                  className="flex-1 p-2 rounded-r-lg focus:outline-none text-sm md:text-base"
                />
              </Autocomplete>
            </div>
            {errors.from && <p className="text-red-500 text-sm">{errors.from}</p>}
          </div>

          {/* To Destination */}
          <div className="mb-4">
            <label htmlFor="to" className="block text-gray-700 text-sm font-semibold mb-2">
              To
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <FaLocationArrow className="text-gray-500 ml-3" />
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
                  className="flex-1 p-2 rounded-r-lg focus:outline-none text-sm md:text-base"
                />
              </Autocomplete>
            </div>
            {errors.to && <p className="text-red-500 text-sm">{errors.to}</p>}
          </div>

          {/* Pickup Date and Time */}
          <div className="flex flex-wrap md:flex-nowrap gap-4 mb-4">
            <div className="flex-1 min-w-[170px]">
              <label htmlFor="pickup-date" className="block text-gray-700 text-sm font-semibold mb-2">
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
              <label htmlFor="pickup-time" className="block text-gray-700 text-sm font-semibold mb-2">
                Pickup Time
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <FaClock className="text-gray-500 ml-3" />
                <input
                  type="time"
                  id="pickup-time"
                  value={formData.pickupTime}
                  onChange={(e) => setFormData({ ...formData, pickupTime: e.target.value })}
                  className="flex-1 p-2 rounded-r-lg focus:outline-none text-sm md:text-base"
                />
              </div>
              {errors.pickupTime && <p className="text-red-500 text-sm">{errors.pickupTime}</p>}
            </div>
          </div>

          {/* Return Options */}
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={showReturn}
                onChange={() => setShowReturn(!showReturn)}
                className="form-checkbox"
              />
              <span className="ml-2 text-gray-700">Add Return Trip</span>
            </label>
          </div>

          {showReturn && (
            <div className="flex flex-wrap md:flex-nowrap gap-4 mb-4">
              <div className="flex-1 min-w-[170px]">
                <label htmlFor="return-date" className="block text-gray-700 text-sm font-semibold mb-2">
                  Return Date
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <FaCalendarAlt className="text-gray-500 ml-3" />
                  <DatePicker
                    selected={selectedReturnDate}
                    onChange={(date) => {
                      setSelectedReturnDate(date);
                      setFormData({ ...formData, returnDate: date ? date.toISOString().split('T')[0] : '' });
                    }}
                    className="flex-1 p-2 rounded-r-lg focus:outline-none text-sm md:text-base"
                    placeholderText="Select date"
                  />
                </div>
                {errors.returnDate && <p className="text-red-500 text-sm">{errors.returnDate}</p>}
              </div>

              <div className="flex-1 min-w-[170px]">
                <label htmlFor="return-time" className="block text-gray-700 text-sm font-semibold mb-2">
                  Return Time
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <FaClock className="text-gray-500 ml-3" />
                  <input
                    type="time"
                    id="return-time"
                    value={formData.returnTime}
                    onChange={(e) => setFormData({ ...formData, returnTime: e.target.value })}
                    className="flex-1 p-2 rounded-r-lg focus:outline-none text-sm md:text-base"
                  />
                </div>
                {errors.returnTime && <p className="text-red-500 text-sm">{errors.returnTime}</p>}
              </div>
            </div>
          )}

          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={isSpin}
            >
              {isSpin ? <Spinner animation="border" size="sm" /> : 'Search'}
            </button>
          </div>
        </form>

        {/* Distance and Estimated Time Output */}
        {formData.distance && formData.estimatedTime && (
          <div className="mt-4 text-center">
            <p className="text-gray-700">Distance: {formData.distance} miles</p>
            <p className="text-gray-700">Estimated Time: {formData.estimatedTime}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingForm;

// import Swal from 'sweetalert2';
// import React, { useState } from 'react';
// import { Autocomplete, DistanceMatrixService } from '@react-google-maps/api';
// import { FaLocationArrow, FaCalendarAlt, FaClock, FaTimes } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import Spinner from 'react-bootstrap/Spinner';


// const libraries = ['places'];

// const BookingForm = () => {
//   const [selectedPickupDate, setSelectedPickupDate] = useState(null);
//   const [selectedReturnDate, setSelectedReturnDate] = useState(null);
//   const [showReturn, setShowReturn] = useState(false);
//   const [isSpin,setSpin]=useState(false);



//   const [formData, setFormData] = useState({
//     from: '',
//     to: '',
//     pickupDate: '',
//     pickupTime: '',
//     returnDate: '',
//     returnTime: '',
//     distance: '',estimatedTime:''
//   });
//   const [errors, setErrors] = useState({});
//   const [autocompleteFrom, setAutocompleteFrom] = useState(null);
//   const [autocompleteTo, setAutocompleteTo] = useState(null);
//   const [distanceMatrixService, setDistanceMatrixService] = useState(null);
//   const navigate = useNavigate();

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.from) newErrors.from = 'Pickup location is required';
//     if (!formData.to) newErrors.to = 'Destination is required';
//     if (!formData.pickupDate) newErrors.pickupDate = 'Pickup date is required';
//     if (!formData.pickupTime) newErrors.pickupTime = 'Pickup time is required';
//     if (showReturn && (!formData.returnDate || !formData.returnTime)) {
//       if (!formData.returnDate) newErrors.returnDate = 'Return date is required';
//       if (!formData.returnTime) newErrors.returnTime = 'Return time is required';
//     }
//     return newErrors;
//   };

//   const calculateDistance = () => {
//     return new Promise((resolve, reject) => {
//         if (!formData.from || !formData.to) {
//             reject('Origin and destination are required');
//             return;
//         }

//         const service = new window.google.maps.DistanceMatrixService();
//         service.getDistanceMatrix(
//             {
//                 origins: [formData.from],
//                 destinations: [formData.to],
//                 travelMode: 'DRIVING',
//             },
//             (response, status) => {
//                 if (status === 'OK') {
//                     const element = response.rows[0].elements[0];
//                     const distanceValueInMeters = element.distance.value; // distance in meters
//                     const distanceValueInMiles = distanceValueInMeters * 0.000621371; // convert meters to miles
//                     const distanceTextInMiles = distanceValueInMiles.toFixed(2) + ' miles'; // formatted distance
//                     const distanceTextInMeters = element.distance.text; // original distance text (in km or meters)
//                     const durationText = element.duration.text; // estimated travel time
//                     resolve({ distanceTextInMiles, distanceTextInMeters, distanceValueInMiles, durationText });
//                 } else {
//                     reject('Error calculating distance');
//                 }
//             }
//         );
//     });
// };


// const handleSubmit = async (event) => {
//   event.preventDefault();
  

//   const validationErrors = validateForm();
//   if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//   }

//   try {
//     setSpin(true);
//       const { distanceTextInMiles, distanceTextInMeters, distanceValueInMiles, durationText  } = await calculateDistance();
//       console.log(distanceTextInMiles, distanceTextInMeters, distanceValueInMiles, durationText );

//       // Update formData with the distance and estimated time
//       const updatedFormData = {
//           ...formData,
//           distance:  distanceValueInMiles.toFixed(2),
//           estimatedTime: durationText, // Add this line
//       };

//       console.log(updatedFormData); // Log the updated formData

//       // Navigate to the next page with updated formData
//       setSpin(false);
//       navigate('/vehicle-selection', { state: { formData: updatedFormData } });
//   } catch (error) {
//     setSpin(false);
//       console.error('Error calculating distance:', error);
//       setErrors((prevErrors) => ({ ...prevErrors, distance: 'Could not calculate distance',estimatedTime:"Could not calculate" }));
//   }
// };


//   const handleChange = (event) => {
//     const { id, value } = event.target;
//     setFormData({ ...formData, [id]: value });
//   };

//   const handleSelectFrom = () => {
//     if (autocompleteFrom) {
//       const place = autocompleteFrom.getPlace();
//       setFormData({ ...formData, from: place.formatted_address });
//     }
//   };

//   const handleSelectTo = () => {
//     if (autocompleteTo) {
//       const place = autocompleteTo.getPlace();
//       setFormData({ ...formData, to: place.formatted_address });
//     }
//   };

//   return (
//     <div className="hero-section flex flex-col lg:flex-row lg:items-center lg:justify-between bg-purple-50 md:p-6 lg:p-12 rounded-lg shadow-lg">
//       <div className="overlay"></div>
//       <div className="content-wrapper flex-1 lg:w-1/2 flex flex-col justify-center items-center lg:items-start lg:pr-8 lg:py-12 mb-6 lg:mb-0">
//         <div className="text-center lg:text-left max-w-md">
//           <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-purple-800 mb-4 lg:mb-6 leading-tight">
//             Your Reliable Airport Transfers
//           </h2>
//           <p className="text-base md:text-lg lg:text-xl text-gray-700 mb-4">
//             Book your airport transfer with ease and comfort. Experience seamless travel with our dependable service.
//           </p>
//         </div>
//       </div>

//       <div className="zindexing flex-1 lg:w-1/2 bg-white p-4 sm:pt-0  md:p-6 rounded-lg shadow-md">
//         <form onSubmit={handleSubmit}>
//           {/* From Location */}
//           <div className="mb-4">
//             <label htmlFor="from" className="block text-gray-700 text-sm font-semibold mb-2">
//               From
//             </label>
//             <div className="flex items-center border border-gray-300 rounded-lg">
//               <FaLocationArrow className="text-gray-500 ml-3" />
//               <Autocomplete
//                 onLoad={(autocomplete) => setAutocompleteFrom(autocomplete)}
//                 onPlaceChanged={handleSelectFrom}
//               >
//                 <input
//                   type="text"
//                   id="from"
//                   placeholder="Enter pickup location"
//                   value={formData.from}
//                   onChange={(e) => setFormData({ ...formData, from: e.target.value })}
//                   className="flex-1 p-2 rounded-r-lg focus:outline-none text-sm md:text-base"
//                 />
//               </Autocomplete>
//             </div>
//             {errors.from && <p className="text-red-500 text-sm">{errors.from}</p>}
//           </div>

//           {/* To Destination */}
//           <div className="mb-4">
//             <label htmlFor="to" className="block text-gray-700 text-sm font-semibold mb-2">
//               To
//             </label>
//             <div className="flex items-center border border-gray-300 rounded-lg">
//               <FaLocationArrow className="text-gray-500 ml-3" />
//               <Autocomplete
//                 onLoad={(autocomplete) => setAutocompleteTo(autocomplete)}
//                 onPlaceChanged={handleSelectTo}
//               >
//                 <input
//                   type="text"
//                   id="to"
//                   placeholder="Enter destination"
//                   value={formData.to}
//                   onChange={(e) => setFormData({ ...formData, to: e.target.value })}
//                   className="flex-1 p-2 rounded-r-lg focus:outline-none text-sm md:text-base"
//                 />
//               </Autocomplete>
//             </div>
//             {errors.to && <p className="text-red-500 text-sm">{errors.to}</p>}
//           </div>

//           {/* Pickup Date and Time */}
//           <div className="flex flex-wrap md:flex-nowrap gap-4 mb-4">
//             <div className="flex-1 min-w-[170px]">
//               <label htmlFor="pickup-date" className="block text-gray-700 text-sm font-semibold mb-2">
//                 Pickup Date
//               </label>
//               <div className="flex items-center border border-gray-300 rounded-lg">
//                 <FaCalendarAlt className="text-gray-500 ml-3" />
//                 <DatePicker
//                   selected={selectedPickupDate}
//                   onChange={(date) => {
//                     setSelectedPickupDate(date);
//                     setFormData({ ...formData, pickupDate: date ? date.toISOString().split('T')[0] : '' });
//                   }}
//                   className="flex-1 p-2 rounded-r-lg focus:outline-none text-sm"
//                   dateFormat="yyyy/MM/dd"
//                   placeholderText="Select date"
//                 />
//               </div>
//               {errors.pickupDate && <p className="text-red-500 text-sm">{errors.pickupDate}</p>}
//             </div>

//             <div className="flex-1 min-w-[170px]">
//               <label htmlFor="pickupTime" className="block text-gray-700 text-sm font-semibold mb-2">
//                 Pickup Time
//               </label>
//               <div className="flex items-center border border-gray-300 rounded-lg">
//                 <FaClock className="text-gray-500 ml-3" />
//                 <input
//                   type="time"
//                   id="pickupTime"
//                   value={formData.pickupTime}
//                   onChange={handleChange}
//                   className="flex-1 p-2 rounded-r-lg focus:outline-none text-sm"
//                 />
//               </div>
//               {errors.pickupTime && <p className="text-red-500 text-sm">{errors.pickupTime}</p>}
//             </div>
//           </div>

//           {/* Return Trip */}
//           {showReturn && (
//             <div className="mb-4">
//               <div className="flex justify-between items-center mb-2">
//                 <h3 className="text-gray-700 text-lg font-semibold">Return</h3>
//                 <button
//                   type="button"
//                   onClick={() => setShowReturn(false)}
//                   className="text-red-500 hover:text-red-700 focus:outline-none"
//                 >
//                   <FaTimes />
//                 </button>
//               </div>
//               <div className="flex flex-wrap gap-4">
//                 <div className="flex-1 min-w-[170px]">
//                   <label htmlFor="return-date" className="block text-gray-700 text-sm font-semibold mb-2">
//                     Return Date
//                   </label>
//                   <div className="flex items-center border border-gray-300 rounded-lg">
//                     <FaCalendarAlt className="text-gray-500 ml-3" />
//                     <DatePicker
//                       selected={selectedReturnDate}
//                       onChange={(date) => {
//                         setSelectedReturnDate(date);
//                         setFormData({ ...formData, returnDate: date ? date.toISOString().split('T')[0] : '' });
//                       }}
//                       className="flex-1 p-2 rounded-r-lg focus:outline-none text-sm"
//                       dateFormat="yyyy/MM/dd"
//                       placeholderText="Select date"
//                     />
//                   </div>
//                   {errors.returnDate && <p className="text-red-500 text-sm">{errors.returnDate}</p>}
//                 </div>

//                 <div className="flex-1 min-w-[170px]">
//                   <label htmlFor="returnTime" className="block text-gray-700 text-sm font-semibold mb-2">
//                     Return Time
//                   </label>
//                   <div className="flex items-center border border-gray-300 rounded-lg">
//                     <FaClock className="text-gray-500 ml-3 " />
//                     <input
//                       type="time"
//                       id="returnTime"
//                       value={formData.returnTime}
//                       onChange={handleChange}
//                       className="flex-1 p-2 rounded-r-lg focus:outline-none text-sm"
//                     />
//                   </div>
//                   {errors.returnTime && <p className="text-red-500 text-sm">{errors.returnTime}</p>}
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Add Return Button */}
//           {!showReturn && (
//             <div className="flex items-center mb-4">
//               <input
//                 type="checkbox"
//                 id="show-return"
//                 checked={showReturn}
//                 onChange={() => setShowReturn(!showReturn)}
//                 className="mr-2"
//               />
//               <label htmlFor="show-return" className="text-gray-700 text-sm font-semibold">
//                 Add Return
//               </label>
//             </div>
//           )}

//           {/* Error Message for Distance Calculation */}
//           {errors.distance && <p className="text-red-500 text-sm mb-4">{errors.distance}</p>}


//           {
//   isSpin && (
//     <div>
 
//       <Spinner animation="border" variant="primary" />
 
//     </div>
   
//   )
// }

      
//           {/* Submit Button */}
//           <div className="flex justify-center lg:justify-end">
//             <button
//               type="submit"
//               className="bg-purple-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
//             >
//               Search
//             </button>
//           </div>
//         </form>
//       </div>



//     </div>
//   );
// };

// export default BookingForm;