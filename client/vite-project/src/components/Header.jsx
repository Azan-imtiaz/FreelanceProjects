import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import React, { useState } from 'react';
import { FaUser, FaSignInAlt, FaSignOutAlt, FaBars, FaTimes, FaUserCircle, FaTrashAlt, FaKey } from 'react-icons/fa';
import { IoClose } from "react-icons/io5";
import logo from './logo.png'; // Make sure to update the path to your actual logo image
import { createAccount,signIn} from "../Services/apis";




function Header() {

  const MySwal = withReactContent(Swal);


  const [showMenu, setShowMenu] = useState(false);
  const [showSignInForm, setShowSignInForm] = useState(false);
  const [showCreateAccountForm, setShowCreateAccountForm] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);
  const [bookNowButtonActive, setBookNowButtonActive] = useState(false);

  const [signInData, setSignInData] = useState({ username: '', password: '' });
  const [createAccountData, setCreateAccountData] = useState({ newUsername: '', email: '', newpassword: '' });
  const [changePasswordData, setChangePasswordData] = useState({ newPassword: '', confirmPassword: '' });

  const [signInErrors, setSignInErrors] = useState({ username: false, password: false });
  const [createAccountErrors, setCreateAccountErrors] = useState({ newUsername: false, email: false, newpassword: false });
  const [changePasswordErrors, setChangePasswordErrors] = useState({ newPassword: false, confirmPassword: false });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === 'username' || id === 'password') {
      setSignInData({ ...signInData, [id]: value });
    } else if (id === 'newUsername' || id === 'email' || id === 'newpassword') {
      setCreateAccountData({ ...createAccountData, [id]: value });
    } else if (id === 'newPassword' || id === 'confirmPassword') {
      setChangePasswordData({ ...changePasswordData, [id]: value });
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

  const validateChangePassword = () => {
    const errors = {
      newPassword: !changePasswordData.newPassword || changePasswordData.newPassword.length < 8,
      confirmPassword: changePasswordData.confirmPassword !== changePasswordData.newPassword
    };
    setChangePasswordErrors(errors);
    return !errors.newPassword && !errors.confirmPassword;
  };

  const handleSignIn =async() => {
    if (validateSignIn()) {
      try{
        
        const res=await signIn(signInData.username,signInData.password);
  
        console.log('Create Account Data:', res.jwt);
       
      // Check if the response contains the JWT token
   if (res.jwt) {
    console.log("hello");
    // Set the token as a cookie in the browser
    document.cookie = `token=${res.jwt}; `; 

    // Additional cookie attributes can be set such as:
    // Secure; // Uncomment if you're serving your site over HTTPS
    // HttpOnly; // Uncomment to prevent JavaScript from accessing the cookie
  }
  
        // Display success SweetAlert2 notification
        MySwal.fire({
          title: 'Success!',
          text: 'Login Succesfully!',
          icon: 'success',
          confirmButtonText: 'OK'
        });
  
       
        setIsSignedIn(true);
        setShowSignInForm(false);
        setShowCreateAccountForm(false);
        setBookNowButtonActive(true);
        setShowMenu(false);
        
setSignInData({ username: '', password: '' })
      }
      catch(err){
        console.log(err.message);

        setIsSignedIn(false);
        setShowSignInForm(true);
        setShowCreateAccountForm(false);
        setShowMenu(true);
   
        
        MySwal.fire({
          title: 'Error!',
          text: err.message.includes('Invalid email or password')
            ? 'Invalid email or password.'
            : 'Internal server error.',
      
          icon: 'error',
          confirmButtonText: 'OK'
        });

      }
    }
  };

  const handleCreateAccount = async () => {
    if (validateCreateAccount()) {
      try {
        const res = await createAccount(createAccountData.newUsername,createAccountData.email, createAccountData.newpassword);
        
        console.log('Create Account Data:', res);
  
        // Display success SweetAlert2 notification
        MySwal.fire({
          title: 'Success!',
          text: 'Account successfully created!',
          icon: 'success',
          confirmButtonText: 'OK'
        });
  
setCreateAccountData({ newUsername: '', email: '', newpassword: '' })
        setIsSignedIn(false);
        setShowSignInForm(false);
        setShowCreateAccountForm(false);
        setBookNowButtonActive(true);
        setShowMenu(false);


      } catch (err) {
        console.log("err.messae"+err.message);
        setIsSignedIn(false);
        setShowSignInForm(false);
        setShowCreateAccountForm(true);
        setShowMenu(true);
  
        // Display error SweetAlert2 notification
        MySwal.fire({
          title: 'Error!',
          text: err.message.includes('Email already exists')
            ? 'Account not created: Email already exists.'
            : 'Account creation failed. Please try again.',
      
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    }
  };
  

  const handleSignOut = () => {
    setShowConfirmation(true);
  };

  const confirmSignOut = () => {
    
    setIsSignedIn(false);
    setShowSignInForm(false);
    setShowCreateAccountForm(false);
    setBookNowButtonActive(false);
    setShowConfirmation(false);
    setShowChangePasswordForm(false);


  };

  const cancelSignOut = () => {
    setShowConfirmation(false);
  };

  const handleDeleteAccount = () => {
    setShowConfirmation(true);
  };

  const handleChangePassword = () => {
    if (validateChangePassword()) {
      console.log('Change Password Data:', changePasswordData);
      setShowChangePasswordForm(false);
    }
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

  const toggleChangePasswordForm = () => {
    setShowChangePasswordForm(!showChangePasswordForm);
    setShowMenu(false);
  };

  const handleCloseForm = () => {
    setShowSignInForm(false);
    setShowCreateAccountForm(false);
    setShowChangePasswordForm(false);
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
              <div className="relative flex items-center">
                <button onClick={() => setShowMenu(!showMenu)} className="flex items-center text-lg text-white">
                  <FaUserCircle className="mr-2" />
                  <span>Profile</span>
                </button>
                {showMenu && (
                  <div className="absolute right-0 top-8 bg-white text-black p-4 rounded-lg shadow-lg">
                    <button onClick={handleDeleteAccount} className="block text-red-600 hover:bg-red-100 px-4 py-2 rounded-lg flex items-center">
                      <FaTrashAlt className="mr-2" /> Delete Account
                    </button>
                    <button onClick={handleSignOut} className="block text-gray-800 hover:bg-gray-100 px-4 py-2 rounded-lg flex items-center">
                      <FaSignOutAlt className="mr-2" /> Sign Out
                    </button>
                    <button onClick={toggleChangePasswordForm} className="block text-gray-800 hover:bg-gray-100 px-4 py-2 rounded-lg flex items-center">
                      <FaKey className="mr-2" /> Change Password
                    </button>
                  </div>
                )}
              </div>
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
                {/* <div className="flex items-center text-white text-lg">
                  <FaUserCircle className="mr-2" />
                  <span>Profile</span>
                </div> */}
                <button onClick={handleDeleteAccount} className="flex items-center text-white text-lg">
                  <FaTrashAlt className="mr-2" /> Delete Account
                </button>
                <button onClick={handleSignOut} className="flex items-center text-white text-lg">
                  <FaSignOutAlt className="mr-2" /> Sign Out
                </button>
                <button onClick={toggleChangePasswordForm} className="flex items-center text-white text-lg">
                  <FaKey className="mr-2" /> Change Password
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
                <button onClick={toggleSignInForm} className="flex items-center text-white text-lg">
                  <FaSignInAlt className="mr-2" /> Sign In
                </button>
                <button onClick={toggleCreateAccountForm} className="flex items-center text-white text-lg">
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
        </nav>
      </header>
{/* Sign In Form */}
{showSignInForm && (
  <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
    <div className="relative bg-white p-4 md:p-8 rounded-lg shadow-lg w-full max-w-md">
      {/* Close Icon */}
      <button
        onClick={handleCloseForm}
        className="absolute top-2 right-2 text-gray-600 hover:text-black"
      >
        <IoClose size={24} />
      </button>
      <h2 className="text-xl md:text-2xl mb-4">Sign In</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSignIn();
        }}
      >
        <label htmlFor="username" className="block mb-2">
          Username:
        </label>
        <input
          type="text"
          id="username"
          value={signInData.username}
          onChange={handleInputChange}
          className="w-full mb-4 p-2 border border-gray-300 rounded-lg"
        />
        {signInErrors.username && (
          <p className="text-red-500 text-sm mb-2">Username is required</p>
        )}
        <label htmlFor="password" className="block mb-2">
          Password:
        </label>
        <input
          type="password"
          id="password"
          value={signInData.password}
          onChange={handleInputChange}
          className="w-full mb-4 p-2 border border-gray-300 rounded-lg"
        />
        {signInErrors.password && (
          <p className="text-red-500 text-sm mb-2">Password is required</p>
        )}
        <div className="flex flex-col md:flex-row items-center justify-between">
          <button
            type="submit"
            className="w-full md:w-auto mb-2 md:mb-0 px-4 py-2 bg-purple-700 text-white rounded-lg"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  </div>
)}

{/* Create Account Form */}
{showCreateAccountForm && (
  <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
    <div className="relative bg-white p-4 md:p-8 rounded-lg shadow-lg w-full max-w-md">
      {/* Close Icon */}
      <button
        onClick={handleCloseForm}
        className="absolute top-2 right-2 text-gray-600 hover:text-black"
      >
        <IoClose size={24} />
      </button>
      <h2 className="text-xl md:text-2xl mb-4">Create Account</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCreateAccount();
        }}
      >
        <label htmlFor="newUsername" className="block mb-2">
          Username:
        </label>
        <input
          type="text"
          id="newUsername"
          value={createAccountData.newUsername}
          onChange={handleInputChange}
          className="w-full mb-4 p-2 border border-gray-300 rounded-lg"
        />
        {createAccountErrors.newUsername && (
          <p className="text-red-500 text-sm mb-2">Username is required</p>
        )}
        <label htmlFor="email" className="block mb-2">
          Email:
        </label>
        <input
          type="email"
          id="email"
          value={createAccountData.email}
          onChange={handleInputChange}
          className="w-full mb-4 p-2 border border-gray-300 rounded-lg"
        />
        {createAccountErrors.email && (
          <p className="text-red-500 text-sm mb-2">Email is required</p>
        )}
        <label htmlFor="newpassword" className="block mb-2">
          Password:
        </label>
        <input
          type="password"
          id="newpassword"
          value={createAccountData.newpassword}
          onChange={handleInputChange}
          className="w-full mb-4 p-2 border border-gray-300 rounded-lg"
        />
        {createAccountErrors.newpassword && (
          <p className="text-red-500 text-sm mb-2">
            Password must be at least 8 characters
          </p>
        )}
        <div className="flex flex-col md:flex-row items-center justify-between">
          <button
            type="submit"
            className="w-full md:w-auto mb-2 md:mb-0 px-4 py-2 bg-purple-700 text-white rounded-lg"
          >
            Create Account
          </button>
        </div>
      </form>
    </div>
  </div>
)}

{/* Change Password Form */}
{showChangePasswordForm && (
  <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
    <div className="relative bg-white p-4 md:p-8 rounded-lg shadow-lg w-full max-w-md">
      {/* Close Icon */}
      <button
        onClick={handleCloseForm}
        className="absolute top-2 right-2 text-gray-600 hover:text-black"
      >
        <IoClose size={24} />
      </button>
      <h2 className="text-xl md:text-2xl mb-4">Change Password</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleChangePassword();
        }}
      >
        <label htmlFor="newPassword" className="block mb-2">
          New Password:
        </label>
        <input
          type="password"
          id="newPassword"
          value={changePasswordData.newPassword}
          onChange={handleInputChange}
          className="w-full mb-4 p-2 border border-gray-300 rounded-lg"
        />
        {changePasswordErrors.newPassword && (
          <p className="text-red-500 text-sm mb-2">
            New password must be at least 8 characters
          </p>
        )}
        <label htmlFor="confirmPassword" className="block mb-2">
          Confirm Password:
        </label>
        <input
          type="password"
          id="confirmPassword"
          value={changePasswordData.confirmPassword}
          onChange={handleInputChange}
          className="w-full mb-4 p-2 border border-gray-300 rounded-lg"
        />
        {changePasswordErrors.confirmPassword && (
          <p className="text-red-500 text-sm mb-2">Passwords do not match</p>
        )}
        <div className="flex flex-col md:flex-row items-center justify-between">
          <button
            type="submit"
            className="w-full md:w-auto mb-2 md:mb-0 px-4 py-2 bg-purple-700 text-white rounded-lg"
          >
            Change Password
          </button>
        </div>
      </form>
    </div>
  </div>
)}

