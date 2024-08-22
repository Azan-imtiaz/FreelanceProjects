import React, { useState, useEffect, useRef } from 'react';
import { FaLocationArrow, FaCalendarAlt, FaClock, FaUser, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function BookingForm() {
  const [showReturn, setShowReturn] = useState(false);
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    pickupDate: '',
    pickupTime: '',
    returnDate: '',
    returnTime: '',
    passengers: '',
  });
  const [errors, setErrors] = useState({});

  const fromInputRef = useRef(null);
  const toInputRef = useRef(null);
  const navigate = useNavigate(); // Initialize useNavigate

  function handleSubmit(){

  }
  function handleChange(){
    
  }
  function handleClickSubmit(){
    navigate('/vehicle-selection');
  }

  return (
    <div className="hero-section flex flex-col lg:flex-row lg:items-center lg:justify-between bg-purple-50 md:p-6 lg:p-12 rounded-lg shadow-lg">
      {/* Overlay */}
      <div className="overlay"></div>

      {/* Content Wrapper */}
      <div className="content-wrapper flex flex-col lg:flex-row lg:items-center lg:justify-between w-full p-6 lg:p-12">
        {/* Left Side */}
        <div className="flex-1 lg:w-1/2 flex flex-col justify-center items-center lg:items-start lg:pr-8 lg:py-12 mb-6 lg:mb-0">
          <div className="text-center lg:text-left max-w-md">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-purple-800 mb-4 lg:mb-6 leading-tight">
              Your Reliable Airport Transfers
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-blue-900 mb-4">
              Book your airport transfer with ease and comfort. Experience seamless travel with our dependable service.
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex-1 lg:w-1/2 bg-white p-4 md:p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="from" className="block text-gray-700 text-sm font-semibold mb-2">
                From
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <FaLocationArrow className="text-gray-500 ml-3" />
                <input
                  type="text"
                  id="from"
                  placeholder="Enter pickup location"
                  ref={fromInputRef}
                  value={formData.from}
                  onChange={handleChange}
                  className="flex-1 p-2 rounded-r-lg focus:outline-none text-sm md:text-base"
                />
              </div>
              {errors.from && <p className="text-red-500 text-sm">{errors.from}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="to" className="block text-gray-700 text-sm font-semibold mb-2">
                To
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <FaLocationArrow className="text-gray-500 ml-3" />
                <input
                  type="text"
                  id="to"
                  placeholder="Enter destination"
                  ref={toInputRef}
                  value={formData.to}
                  onChange={handleChange}
                  className="flex-1 p-2 rounded-r-lg focus:outline-none text-sm md:text-base"
                />
              </div>
              {errors.to && <p className="text-red-500 text-sm">{errors.to}</p>}
            </div>

            <div className="flex flex-wrap md:flex-nowrap gap-4 mb-4">
              <div className="flex-1 min-w-[150px]">
                <label htmlFor="pickup-date" className="block text-gray-700 text-sm font-semibold mb-2">
                  Pickup Date
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <FaCalendarAlt className="text-gray-500 ml-3" />
                  <input
                    type="date"
                    id="pickup-date"
                    value={formData.pickupDate}
                    onChange={handleChange}
                    className="flex-1 p-2 rounded-r-lg focus:outline-none text-sm"
                  />
                </div>
                {errors.pickupDate && <p className="text-red-500 text-sm">{errors.pickupDate}</p>}
              </div>

              <div className="flex-1 min-w-[150px]">
                <label htmlFor="pickup-time" className="block text-gray-700 text-sm font-semibold mb-2">
                  Pickup Time
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <FaClock className="text-gray-500 ml-3" />
                  <input
                    type="time"
                    id="pickup-time"
                    value={formData.pickupTime}
                    onChange={handleChange}
                    className="flex-1 p-2 rounded-r-lg focus:outline-none text-sm"
                  />
                </div>
                {errors.pickupTime && <p className="text-red-500 text-sm">{errors.pickupTime}</p>}
              </div>
            </div>

            {showReturn && (
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-gray-700 text-lg font-semibold">Return</h3>
                  <button
                    type="button"
                    onClick={() => setShowReturn(false)}
                    className="text-red-500 hover:text-red-700 focus:outline-none"
                  >
                    <FaTimes />
                  </button>
                </div>
                <div className="flex flex-wrap gap-4">
                  <div className="flex-1 min-w-[150px]">
                    <label htmlFor="return-date" className="block text-gray-700 text-sm font-semibold mb-2">
                      Return Date
                    </label>
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <FaCalendarAlt className="text-gray-500 ml-3" />
                      <input
                        type="date"
                        id="return-date"
                        value={formData.returnDate}
                        onChange={handleChange}
                        className="flex-1 p-2 rounded-r-lg focus:outline-none text-sm md:text-base"
                      />
                    </div>
                  </div>

                  <div className="flex-1 min-w-[150px]">
                    <label htmlFor="return-time" className="block text-gray-700 text-sm font-semibold mb-2">
                      Return Time
                    </label>
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <FaClock className="text-gray-500 ml-3" />
                      <input
                        type="time"
                        id="return-time"
                        value={formData.returnTime}
                        onChange={handleChange}
                        className="flex-1 p-2 rounded-r-lg focus:outline-none text-sm md:text-base"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mb-4">
              <label htmlFor="passengers" className="block text-gray-700 text-sm font-semibold mb-2">
                Passengers
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <FaUser className="text-gray-500 ml-3" />
                <input
                  type="number"
                  id="passengers"
                  placeholder="Number of passengers"
                  value={formData.passengers}
                  onChange={handleChange}
                  className="flex-1 p-2 rounded-r-lg focus:outline-none text-sm md:text-base"
                />
              </div>
            </div>

            <div className="mb-4">
              <button
                type="submit"
                onClick={handleClickSubmit}
                className="w-full bg-purple-800 text-white py-2 px-4 rounded-lg hover:bg-purple-900 transition-colors text-sm md:text-base"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BookingForm;










// import React, { useState, useEffect, useRef } from 'react';
// import { FaLocationArrow, FaCalendarAlt, FaClock, FaUser, FaTimes } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate

// function BookingForm() {
//   const [showReturn, setShowReturn] = useState(false);
//   const [formData, setFormData] = useState({
//     from: '',
//     to: '',
//     pickupDate: '',
//     pickupTime: '',
//     returnDate: '',
//     returnTime: '',
//     passengers: '',
//   });
//   const [errors, setErrors] = useState({});

//   const fromInputRef = useRef(null);
//   const toInputRef = useRef(null);
//   const navigate = useNavigate(); // Initialize useNavigate





//   // useEffect(() => {
//   //   try {
//   //     if (window.google) {
//   //       const autocompleteFrom = new window.google.maps.places.Autocomplete(fromInputRef.current, {
//   //         types: ['geocode'],
//   //         fields: ['formatted_address'],
//   //       });
//   //       const autocompleteTo = new window.google.maps.places.Autocomplete(toInputRef.current, {
//   //         types: ['geocode'],
//   //         fields: ['formatted_address'],
//   //       });

//   //       autocompleteFrom.addListener('place_changed', () => {
//   //         const place = autocompleteFrom.getPlace();
//   //         console.log('Selected place from:', place.formatted_address);
//   //       });

//   //       autocompleteTo.addListener('place_changed', () => {
//   //         const place = autocompleteTo.getPlace();
//   //         console.log('Selected place to:', place.formatted_address);
//   //       });
//   //     } else {
//   //       console.error('Google Maps JavaScript API not loaded.');
//   //     }
//   //   } catch (error) {
//   //     console.error('Error initializing Google Maps Autocomplete:', error);
//   //   }
//   // }, []);

//   // const handleChange = (e) => {
//   //   setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
//   // };

//   // const handleSubmit = (e) => {
//   //   e.preventDefault();

//   //   const newErrors = {};

//   //   if (!formData.from) newErrors.from = 'Pickup location is required';
//   //   if (!formData.to) newErrors.to = 'Destination is required';
//   //   if (!formData.pickupDate) newErrors.pickupDate = 'Pickup date is required';
//   //   if (!formData.pickupTime) newErrors.pickupTime = 'Pickup time is required';

//   //   setErrors(newErrors);

//   //   if (Object.keys(newErrors).length === 0) {
//   //     console.log('Form data:', formData);
//   //     // Redirect to another page after successful validation
//   //     navigate('/search-results', { state: { formData } }); // Pass formData to the next page
//   //   }
//   // };






//   function handleSubmit(){

//   }
//   function handleChange(){
    
//   }
//   function handleClickSubmit(){
//     navigate('/vehicle-selection');
//   }
//   return (
//     <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between bg-purple-50 md:p-6 lg:p-12 rounded-lg shadow-lg">
//       {/* Left Side */}
//       <div className="flex-1 lg:w-1/2 flex flex-col justify-center items-center lg:items-start lg:pr-8 lg:py-12 mb-6 lg:mb-0">
//         <div className="text-center lg:text-left max-w-md">
//           <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-purple-800 mb-4 lg:mb-6 leading-tight">
//             Your Reliable Airport Transfers
//           </h2>
//           <p className="text-base md:text-lg lg:text-xl text-gray-700 mb-4">
//             Book your airport transfer with ease and comfort. Experience seamless travel with our dependable service.
//           </p>
//         </div>
//       </div>

//       {/* Right Side */}
//       <div className="flex-1 lg:w-1/2 bg-white p-4 md:p-6 rounded-lg shadow-md">
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label htmlFor="from" className="block text-gray-700 text-sm font-semibold mb-2">
//               From
//             </label>
//             <div className="flex items-center border border-gray-300 rounded-lg">
//               <FaLocationArrow className="text-gray-500 ml-3" />
//               <input
//                 type="text"
//                 id="from"
//                 placeholder="Enter pickup location"
//                 ref={fromInputRef}
//                 value={formData.from}
//                 onChange={handleChange}
//                 className="flex-1 p-2 rounded-r-lg focus:outline-none text-sm md:text-base"
//               />
//             </div>
//             {errors.from && <p className="text-red-500 text-sm">{errors.from}</p>}
//           </div>

//           <div className="mb-4">
//             <label htmlFor="to" className="block text-gray-700 text-sm font-semibold mb-2">
//               To
//             </label>
//             <div className="flex items-center border border-gray-300 rounded-lg">
//               <FaLocationArrow className="text-gray-500 ml-3" />
//               <input
//                 type="text"
//                 id="to"
//                 placeholder="Enter destination"
//                 ref={toInputRef}
//                 value={formData.to}
//                 onChange={handleChange}
//                 className="flex-1 p-2 rounded-r-lg focus:outline-none text-sm md:text-base"
//               />
//             </div>
//             {errors.to && <p className="text-red-500 text-sm">{errors.to}</p>}
//           </div>

//           <div className="flex flex-wrap md:flex-nowrap gap-4 mb-4">
//             <div className="flex-1 min-w-[150px]">
//               <label htmlFor="pickup-date" className="block text-gray-700 text-sm font-semibold mb-2">
//                 Pickup Date
//               </label>
//               <div className="flex items-center border border-gray-300 rounded-lg">
//                 <FaCalendarAlt className="text-gray-500 ml-3" />
//                 <input
//                   type="date"
//                   id="pickup-date"
//                   value={formData.pickupDate}
//                   onChange={handleChange}
//                   className="flex-1 p-2 rounded-r-lg focus:outline-none text-sm"
//                 />
//               </div>
//               {errors.pickupDate && <p className="text-red-500 text-sm">{errors.pickupDate}</p>}
//             </div>

//             <div className="flex-1 min-w-[150px]">
//               <label htmlFor="pickup-time" className="block text-gray-700 text-sm font-semibold mb-2">
//                 Pickup Time
//               </label>
//               <div className="flex items-center border border-gray-300 rounded-lg">
//                 <FaClock className="text-gray-500 ml-3" />
//                 <input
//                   type="time"
//                   id="pickup-time"
//                   value={formData.pickupTime}
//                   onChange={handleChange}
//                   className="flex-1 p-2 rounded-r-lg focus:outline-none text-sm"
//                 />
//               </div>
//               {errors.pickupTime && <p className="text-red-500 text-sm">{errors.pickupTime}</p>}
//             </div>
//           </div>

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
//                 <div className="flex-1 min-w-[150px]">
//                   <label htmlFor="return-date" className="block text-gray-700 text-sm font-semibold mb-2">
//                     Return Date
//                   </label>
//                   <div className="flex items-center border border-gray-300 rounded-lg">
//                     <FaCalendarAlt className="text-gray-500 ml-3" />
//                     <input
//                       type="date"
//                       id="return-date"
//                       value={formData.returnDate}
//                       onChange={handleChange}
//                       className="flex-1 p-2 rounded-r-lg focus:outline-none text-sm md:text-base"
//                     />
//                   </div>
//                 </div>

//                 <div className="flex-1 min-w-[150px]">
//                   <label htmlFor="return-time" className="block text-gray-700 text-sm font-semibold mb-2">
//                     Return Time
//                   </label>
//                   <div className="flex items-center border border-gray-300 rounded-lg">
//                     <FaClock className="text-gray-500 ml-3" />
//                     <input
//                       type="time"
//                       id="return-time"
//                       value={formData.returnTime}
//                       onChange={handleChange}
//                       className="flex-1 p-2 rounded-r-lg focus:outline-none text-sm md:text-base"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           <div className="mb-4">
//             <label htmlFor="passengers" className="block text-gray-700 text-sm font-semibold mb-2">
//               Passengers
//             </label>
//             <div className="flex items-center border border-gray-300 rounded-lg">
//               <FaUser className="text-gray-500 ml-3" />
//               <input
//                 type="number"
//                 id="passengers"
//                 placeholder="Number of passengers"
//                 value={formData.passengers}
//                 onChange={handleChange}
//                 className="flex-1 p-2 rounded-r-lg focus:outline-none text-sm md:text-base"
//               />
//             </div>
//           </div>

//           <div className="mb-4">
//             <button
//               type="button"
//               onClick={() => setShowReturn(true)}
//               className="text-purple-800 font-semibold hover:underline focus:outline-none"
//             >
//               Add Return Trip
//             </button>
//           </div>

//           <div className="mt-6" >
//             <button
//                onClick={handleClickSubmit}
//               type="submit"
//               className="w-full bg-purple-800 hover:bg-purple-900 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
//             >
//               Search
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default BookingForm;





















// import React, { useState, useEffect, useRef } from 'react';
// import { FaLocationArrow, FaCalendarAlt, FaClock, FaUser, FaTimes } from 'react-icons/fa';

// function BookingForm() {
//   const [showReturn, setShowReturn] = useState(false);
//   const [formData, setFormData] = useState({
//     from: '',
//     to: '',
//     pickupDate: '',
//     pickupTime: '',
//     returnDate: '',
//     returnTime: '',
//     passengers: '',
//   });
//   const [errors, setErrors] = useState({});

//   const fromInputRef = useRef(null);
//   const toInputRef = useRef(null);

//   useEffect(() => {
//     try {
//       if (window.google) {
//         const autocompleteFrom = new window.google.maps.places.Autocomplete(fromInputRef.current, {
//           types: ['geocode'],
//           fields: ['formatted_address'],
//         });
//         const autocompleteTo = new window.google.maps.places.Autocomplete(toInputRef.current, {
//           types: ['geocode'],
//           fields: ['formatted_address'],
//         });

//         autocompleteFrom.addListener('place_changed', () => {
//           const place = autocompleteFrom.getPlace();
//           console.log('Selected place from:', place.formatted_address);
//         });

//         autocompleteTo.addListener('place_changed', () => {
//           const place = autocompleteTo.getPlace();
//           console.log('Selected place to:', place.formatted_address);
//         });
//       } else {
//         console.error('Google Maps JavaScript API not loaded.');
//       }
//     } catch (error) {
//       console.error('Error initializing Google Maps Autocomplete:', error);
//     }
//   }, []);

//   const handleChange = (e) => {
//     setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const newErrors = {};

//     if (!formData.from) newErrors.from = 'Pickup location is required';
//     if (!formData.to) newErrors.to = 'Destination is required';
//     if (!formData.pickupDate) newErrors.pickupDate = 'Pickup date is required';
//     if (!formData.pickupTime) newErrors.pickupTime = 'Pickup time is required';

//     setErrors(newErrors);

//     if (Object.keys(newErrors).length === 0) {
//       console.log('Form data:', formData);
//     }
//   };

//   return (
//     <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between bg-purple-50  md:p-6 lg:p-12 rounded-lg shadow-lg">
//       {/* Left Side */}
//       <div className="flex-1 lg:w-1/2 flex flex-col justify-center items-center lg:items-start lg:pr-8 lg:py-12 mb-6 lg:mb-0">
//         <div className="text-center lg:text-left max-w-md">
//           <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-purple-800 mb-4 lg:mb-6 leading-tight">
//             Your Reliable Airport Transfers
//           </h2>
//           <p className="text-base md:text-lg lg:text-xl text-gray-700 mb-4">
//             Book your airport transfer with ease and comfort. Experience seamless travel with our dependable service.
//           </p>
//         </div>
//       </div>

//       {/* Right Side */}
//       <div className="flex-1 lg:w-1/2 bg-white p-4 md:p-6 rounded-lg shadow-md">
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label htmlFor="from" className="block text-gray-700 text-sm font-semibold mb-2">
//               From
//             </label>
//             <div className="flex items-center border border-gray-300 rounded-lg">
//               <FaLocationArrow className="text-gray-500 ml-3" />
//               <input
//                 type="text"
//                 id="from"
//                 placeholder="Enter pickup location"
//                 ref={fromInputRef}
//                 value={formData.from}
//                 onChange={handleChange}
//                 className="flex-1 p-2 rounded-r-lg focus:outline-none text-sm md:text-base"
//               />
//             </div>
//             {errors.from && <p className="text-red-500 text-sm">{errors.from}</p>}
//           </div>

//           <div className="mb-4">
//             <label htmlFor="to" className="block text-gray-700 text-sm font-semibold mb-2">
//               To
//             </label>
//             <div className="flex items-center border border-gray-300 rounded-lg">
//               <FaLocationArrow className="text-gray-500 ml-3" />
//               <input
//                 type="text"
//                 id="to"
//                 placeholder="Enter destination"
//                 ref={toInputRef}
//                 value={formData.to}
//                 onChange={handleChange}
//                 className="flex-1 p-2 rounded-r-lg focus:outline-none text-sm md:text-base"
//               />
//             </div>
//             {errors.to && <p className="text-red-500 text-sm">{errors.to}</p>}
//           </div>
//  <div className="flex flex-wrap md:flex-nowrap gap-4 mb-4">
//     <div className="flex-1 min-w-[150px]">
//         <label htmlFor="pickup-date" className="block text-gray-700 text-sm font-semibold mb-2">
//             Pickup Date
//         </label>
//         <div className="flex items-center border border-gray-300 rounded-lg">
//             <FaCalendarAlt className="text-gray-500 ml-3" />
//             <input
//                 type="date"
//                 id="pickup-date"
//                 value={formData.pickupDate}
//                 onChange={handleChange}
//                 className="flex-1 p-2 rounded-r-lg focus:outline-none text-sm"
//             />
//         </div>
//         {errors.pickupDate && (
//             <p className="text-red-500 text-sm">{errors.pickupDate}</p>
//         )}
//     </div>


//   <div className="flex-1 min-w-[150px]">
//         <label htmlFor="pickup-time" className="block text-gray-700 text-sm font-semibold mb-2">
//             Pickup Time
//         </label>
//         <div className="flex items-center border border-gray-300 rounded-lg">
//             <FaClock className="text-gray-500 ml-3" />
//             <input
//                 type="time"
//                 id="pickup-time"
//                 value={formData.pickupTime}
//                 onChange={handleChange}
//                 className="flex-1 p-2 rounded-r-lg focus:outline-none text-sm"
//             />
//         </div>
//         {errors.pickupTime && (
//             <p className="text-red-500 text-sm">{errors.pickupTime}</p>
//         )}
//     </div>
// </div>


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
//                 <div className="flex-1 min-w-[150px]">
//                   <label htmlFor="return-date" className="block text-gray-700 text-sm font-semibold mb-2">
//                     Return Date
//                   </label>
//                   <div className="flex items-center border border-gray-300 rounded-lg">
//                     <FaCalendarAlt className="text-gray-500 ml-3" />
//                     <input
//                       type="date"
//                       id="return-date"
//                       value={formData.returnDate}
//                       onChange={handleChange}
//                       className="flex-1 p-2 rounded-r-lg focus:outline-none text-sm md:text-base"
//                     />
//                   </div>
//                 </div>

//                 <div className="flex-1 min-w-[150px]">
//                   <label htmlFor="return-time" className="block text-gray-700 text-sm font-semibold mb-2">
//                     Return Time
//                   </label>
//                   <div className="flex items-center border border-gray-300 rounded-lg">
//                     <FaClock className="text-gray-500 ml-3" />
//                     <input
//                       type="time"
//                       id="return-time"
//                       value={formData.returnTime}
//                       onChange={handleChange}
//                       className="flex-1 p-2 rounded-r-lg focus:outline-none text-sm md:text-base"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           <div className="mb-4">
//             <label htmlFor="passengers" className="block text-gray-700 text-sm font-semibold mb-2">
//               Passengers
//             </label>
//             <div className="flex items-center border border-gray-300 rounded-lg">
//               <FaUser className="text-gray-500 ml-3" />
//               <input
//                 type="number"
//                 id="passengers"
//                 placeholder="Number of passengers"
//                 value={formData.passengers}
//                 onChange={handleChange}
//                 className="flex-1 p-2 rounded-r-lg focus:outline-none text-sm md:text-base"
//               />
//             </div>
//           </div>

//           {!showReturn && (
//             <div className="mb-4">
//               <button
//                 type="button"
//                 onClick={() => setShowReturn(true)}
//                 className="text-purple-500 hover:text-purple-700 focus:outline-none"
//               >
//                 + Add Return
//               </button>
//             </div>
//           )}

//           <div className="text-center">
//             <button
//               type="submit"
//               className="w-full lg:w-fullmd:w-auto bg-purple-700 hover:bg-purple-800 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none"
//             >
//               Search
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default BookingForm;






