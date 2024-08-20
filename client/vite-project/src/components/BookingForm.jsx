import React, { useState } from 'react';
import { FaLocationArrow, FaCalendarAlt, FaClock, FaUser, FaTimes } from 'react-icons/fa';

function BookingForm() {
  const [showReturn, setShowReturn] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between bg-purple-50 p-6 lg:p-12 rounded-lg shadow-lg">
      {/* Left Side */}
      <div className="flex-1 lg:w-1/2 flex flex-col justify-center items-center lg:items-start lg:pr-8 lg:py-12">
        <div className="text-center lg:text-left max-w-md">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-purple-800 mb-6 leading-tight">
            Your Reliable Airport Transfers
          </h2>
          <p className="text-lg lg:text-xl text-gray-700 mb-4">
            Book your airport transfer with ease and comfort. Experience seamless travel with our dependable service.
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1 lg:w-1/2 bg-white p-6 rounded-lg shadow-md">
        <form>
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
                className="flex-1 p-2 rounded-r-lg focus:outline-none"
              />
            </div>
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
                className="flex-1 p-2 rounded-r-lg focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="pickup-date" className="block text-gray-700 text-sm font-semibold mb-2">
                Pickup Date
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <FaCalendarAlt className="text-gray-500 ml-3" />
                <input
                  type="date"
                  id="pickup-date"
                  className="flex-1 p-2 rounded-r-lg focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label htmlFor="pickup-time" className="block text-gray-700 text-sm font-semibold mb-2">
                Pickup Time
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <FaClock className="text-gray-500 ml-3" />
                <input
                  type="time"
                  id="pickup-time"
                  className="flex-1 p-2 rounded-r-lg focus:outline-none"
                />
              </div>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="return-date" className="block text-gray-700 text-sm font-semibold mb-2">
                    Return Date
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <FaCalendarAlt className="text-gray-500 ml-3" />
                    <input
                      type="date"
                      id="return-date"
                      className="flex-1 p-2 rounded-r-lg focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="return-time" className="block text-gray-700 text-sm font-semibold mb-2">
                    Return Time
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <FaClock className="text-gray-500 ml-3" />
                    <input
                      type="time"
                      id="return-time"
                      className="flex-1 p-2 rounded-r-lg focus:outline-none"
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
                className="flex-1 p-2 rounded-r-lg focus:outline-none"
              />
            </div>
          </div>

          <div className="mb-4">
            <button
              type="button"
              onClick={() => setShowReturn(!showReturn)}
              className="w-full bg-purple-500 text-white p-2 rounded-lg hover:bg-purple-600 focus:outline-none"
            >
              {showReturn ? 'Hide Return Trip' : 'Add Return Trip'}
            </button>
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-purple-700 text-white p-2 rounded-lg hover:bg-purple-800 focus:outline-none"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookingForm;