{/* Confirmation Popup */}
{showConfirmation && (
  <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
    <div className="relative bg-white p-4 md:p-8 rounded-lg shadow-lg w-full max-w-md">
      {/* Close Icon */}
      <button
        onClick={cancelSignOut}
        className="absolute top-2 right-2 text-gray-600 hover:text-black"
      >
        <IoClose size={24} />
      </button>
      <h2 className="text-xl md:text-2xl mb-4">Are you sure?</h2>
      <p className="mb-4">
        This action will delete your account and sign you out.
      </p>
      <div className="flex flex-col md:flex-row items-center justify-between">
        <button
          onClick={confirmSignOut}
          className="w-full md:w-auto mb-2 md:mb-0 px-4 py-2 bg-red-600 text-white rounded-lg"
        >
          Confirm
        </button>
     
      </div>
    </div>
  </div>
)}
    </>
  );
}

export default Header;












      {/* Sign In Form */}
      // {showSignInForm && (
      //   <div className="fixed inset-0 flex items-center justify-center z-50">
      //     <div className="bg-white p-8 rounded-lg shadow-lg">
      //       <h2 className="text-2xl mb-4">Sign In</h2>
      //       <form onSubmit={(e) => { e.preventDefault(); handleSignIn(); }}>
      //         <label htmlFor="username" className="block mb-2">Username:</label>
      //         <input
      //           type="text"
      //           id="username"
      //           value={signInData.username}
      //           onChange={handleInputChange}
      //           className="w-full mb-4 p-2 border border-gray-300 rounded-lg"
      //         />
      //         {signInErrors.username && <p className="text-red-500 text-sm mb-2">Username is required</p>}
      //         <label htmlFor="password" className="block mb-2">Password:</label>
      //         <input
      //           type="password"
      //           id="password"
      //           value={signInData.password}
      //           onChange={handleInputChange}
      //           className="w-full mb-4 p-2 border border-gray-300 rounded-lg"
      //         />
      //         {signInErrors.password && <p className="text-red-500 text-sm mb-2">Password is required</p>}
      //         <button type="submit" className="px-4 py-2 bg-purple-700 text-white rounded-lg">Sign In</button>
      //         <button onClick={handleCloseForm} className="ml-4 px-4 py-2 bg-gray-300 text-black rounded-lg">Close</button>
      //       </form>
      //     </div>
      //   </div>
      // )}

      // {/* Create Account Form */}
      // {showCreateAccountForm && (
      //   <div className="fixed inset-0 flex items-center justify-center z-50">
      //     <div className="bg-white p-8 rounded-lg shadow-lg">
      //       <h2 className="text-2xl mb-4">Create Account</h2>
      //       <form onSubmit={(e) => { e.preventDefault(); handleCreateAccount(); }}>
      //         <label htmlFor="newUsername" className="block mb-2">Username:</label>
      //         <input
      //           type="text"
      //           id="newUsername"
      //           value={createAccountData.newUsername}
      //           onChange={handleInputChange}
      //           className="w-full mb-4 p-2 border border-gray-300 rounded-lg"
      //         />
      //         {createAccountErrors.newUsername && <p className="text-red-500 text-sm mb-2">Username is required</p>}
      //         <label htmlFor="email" className="block mb-2">Email:</label>
      //         <input
      //           type="email"
      //           id="email"
      //           value={createAccountData.email}
      //           onChange={handleInputChange}
      //           className="w-full mb-4 p-2 border border-gray-300 rounded-lg"
      //         />
      //         {createAccountErrors.email && <p className="text-red-500 text-sm mb-2">Email is required</p>}
      //         <label htmlFor="newpassword" className="block mb-2">Password:</label>
      //         <input
      //           type="password"
      //           id="newpassword"
      //           value={createAccountData.newpassword}
      //           onChange={handleInputChange}
      //           className="w-full mb-4 p-2 border border-gray-300 rounded-lg"
      //         />
      //         {createAccountErrors.newpassword && <p className="text-red-500 text-sm mb-2">Password must be at least 8 characters</p>}
      //         <button type="submit" className="px-4 py-2 bg-purple-700 text-white rounded-lg">Create Account</button>
      //         <button onClick={handleCloseForm} className="ml-4 px-4 py-2 bg-gray-300 text-black rounded-lg">Close</button>
      //       </form>
      //     </div>
      //   </div>
      // )}

      // {/* Change Password Form */}
      // {showChangePasswordForm && (
      //   <div className="fixed inset-0 flex items-center justify-center z-50">
      //     <div className="bg-white p-8 rounded-lg shadow-lg">
      //       <h2 className="text-2xl mb-4">Change Password</h2>
      //       <form onSubmit={(e) => { e.preventDefault(); handleChangePassword(); }}>
      //         <label htmlFor="newPassword" className="block mb-2">New Password:</label>
      //         <input
      //           type="password"
      //           id="newPassword"
      //           value={changePasswordData.newPassword}
      //           onChange={handleInputChange}
      //           className="w-full mb-4 p-2 border border-gray-300 rounded-lg"
      //         />
      //         {changePasswordErrors.newPassword && <p className="text-red-500 text-sm mb-2">New password must be at least 8 characters</p>}
      //         <label htmlFor="confirmPassword" className="block mb-2">Confirm Password:</label>
      //         <input
      //           type="password"
      //           id="confirmPassword"
      //           value={changePasswordData.confirmPassword}
      //           onChange={handleInputChange}
      //           className="w-full mb-4 p-2 border border-gray-300 rounded-lg"
      //         />
      //         {changePasswordErrors.confirmPassword && <p className="text-red-500 text-sm mb-2">Passwords do not match</p>}
      //         <button type="submit" className="px-4 py-2 bg-purple-700 text-white rounded-lg">Change Password</button>
      //         <button onClick={handleCloseForm} className="ml-4 px-4 py-2 bg-gray-300 text-black rounded-lg">Close</button>
      //       </form>
      //     </div>
      //   </div>
      // )}

      // {/* Confirmation Popup */}
      // {showConfirmation && (
      //   <div className="fixed inset-0 flex items-center justify-center z-50">
      //     <div className="bg-white p-8 rounded-lg shadow-lg">
      //       <h2 className="text-xl mb-4">Are you sure?</h2>
      //       <p className="mb-4">This action will delete your account and sign you out.</p>
      //       <button onClick={confirmSignOut} className="px-4 py-2 bg-red-600 text-white rounded-lg mr-4">Confirm</button>
      //       <button onClick={cancelSignOut} className="px-4 py-2 bg-gray-300 text-black rounded-lg">Cancel</button>
      //     </div>
      //   </div>
      // )}