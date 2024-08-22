















import React, { useState } from 'react';
import { FaUser, FaSignInAlt, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import logo from './logo.png'; // Make sure to update the path to your actual logo image

function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const [showSignInForm, setShowSignInForm] = useState(false);
  const [showCreateAccountForm, setShowCreateAccountForm] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookNowButtonActive, setBookNowButtonActive] = useState(false);

  const [signInData, setSignInData] = useState({ username: '', password: '' });
  const [createAccountData, setCreateAccountData] = useState({ newUsername: '', email: '', newpassword: '' });

  const [signInErrors, setSignInErrors] = useState({ username: false, password: false });
  const [createAccountErrors, setCreateAccountErrors] = useState({ newUsername: false, email: false, newpassword: false });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === 'username' || id === 'password') {
      setSignInData({ ...signInData, [id]: value });
    } else {
      setCreateAccountData({ ...createAccountData, [id]: value });
    }
  };

  const validateSignIn = () => {
    const errors = { username: !signInData.username, password: !signInData.password };
    setSignInErrors(errors);
    return !errors.username && !errors.password;
  };

  const validateCreateAccount = () => {
    const errors = {
      newUsername: !createAccountData.newUsername,
      email: !createAccountData.email,
      newpassword: !createAccountData.newpassword || createAccountData.newpassword.length < 8
    };
    setCreateAccountErrors(errors);
    return !errors.newUsername && !errors.email && !errors.newpassword;
  };

  const handleSignIn = () => {
    if (validateSignIn()) {
      console.log('Sign-In Data:', signInData);
      setIsSignedIn(true);
      setShowSignInForm(false);
      setShowCreateAccountForm(false);
      setBookNowButtonActive(false);
      setShowMenu(false);
    }
  };

  const handleCreateAccount = () => {
    if (validateCreateAccount()) {
      console.log('Create Account Data:', createAccountData);
      setIsSignedIn(true);
      setShowSignInForm(false);
      setShowCreateAccountForm(false);
      setBookNowButtonActive(false);
      setShowMenu(false);
    }
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

  const handleCloseForm = () => {
    setShowSignInForm(false);
    setShowCreateAccountForm(false);
  };

  const handleBookNowClick = () => {
    setShowMenu(false);
  };

  return (
    <>
      <header className="bg-purple-700 text-white p-2 flex items-center justify-between lg:justify-between shadow-md fixed top-0 w-full z-50 mb-10">
        {/* Logo */}
        <div className="flex-1 lg:flex-none">
          <img src={logo} alt="Logo" className="h-16" /> {/* Adjust the height as needed */}
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
            <button
              type="button"
              onClick={handleCloseForm}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            >
              <FaTimes />
            </button>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Sign In</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="username" className="block text-gray-700 mb-2">Username</label>
                <input
                  type="text"
                  id="username"
                  placeholder="Enter your username"
                  value={signInData.username}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded-lg ${signInErrors.username ? 'border-red-500' : 'border-gray-300'}`}
                />
                {signInErrors.username && <p className="text-red-500 text-sm mt-1">Username is required.</p>}
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value={signInData.password}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded-lg ${signInErrors.password ? 'border-red-500' : 'border-gray-300'}`}
                />
                {signInErrors.password && <p className="text-red-500 text-sm mt-1">Password is required.</p>}
              </div>
              <button
                type="button"
                onClick={handleSignIn}
                className="w-full bg-purple-700 text-white py-2 rounded-lg font-semibold hover:bg-purple-800"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Create Account Form */}
      {showCreateAccountForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 p-4">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
            <button
              type="button"
              onClick={handleCloseForm}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            >
              <FaTimes />
            </button>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Create Account</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="newUsername" className="block text-gray-700 mb-2">Username</label>
                <input
                  type="text"
                  id="newUsername"
                  placeholder="Enter your username"
                  value={createAccountData.newUsername}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded-lg ${createAccountErrors.newUsername ? 'border-red-500' : 'border-gray-300'}`}
                />
                {createAccountErrors.newUsername && <p className="text-red-500 text-sm mt-1">Username is required.</p>}
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={createAccountData.email}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded-lg ${createAccountErrors.email ? 'border-red-500' : 'border-gray-300'}`}
                />
                {createAccountErrors.email && <p className="text-red-500 text-sm mt-1">Email is required.</p>}
              </div>
              <div className="mb-4">
                <label htmlFor="newpassword" className="block text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  id="newpassword"
                  placeholder="Enter your password"
                  value={createAccountData.newpassword}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded-lg ${createAccountErrors.newpassword ? 'border-red-500' : 'border-gray-300'}`}
                />
                {createAccountErrors.newpassword && <p className="text-red-500 text-sm mt-1">Password is required and should be at least 8 characters long.</p>}
              </div>
              <button
                type="button"
                onClick={handleCreateAccount}
                className="w-full bg-purple-700 text-white py-2 rounded-lg font-semibold hover:bg-purple-800"
              >
                Create Account
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Sign Out Confirmation */}
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 p-4">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Confirm Sign Out</h2>
            <p className="mb-6 text-gray-600">Are you sure you want to sign out?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={cancelSignOut}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg font-semibold hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={confirmSignOut}
                className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;













// import React, { useState } from 'react';
// import { FaUser, FaSignInAlt, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';

// function Header() {
//   const [showMenu, setShowMenu] = useState(false);
//   const [showSignInForm, setShowSignInForm] = useState(false);
//   const [showCreateAccountForm, setShowCreateAccountForm] = useState(false);
//   const [isSignedIn, setIsSignedIn] = useState(false);
//   const [showConfirmation, setShowConfirmation] = useState(false);
//   const [bookNowButtonActive, setBookNowButtonActive] = useState(false);
  
//   const [signInData, setSignInData] = useState({ username: '', password: '' });
//   const [createAccountData, setCreateAccountData] = useState({ newUsername: '', email: '', newpassword: '' });

//   const [signInErrors, setSignInErrors] = useState({ username: false, password: false });
//   const [createAccountErrors, setCreateAccountErrors] = useState({ newUsername: false, email: false, newpassword: false });

//   const handleInputChange = (e) => {
//     const { id, value } = e.target;
//     if (id === 'username' || id === 'password') {
//       setSignInData({ ...signInData, [id]: value });
//     } else {
//       setCreateAccountData({ ...createAccountData, [id]: value });
//     }
//   };

//   const validateSignIn = () => {
//     const errors = { username: !signInData.username, password: !signInData.password };
//     setSignInErrors(errors);
//     return !errors.username && !errors.password;
//   };

//   const validateCreateAccount = () => {
//     const errors = {
//       newUsername: !createAccountData.newUsername,
//       email: !createAccountData.email,
//       newpassword: !createAccountData.newpassword || createAccountData.newpassword.length < 8
//     };
//     setCreateAccountErrors(errors);
//     return !errors.newUsername && !errors.email && !errors.newpassword;
//   };

//   const handleSignIn = () => {
//     if (validateSignIn()) {
//       console.log('Sign-In Data:', signInData);
//       setIsSignedIn(true);
//       setShowSignInForm(false);
//       setShowCreateAccountForm(false);
//       setBookNowButtonActive(false);
//       setShowMenu(false);
//     }
//   };

//   const handleCreateAccount = () => {
//     if (validateCreateAccount()) {
//       console.log('Create Account Data:', createAccountData);
//       setIsSignedIn(true);
//       setShowSignInForm(false);
//       setShowCreateAccountForm(false);
//       setBookNowButtonActive(false);
//       setShowMenu(false);
//     }
//   };

//   const handleSignOut = () => {
//     setShowConfirmation(true);
//   };

//   const confirmSignOut = () => {
//     setIsSignedIn(false);
//     setShowSignInForm(false);
//     setBookNowButtonActive(false);
//     setShowConfirmation(false);
//   };

//   const cancelSignOut = () => {
//     setShowConfirmation(false);
//   };

//   const toggleSignInForm = () => {
//     setShowSignInForm(!showSignInForm);
//     setShowCreateAccountForm(false);
//     setBookNowButtonActive(!showSignInForm);
//   };

//   const toggleCreateAccountForm = () => {
//     setShowCreateAccountForm(!showCreateAccountForm);
//     setShowSignInForm(false);
//     setBookNowButtonActive(!showCreateAccountForm);
//   };

//   const handleCloseForm = () => {
//     setShowSignInForm(false);
//     setShowCreateAccountForm(false);
//   };

//   const handleBookNowClick = () => {
//     setShowMenu(false);
//   };

//   return (
//     <>
//       <header className="bg-purple-700 text-white p-4 flex items-center justify-between lg:justify-between shadow-md fixed top-0 w-full z-50">
//         {/* Logo */}
//         <div className="text-2xl font-bold flex-1 lg:flex-none">
//           <span className="text-yellow-400">COMFORT</span>TRIP
//         </div>

//         {/* Right Side Buttons */}
//         <div className="hidden lg:flex lg:items-center lg:gap-4">
//           {isSignedIn ? (
//             <>
//               <button onClick={handleSignOut} className="flex items-center text-lg text-white">
//                 <FaSignOutAlt className="mr-2" /> Sign Out
//               </button>
//               <button
//                 onClick={handleBookNowClick}
//                 className={`px-4 py-2 rounded-lg font-semibold ${bookNowButtonActive ? 'bg-yellow-600 text-white' : 'bg-yellow-400 text-purple-700'}`}
//               >
//                 Book Now
//               </button>
//             </>
//           ) : (
//             <>
//               <button onClick={toggleSignInForm} className="flex items-center text-lg text-white">
//                 <FaSignInAlt className="mr-2" /> Sign In
//               </button>
//               <button onClick={toggleCreateAccountForm} className="flex items-center text-lg text-white">
//                 <FaUser className="mr-2" /> Create Account
//               </button>
//               <button
//                 onClick={handleBookNowClick}
//                 className={`px-4 py-2 rounded-lg font-semibold ${bookNowButtonActive ? 'bg-yellow-600 text-white' : 'bg-yellow-400 text-purple-700'}`}
//               >
//                 Book Now
//               </button>
//             </>
//           )}
//         </div>

//         {/* Mobile Menu Button */}
//         <div className="lg:hidden flex items-center">
//           <button
//             onClick={() => setShowMenu(!showMenu)}
//             className="text-white text-2xl"
//           >
//             {showMenu ? <FaTimes /> : <FaBars />}
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         <nav className={`lg:hidden fixed inset-0 flex flex-col items-start bg-purple-700 bg-opacity-90 z-50 ${showMenu ? 'block' : 'hidden'} p-4`}>
//           <div className="flex flex-col w-full gap-4 mt-4">
//             {isSignedIn ? (
//               <>
//                 <button onClick={handleSignOut} className="flex items-center text-lg text-white">
//                   <FaSignOutAlt className="mr-2" /> Sign Out
//                 </button>
//                 <button
//                   onClick={handleBookNowClick}
//                   className={`px-4 py-2 rounded-lg font-semibold ${bookNowButtonActive ? 'bg-yellow-600 text-white' : 'bg-yellow-400 text-purple-700'}`}
//                 >
//                   Book Now
//                 </button>
//               </>
//             ) : (
//               <>
//                 <button onClick={toggleSignInForm} className="flex items-center text-lg text-white">
//                   <FaSignInAlt className="mr-2" /> Sign In
//                 </button>
//                 <button onClick={toggleCreateAccountForm} className="flex items-center text-lg text-white">
//                   <FaUser className="mr-2" /> Create Account
//                 </button>
//                 <button
//                   onClick={handleBookNowClick}
//                   className={`px-4 py-2 rounded-lg font-semibold ${bookNowButtonActive ? 'bg-yellow-600 text-white' : 'bg-yellow-400 text-purple-700'}`}
//                 >
//                   Book Now
//                 </button>
//               </>
//             )}
//           </div>
//           <button
//             type="button"
//             onClick={() => setShowMenu(false)}
//             className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
//           >
//             <FaTimes />
//           </button>
//         </nav>
//       </header>

//       {/* Sign In Form */}
//       {showSignInForm && (
//         <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 p-4">
//           <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
//             <button
//               type="button"
//               onClick={handleCloseForm}
//               className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
//             >
//               <FaTimes />
//             </button>
//             <h2 className="text-2xl font-bold mb-4 text-gray-800">Sign In</h2>
//             <form>
//               <div className="mb-4">
//                 <label htmlFor="username" className="block text-gray-700 mb-2">Username</label>
//                 <input
//                   type="text"
//                   id="username"
//                   placeholder="Enter your username"
//                   value={signInData.username}
//                   onChange={handleInputChange}
//                   className={`w-full p-2 border rounded-lg ${signInErrors.username ? 'border-red-500' : 'border-gray-300'}`}
//                 />
//                 {signInErrors.username && <p className="text-red-500 text-sm mt-1">Username is required.</p>}
//               </div>
//               <div className="mb-4">
//                 <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
//                 <input
//                   type="password"
//                   id="password"
//                   placeholder="Enter your password"
//                   value={signInData.password}
//                   onChange={handleInputChange}
//                   className={`w-full p-2 border rounded-lg ${signInErrors.password ? 'border-red-500' : 'border-gray-300'}`}
//                 />
//                 {signInErrors.password && <p className="text-red-500 text-sm mt-1">Password is required.</p>}
//               </div>
//               <button
//                 type="button"
//                 onClick={handleSignIn}
//                 className="w-full bg-purple-700 text-white py-2 rounded-lg hover:bg-purple-800"
//               >
//                 Sign In
//               </button>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Create Account Form */}
//       {showCreateAccountForm && (
//         <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 p-4">
//           <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
//             <button
//               type="button"
//               onClick={handleCloseForm}
//               className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
//             >
//               <FaTimes />
//             </button>
//             <h2 className="text-2xl font-bold mb-4 text-gray-800">Create Account</h2>
//             <form>
//               <div className="mb-4">
//                 <label htmlFor="newUsername" className="block text-gray-700 mb-2">Username</label>
//                 <input
//                   type="text"
//                   id="newUsername"
//                   placeholder="Enter your username"
//                   value={createAccountData.newUsername}
//                   onChange={handleInputChange}
//                   className={`w-full p-2 border rounded-lg ${createAccountErrors.newUsername ? 'border-red-500' : 'border-gray-300'}`}
//                 />
//                 {createAccountErrors.newUsername && <p className="text-red-500 text-sm mt-1">Username is required.</p>}
//               </div>
//               <div className="mb-4">
//                 <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
//                 <input
//                   type="email"
//                   id="email"
//                   placeholder="Enter your email"
//                   value={createAccountData.email}
//                   onChange={handleInputChange}
//                   className={`w-full p-2 border rounded-lg ${createAccountErrors.email ? 'border-red-500' : 'border-gray-300'}`}
//                 />
//                 {createAccountErrors.email && <p className="text-red-500 text-sm mt-1">Email is required.</p>}
//               </div>
//               <div className="mb-4">
//                 <label htmlFor="newpassword" className="block text-gray-700 mb-2">Password</label>
//                 <input
//                   type="password"
//                   id="newpassword"
//                   placeholder="Enter your password"
//                   value={createAccountData.newpassword}
//                   onChange={handleInputChange}
//                   className={`w-full p-2 border rounded-lg ${createAccountErrors.newpassword ? 'border-red-500' : 'border-gray-300'}`}
//                 />
//                 {createAccountErrors.newpassword && <p className="text-red-500 text-sm mt-1">Password is required and should be at least 8 characters.</p>}
//               </div>
//               <button
//                 type="button"
//                 onClick={handleCreateAccount}
//                 className="w-full bg-purple-700 text-white py-2 rounded-lg hover:bg-purple-800"
//               >
//                 Create Account
//               </button>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Sign Out Confirmation */}
//       {showConfirmation && (
//         <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 p-4">
//           <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//             <h2 className="text-2xl font-bold mb-4 text-gray-800">Confirm Sign Out</h2>
//             <p className="text-gray-700 mb-4">Are you sure you want to sign out?</p>
//             <div className="flex justify-between">
//               <button
//                 type="button"
//                 onClick={confirmSignOut}
//                 className="w-1/3 bg-purple-700 text-white py-2 rounded-lg hover:bg-purple-800"
//               >
//                 Yes
//               </button>
//               <button
//                 type="button"
//                 onClick={cancelSignOut}
//                 className="w-1/3 bg-gray-300 text-gray-800 py-2 rounded-lg hover:bg-gray-400"
//               >
//                 No
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default Header;
