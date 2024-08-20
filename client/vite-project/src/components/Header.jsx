import React, { useState } from 'react';
import { FaUser, FaSignInAlt, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';

function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const [showSignInForm, setShowSignInForm] = useState(false);
  const [showCreateAccountForm, setShowCreateAccountForm] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookNowButtonActive, setBookNowButtonActive] = useState(false);

  const handleSignIn = () => {
    setIsSignedIn(true);
    setShowSignInForm(false);
    setShowCreateAccountForm(false);
    setBookNowButtonActive(false);
    setShowMenu(false);
  };

  const handleSignOut = () => {
    setShowConfirmation(true);
  };

  const confirmSignOut = () => {
    setIsSignedIn(false);
    setShowSignInForm(false);
    setBookNowButtonActive(false);
    setShowConfirmation(false);
  };

  const cancelSignOut = () => {
    setShowConfirmation(false);
  };

  const toggleSignInForm = () => {
    setShowSignInForm(!showSignInForm);
    setShowCreateAccountForm(false);
    setBookNowButtonActive(!showSignInForm);
  };

  const toggleCreateAccountForm = () => {
    setShowCreateAccountForm(!showCreateAccountForm);
    setShowSignInForm(false);
    setBookNowButtonActive(!showCreateAccountForm);
  };

  const handleBookNowClick = () => {
    setShowMenu(false);
  };

  return (
    <>
      <header className="bg-purple-700 text-white p-4 flex items-center justify-between lg:justify-between shadow-md fixed top-0 w-full z-50">
        {/* Logo */}
        <div className="text-2xl font-bold flex-1 lg:flex-none">
          <span className="text-yellow-400">COMFORT</span>TRIP
        </div>

        {/* Right Side Buttons */}
        <div className="hidden lg:flex lg:items-center lg:gap-4">
          {isSignedIn ? (
            <>
              <button onClick={handleSignOut} className="flex items-center text-lg text-white">
                <FaSignOutAlt className="mr-2" /> Sign Out
              </button>
              <button
                onClick={handleBookNowClick}
                className={`px-4 py-2 rounded-lg font-semibold ${bookNowButtonActive ? 'bg-yellow-600 text-white' : 'bg-yellow-400 text-purple-700'}`}
              >
                Book Now
              </button>
            </>
          ) : (
            <>
              <button onClick={toggleSignInForm} className="flex items-center text-lg text-white">
                <FaSignInAlt className="mr-2" /> Sign In
              </button>
              <button onClick={toggleCreateAccountForm} className="flex items-center text-lg text-white">
                <FaUser className="mr-2" /> Create Account
              </button>
              <button
                onClick={handleBookNowClick}
                className={`px-4 py-2 rounded-lg font-semibold ${bookNowButtonActive ? 'bg-yellow-600 text-white' : 'bg-yellow-400 text-purple-700'}`}
              >
                Book Now
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="text-white text-2xl"
          >
            {showMenu ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        <nav className={`lg:hidden fixed inset-0 flex flex-col items-start bg-purple-700 bg-opacity-90 z-50 ${showMenu ? 'block' : 'hidden'} p-4`}>
          <div className="flex flex-col w-full gap-4 mt-4">
            {isSignedIn ? (
              <>
                <button onClick={handleSignOut} className="flex items-center text-lg text-white">
                  <FaSignOutAlt className="mr-2" /> Sign Out
                </button>
                <button
                  onClick={handleBookNowClick}
                  className={`px-4 py-2 rounded-lg font-semibold ${bookNowButtonActive ? 'bg-yellow-600 text-white' : 'bg-yellow-400 text-purple-700'}`}
                >
                  Book Now
                </button>
              </>
            ) : (
              <>
                <button onClick={toggleSignInForm} className="flex items-center text-lg text-white">
                  <FaSignInAlt className="mr-2" /> Sign In
                </button>
                <button onClick={toggleCreateAccountForm} className="flex items-center text-lg text-white">
                  <FaUser className="mr-2" /> Create Account
                </button>
                <button
                  onClick={handleBookNowClick}
                  className={`px-4 py-2 rounded-lg font-semibold ${bookNowButtonActive ? 'bg-yellow-600 text-white' : 'bg-yellow-400 text-purple-700'}`}
                >
                  Book Now
                </button>
              </>
            )}
          </div>
          <button
            type="button"
            onClick={() => setShowMenu(false)}
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          >
            <FaTimes />
          </button>
        </nav>
      </header>

      {/* Sign In Form */}
      {showSignInForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 p-4">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Sign In</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="username" className="block text-gray-700 mb-2">Username</label>
                <input
                  type="text"
                  id="username"
                  placeholder="Enter your username"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <button
                type="button"
                onClick={handleSignIn}
                className="w-full bg-purple-700 text-white py-2 rounded-lg hover:bg-purple-800"
              >
                Sign In
              </button>
            </form>
            <button
              type="button"
              onClick={() => setShowSignInForm(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            >
              <FaTimes />
            </button>
          </div>
        </div>
      )}

      {/* Create Account Form */}
      {showCreateAccountForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 p-4">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Create Account</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="newUsername" className="block text-gray-700 mb-2">Username</label>
                <input
                  type="text"
                  id="newUsername"
                  placeholder="Enter your username"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your password"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              <button
                type="button"
                onClick={handleSignIn}
                className="w-full bg-purple-700 text-white py-2 rounded-lg hover:bg-purple-800"
              >
                Create Account
              </button>
            </form>
            <button
              type="button"
              onClick={() => setShowCreateAccountForm(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            >
              <FaTimes />
            </button>
          </div>
        </div>
      )}

      {/* Sign Out Confirmation */}
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 p-4">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm relative">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Are you sure you want to sign out?</h2>
            <div className="flex justify-end">
              <button
                onClick={cancelSignOut}
                className="px-4 py-2 bg-gray-300 rounded-lg text-gray-700 mr-4"
              >
                Cancel
              </button>
              <button
                onClick={confirmSignOut}
                className="px-4 py-2 bg-red-600 text-white rounded-lg"
              >
                Sign Out
              </button>
            </div>
            <button
              type="button"
              onClick={() => setShowConfirmation(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            >
              <FaTimes />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
