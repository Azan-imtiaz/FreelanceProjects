import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import React, { useContext, useEffect, useState } from 'react';
import { FaUser, FaSignInAlt, FaSignOutAlt, FaBars, FaTimes, FaUserCircle, FaTrashAlt, FaKey } from 'react-icons/fa';
import { IoPersonAdd, IoKey, IoWarning, IoClose, IoLockClosed, IoShieldCheckmarkSharp, IoAlertCircleOutline, IoMail } from "react-icons/io5";
import logo from './logo.png'; // Make sure to update the path to your actual logo image
import { createAccount, signIn, changePassword, signOut, deleteUserAccount,verifyTokenAtStart, verifyOTPFunc, forgetPaswordFunc,resetPasword } from "../Services/apis";
import { AuthContext } from './contextProvider';
import Cookies from 'js-cookie';


function Header() {
  
  const MySwal = withReactContent(Swal);
 const { isSignedInFinal,  signInFinal, signOutFinal,userEmail, setUserEmail }=  useContext(AuthContext);

  const [showMenu, setShowMenu] = useState(false);
  const [showSignInForm, setShowSignInForm] = useState(false);
  const [showCreateAccountForm, setShowCreateAccountForm] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);
  const [bookNowButtonActive, setBookNowButtonActive] = useState(false);
  const [showOtpVerification, setShowOtp] = new useState(false);
  const [showForgotPassword, setShowForgotPassword] = new useState(false);
  const [showForgotOtpVerification, setForgotOtpVerification] = new useState(false);


  const [signInData, setSignInData] = useState({ username: '', password: '' });
  const [createAccountData, setCreateAccountData] = useState({ newUsername: '', email: '', newpassword: '' });
  const [changePasswordData, setChangePasswordData] = useState({ newPassword: '', confirmPassword: '', oldPassword: '' });
  const [passwordDeleteAccount, setPasswordDeleteAccount] = useState({ password: "" });
  const [otpInp, setOtpInp] = useState({ email: "", otp: "" });
  const [forgetPassword, setForgetPassword] = useState({ email: "", newPassword: "" });

  const [signInErrors, setSignInErrors] = useState({ username: false, password: false });
  const [createAccountErrors, setCreateAccountErrors] = useState({ newUsername: false, email: false, newpassword: false });
  const [changePasswordErrors, setChangePasswordErrors] = useState({ newPassword: false, confirmPassword: false, oldPassword: false });



  useEffect(()=>{
    console.log("isSignedInFinal"+isSignedInFinal);
    async function verifyT(){
      try{
        const res=  await verifyTokenAtStart();
        setIsSignedIn(true);
        signInFinal();
        console.log("user is already sign in");
      
      }
      catch(err){
  console.log(err);
  signOutFinal();
  console.log("user is not sign in yet");
      }
    } 
    verifyT();
  },[])


  function handleForgetPasswordInSignIn() {
    setShowForgotPassword(true);
    setShowSignInForm(false);
  }
  async function handleForgetOtpSubmit() {
    
    try {

      console.log(otpInp);
      if (!otpInp.email || !otpInp.otp) {
        MySwal.fire({
          title: 'Error!',
          text: 'Please fill all the fields!',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        
      }
      else {
        const res = await resetPasword(otpInp.email, otpInp.otp);
        MySwal.fire({
          title: 'Success!',
          text: 'Password Reset Successully!',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        setOtpInp({ email: "", otp: "" });


        setShowOtp(false);
        setIsSignedIn(false);
        setShowSignInForm(false);
        setShowCreateAccountForm(false);
        setBookNowButtonActive(false);
        setShowConfirmation(false);
        setShowChangePasswordForm(false);
        setShowDeleteConfirmation(false);
        setForgotOtpVerification(false);


      }

    }
    catch (err) {
      console.log(err.message);
      if (err.message.includes("Invalid OTP")) {
        MySwal.fire({
          title: 'Error!',
          text: 'Invalid otp!',
          icon: 'error',
          confirmButtonText: 'OK'
        });

        setForgotOtpVerification(true);

      }
      else {

        MySwal.fire({
          title: 'Error!',
          text: 'Something Went Wrong!',
          icon: 'error',
          confirmButtonText: 'OK'
        });

        setIsSignedIn(false);
        setShowSignInForm(false);
        setShowCreateAccountForm(false);
        setBookNowButtonActive(false);
        setShowConfirmation(false);
        setShowChangePasswordForm(false);
        setShowDeleteConfirmation(false);
        setForgotOtpVerification(true);
      }
    }

  }

  function cancelForgotPassword() {
    setShowForgotPassword(false);

    setForgetPassword({ email: "", newPassword: "" });
     setSignInData({ username: '', password: '' })

  }

  function handleForgetChange(e) {
    const { name, value } = e.target;
    setForgetPassword(prevState => ({
      ...prevState,
      [name]: value
    }));
    console.log(forgetPassword)
  }
  




  async function handleForgetSubmit() {
    if (!forgetPassword.email || !forgetPassword.newPassword || forgetPassword.newPassword.length < 8) {
      MySwal.fire({
        title: 'Success!',
        text: 'Fill all the fields',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      setShowForgotPassword(true);
    }
    else {
      try {
        const res = await forgetPaswordFunc(forgetPassword.email, forgetPassword.newPassword);

        MySwal.fire({
          title: 'Success!',
          text: 'Otp send to the email!',
          icon: 'success',
          confirmButtonText: 'OK'
        });



        setShowOtp(false);
        setIsSignedIn(false);
        setShowSignInForm(false);
        setShowCreateAccountForm(false);
        setBookNowButtonActive(false);
        setShowConfirmation(false);
        setShowChangePasswordForm(false);
        setShowDeleteConfirmation(false);
        setShowForgotPassword(false);
        setForgotOtpVerification(true);


        setForgetPassword({ email: "", newPassword: "" });

      }
      catch (err) {
        console.log(err.message);

        if (err.message.includes("Email not registered")) {
          MySwal.fire({
            title: 'Error!',
            text: 'No Account on this email!',
            icon: 'error',
            confirmButtonText: 'OK'
          });
          setForgotOtpVerification(false);
          setShowForgotPassword(true);

        }
        else {
          MySwal.fire({
            title: 'Error!',
            text: 'Internal Server Error!',
            icon: 'error',
            confirmButtonText: 'OK'
          });
          setShowForgotPassword(true);
          setForgotOtpVerification(false);
        }
      }

    }
  }


  function handleOtpChange(e) {
    const { value, name } = e.target;
    setOtpInp({ ...otpInp, [name]: value });

  }

  async function handleOtpSubmit() {
    try {

      console.log(otpInp);
      if (!otpInp.email || !otpInp.otp) {
        MySwal.fire({
          title: 'Error!',
          text: 'Please fill all the fields!',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
      else {
        const res = await verifyOTPFunc(otpInp.email, otpInp.otp);
        MySwal.fire({
          title: 'Success!',
          text: 'Account Created Successfully!',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        setOtpInp({ email: "", otp: "" });


        setShowOtp(false);
        setIsSignedIn(false);
        setShowSignInForm(false);
        setShowCreateAccountForm(false);
        setBookNowButtonActive(false);
        setShowConfirmation(false);
        setShowChangePasswordForm(false);
        setShowDeleteConfirmation(false);

      }

    }
    catch (err) {
      console.log(err.message);
      if (err.message.includes("Invalid OTP")) {
        MySwal.fire({
          title: 'Error!',
          text: 'Invalid otp!',
          icon: 'error',
          confirmButtonText: 'OK'
        });

        setShowOtp(true);

      }
      else {

        MySwal.fire({
          title: 'Error!',
          text: 'Something Went Wrong!',
          icon: 'error',
          confirmButtonText: 'OK'
        });

        setIsSignedIn(false);
        setShowSignInForm(false);
        setShowCreateAccountForm(false);
        setBookNowButtonActive(false);
        setShowConfirmation(false);
        setShowChangePasswordForm(false);
        setShowDeleteConfirmation(false);
        setShowOtp(true);
      }
    }


  }


  function cancelOtpVerification() {
    setOtpInp({ email: "", otp: "" });
    setForgotOtpVerification(false);
    setShowOtp(false);
  }


  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === 'username' || id === 'password') {
      setSignInData({ ...signInData, [id]: value });
    } else if (id === 'newUsername' || id === 'email' || id === 'newpassword') {
      setCreateAccountData({ ...createAccountData, [id]: value });
    } else if (id === 'newPassword' || id === 'confirmPassword' || id === 'oldPassword') {
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
      confirmPassword: changePasswordData.confirmPassword !== changePasswordData.newPassword,
      oldPassword: !changePasswordData.oldPassword || changePasswordData.newPassword.length <= 0
    };
    setChangePasswordErrors(errors);
    return !errors.newPassword && !errors.confirmPassword && !errors.oldPassword;
  };

  const handleSignIn = async () => {
    if (validateSignIn()) {
      try {

        const res = await signIn(signInData.username, signInData.password);
        

        // Display success SweetAlert2 notification
        MySwal.fire({
          title: 'Success!',
          text: 'Login Succesfully!',
          icon: 'success',
          confirmButtonText: 'OK'
        });

  signInFinal();
        setIsSignedIn(true);
        setShowSignInForm(false);
        setShowCreateAccountForm(false);
        setBookNowButtonActive(true);
        setShowMenu(false);

        setSignInData({ username: '', password: '' })
      }
      catch (err) {
        console.log(err.message);

        setIsSignedIn(false);
        setShowSignInForm(true);
        setShowCreateAccountForm(false);
        setShowMenu(true);
     signOutFinal();

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
        const res = await createAccount(createAccountData.newUsername, createAccountData.email, createAccountData.newpassword);


        // Display success SweetAlert2 notification
        MySwal.fire({
          title: 'Success!',
          text: 'Otp Code send to the email !',
          icon: 'success',
          confirmButtonText: 'OK'
        });

        setCreateAccountData({ newUsername: '', email: '', newpassword: '' })
        setIsSignedIn(false);
        setShowSignInForm(false);
        setShowCreateAccountForm(false);
        setBookNowButtonActive(true);
        setShowMenu(false);
        setShowOtp(true);

      } catch (err) {
        console.log("err.messae" + err.message);
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

        setCreateAccountData({ newUsername: '', email: '', newpassword: '' })

      }
    }
  };


  const handleSignOut = async () => {
    setShowConfirmation(true);





  };

  const confirmSignOut = async () => {
    try {

      const res = await signOut(passwordDeleteAccount.password);


      MySwal.fire({
        title: 'Success!',
        text: 'Logout Succesfully!',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      Cookies.remove('token', { path: '/' });

signOutFinal();
      setIsSignedIn(false);
      setShowSignInForm(false);
      setShowCreateAccountForm(false);
      setBookNowButtonActive(false);
      setShowConfirmation(false);
      setShowChangePasswordForm(false);

      setPasswordDeleteAccount({ password: "" });


    }
    catch (err) {


      if (err.message.includes("Enter the correct password")) {
        MySwal.fire({
          title: 'Error!',
          text: ' Enter the correct password!',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        setShowConfirmation(true);




      }
      else {

        MySwal.fire({
          title: 'Error!',
          text: 'You nead to sign in  first!',
          icon: 'error',
          confirmButtonText: 'OK'
        });

        setIsSignedIn(false);
        setShowSignInForm(false);
        setShowCreateAccountForm(false);
        setBookNowButtonActive(false);
        setShowConfirmation(false);
        setShowChangePasswordForm(false);
        setShowDeleteConfirmation(false);
      }

    }

  };

  const cancelSignOut = () => {
    setShowConfirmation(false);

    setPasswordDeleteAccount({ password: "" });
  };

  const handleDeleteAccount = () => {
    setShowDeleteConfirmation(true);
  };
  // Helper function to get a specific cookie by name
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  // Helper function to delete a specific cookie by name
  function deleteCookie(name) {
    // Set the cookie's expiration date to a past date to delete it
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
  }

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
    setSignInData({ username: '', password: '' })

    setShowCreateAccountForm(false);
    setCreateAccountData({ newUsername: '', email: '', newpassword: '' })

    setShowChangePasswordForm(false);

  };

  const handleBookNowClick = () => {
    setShowMenu(false);
  };
  const cancelDelete = () => {
    setPasswordDeleteAccount({ password: "" });
    setShowDeleteConfirmation(false);
  }


  const handleConfirmPasswordChange = async (e) => {

    setPasswordDeleteAccount(() => {
      return {
        ...passwordDeleteAccount, [e.target.name]: e.target.value
      }
    })

  }


  const handleChangePassword = async () => {

    if (validateChangePassword()) {
      try {
        // const token = getCookie('token'); // Retrieve the token from the cookie

        // Call the changePassword function with the necessary parameters
        const res = await changePassword(changePasswordData.newPassword, changePasswordData.confirmPassword, changePasswordData.oldPassword);



        // Display success notification
        MySwal.fire({
          title: 'Success!',
          text: 'Password Changed Successfully!',
          icon: 'success',
          confirmButtonText: 'OK'
        });

        // Update the state to hide the change password form and reset input fields
        setShowChangePasswordForm(false);
        setChangePasswordData({ newPassword: '', confirmPassword: '', oldPassword: '' });

      } catch (err) {
        console.log(err.message); // Log the error message for debugging

        setChangePasswordData({ newPassword: '', confirmPassword: '', oldPassword: '' });
        if (err.message.includes('Enter all fields')) {
          MySwal.fire({
            title: 'Error!',
            text: 'Enter all fields!',
            icon: 'error',
            confirmButtonText: 'OK'
          });
          setShowChangePasswordForm(true);

        }

        // Display error notification based on the error message

        if (err.message.includes('Enter the correct old password.')) {
          MySwal.fire({
            title: 'Error!',
            text: 'Enter the correct old password!',
            icon: 'error',
            confirmButtonText: 'OK'
          });
          setShowChangePasswordForm(true);
        }
        else {


          MySwal.fire({
            title: 'Error!',
            text: err.message.includes('Both passwords should be same.')
              ? 'Both passwords should be same.'
              : 'You need to sign in first.',
            icon: 'error',
            confirmButtonText: 'OK'
          });

          // Check if the error is due to mismatched passwords
          if (err.message.includes('Both passwords should be same.')) {
            setShowChangePasswordForm(true); // Show the change password form again

          } else {
            setIsSignedIn(false); // Update the signed-in state
            setShowChangePasswordForm(false); // Hide the change password form
            deleteCookie('token'); // Delete the token cookie by its name
            // Reset input fields
            setChangePasswordData({ newPassword: '', confirmPassword: '' });
          }

        }
      }
    }
  };




  const confirmDelete = async () => {
    try {
      const res = await deleteUserAccount(passwordDeleteAccount.password);

      MySwal.fire({
        title: 'Success!',
        text: 'Deleted  Succesfully!',
        icon: 'success',
        confirmButtonText: 'OK'
      });

      setIsSignedIn(false);
      setShowSignInForm(false);
      setShowCreateAccountForm(false);
      setBookNowButtonActive(false);
      setShowConfirmation(false);
      setShowChangePasswordForm(false);
      setShowDeleteConfirmation(false);

      setPasswordDeleteAccount({ password: "" });

    }
    catch (err) {

      if (err.message.includes("Enter the correct password")) {
        MySwal.fire({
          title: 'Error!',
          text: 'Enter the correct password!',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        setPasswordDeleteAccount({ password: "" });

        setShowDeleteConfirmation(true);

      }
      else {
        MySwal.fire({
          title: 'Error!',
          text: 'You nead to login first!',
          icon: 'error',
          confirmButtonText: 'OK'
        });

        setIsSignedIn(false);
        setShowSignInForm(false);
        setShowCreateAccountForm(false);
        setBookNowButtonActive(false);
        setShowConfirmation(false);
        setShowChangePasswordForm(false);
        setShowDeleteConfirmation(false);
        setPasswordDeleteAccount({ password: "" });
      }
    }

  }





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
                  <div className="absolute right-0 top-8 bg-white text-black p-4  lg:w-64 rounded-lg shadow-lg">
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
                <button onClick={handleDeleteAccount} className="flex items-center text-red-600 text-lg">
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
        // <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-gray-800 bg-opacity-75">
        //   <div className="relative bg-white p-6 md:p-8 rounded-lg shadow-xl w-full max-w-md">
        //     {/* Close Icon */}
        //     <button
        //       onClick={handleCloseForm}
        //       className="absolute top-2 right-2 text-gray-600 hover:text-black"
        //     >
        //       <IoClose size={24} />
        //     </button>

        //     {/* Icon and Header */}
        //     <div className="flex flex-col items-center mb-6">
        //       {/* Add a lock icon at the top for visual appeal */}
        //       <IoLockClosed size={40} className="text-purple-700 mb-3" />
        //       <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800">
        //         Sign In
        //       </h2>
        //     </div>

        //     <form
        //       onSubmit={(e) => {
        //         e.preventDefault();
        //         handleSignIn();
        //       }}
        //     >
        //       {/* Username Input */}
        //       <label htmlFor="username" className="block mb-2 text-gray-700 font-medium">
        //         Username:
        //       </label>
        //       <input
        //         type="text"
        //         id="username"
        //         value={signInData.username}
        //         onChange={handleInputChange}
        //         className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
        //         placeholder="Enter your username"
        //       />
        //       {signInErrors.username && (
        //         <p className="text-red-500 text-sm mb-2">Username is required</p>
        //       )}

        //       {/* Password Input */}
        //       <label htmlFor="password" className="block mb-2 text-gray-700 font-medium">
        //         Password:
        //       </label>
        //       <input
        //         type="password"
        //         id="password"
        //         value={signInData.password}
        //         onChange={handleInputChange}
        //         className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
        //         placeholder="Enter your password"
        //       />
        //       {signInErrors.password && (
        //         <p className="text-red-500 text-sm mb-2">Password is required</p>
        //       )}

        //       {/* Sign-In Button */}
        //       <div className="w-full flex justify-center">
        //         <button
        //           type="submit"
        //           className="w-full md:w-auto px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:ring-4 focus:ring-purple-300 transition duration-300"
        //         >
        //           Sign In
        //         </button>
        //       </div>
        //     </form>
        //   </div>
        // </div>

        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-gray-800 bg-opacity-75">
          <div className="relative bg-white p-6 md:p-8 rounded-lg shadow-xl w-full max-w-md">
            {/* Close Icon */}
            <button
              onClick={handleCloseForm}
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
            >
              <IoClose size={24} />
            </button>

            {/* Icon and Header */}
            <div className="flex flex-col items-center mb-6">
              {/* Add a lock icon at the top for visual appeal */}
              <IoLockClosed size={40} className="text-purple-700 mb-3" />
              <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800">
                Sign In
              </h2>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSignIn();
              }}
            >
              {/* Username Input */}
              <label htmlFor="username" className="block mb-2 text-gray-700 font-medium">
                Username:
              </label>
              <input
                type="text"
                id="username"
                value={signInData.username}
                onChange={handleInputChange}
                className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                placeholder="Enter your username"
              />
              {signInErrors.username && (
                <p className="text-red-500 text-sm mb-2">Username is required</p>
              )}

              {/* Password Input */}
              <label htmlFor="password" className="block mb-2 text-gray-700 font-medium">
                Password:
              </label>
              <input
                type="password"
                id="password"
                value={signInData.password}
                onChange={handleInputChange}
                className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                placeholder="Enter your password"
              />
              {signInErrors.password && (
                <p className="text-red-500 text-sm mb-2">Password is required</p>
              )}

              {/* Forgot Password Link */}
              <div className="text-right mb-4">
                <button
                  type="button"
                  onClick={handleForgetPasswordInSignIn}
                  className="text-purple-600 hover:text-purple-800 text-sm focus:outline-none"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Sign-In Button */}
              <div className="w-full flex justify-center">
                <button
                  type="submit"
                  className="w-full md:w-auto px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:ring-4 focus:ring-purple-300 transition duration-300"
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
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-gray-800 bg-opacity-75">
          <div className="relative bg-white p-6 md:p-8 rounded-lg shadow-xl w-full max-w-md">
            {/* Close Icon */}
            <button
              onClick={handleCloseForm}
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
            >
              <IoClose size={24} />
            </button>

            {/* Icon and Header */}
            <div className="flex flex-col items-center mb-6">
              {/* Add a user-plus icon for visual appeal */}
              <IoPersonAdd size={40} className="text-purple-700 mb-3" />
              <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800">
                Create Account
              </h2>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCreateAccount();
              }}
            >
              {/* Username Input */}
              <label htmlFor="newUsername" className="block mb-2 text-gray-700 font-medium">
                Username:
              </label>
              <input
                type="text"
                id="newUsername"
                value={createAccountData.newUsername}
                onChange={handleInputChange}
                className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                placeholder="Enter your username"
              />
              {createAccountErrors.newUsername && (
                <p className="text-red-500 text-sm mb-2">Username is required</p>
              )}

              {/* Email Input */}
              <label htmlFor="email" className="block mb-2 text-gray-700 font-medium">
                Email:
              </label>
              <input
                type="email"
                id="email"
                value={createAccountData.email}
                onChange={handleInputChange}
                className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                placeholder="Enter your email"
              />
              {createAccountErrors.email && (
                <p className="text-red-500 text-sm mb-2">Email is required</p>
              )}

              {/* Password Input */}
              <label htmlFor="newpassword" className="block mb-2 text-gray-700 font-medium">
                Password:
              </label>
              <input
                type="password"
                id="newpassword"
                value={createAccountData.newpassword}
                onChange={handleInputChange}
                className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                placeholder="Enter a password"
              />
              {createAccountErrors.newpassword && (
                <p className="text-red-500 text-sm mb-2">
                  Password must be at least 8 characters
                </p>
              )}

              {/* Create Account Button */}
              <div className="w-full flex justify-center">
                <button
                  type="submit"
                  className="w-full md:w-auto px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:ring-4 focus:ring-purple-300 transition duration-300"
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
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-gray-800 bg-opacity-75">
          <div className="relative bg-white p-6 md:p-8 rounded-lg shadow-xl w-full max-w-md">
            {/* Close Icon */}
            <button
              onClick={handleCloseForm}
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
            >
              <IoClose size={24} />
            </button>

            {/* Icon and Header */}
            <div className="flex flex-col items-center mb-6">
              {/* Add a key icon for visual appeal */}
              <IoKey size={40} className="text-purple-700 mb-3" />
              <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800">
                Change Password
              </h2>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleChangePassword();
              }}
            >
              {/* Old Password Input */}
              <label htmlFor="oldPassword" className="block mb-2 text-gray-700 font-medium">
                Old Password:
              </label>
              <input
                type="password"
                id="oldPassword"
                value={changePasswordData.oldPassword}
                onChange={handleInputChange}
                className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                placeholder="Enter old password"
              />
              {changePasswordErrors.oldPassword && (
                <p className="text-red-500 text-sm mb-2">Enter old password</p>
              )}

              {/* New Password Input */}
              <label htmlFor="newPassword" className="block mb-2 text-gray-700 font-medium">
                New Password:
              </label>
              <input
                type="password"
                id="newPassword"
                value={changePasswordData.newPassword}
                onChange={handleInputChange}
                className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                placeholder="Enter new password"
              />
              {changePasswordErrors.newPassword && (
                <p className="text-red-500 text-sm mb-2">
                  New password must be at least 8 characters
                </p>
              )}

              {/* Confirm Password Input */}
              <label htmlFor="confirmPassword" className="block mb-2 text-gray-700 font-medium">
                Confirm Password:
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={changePasswordData.confirmPassword}
                onChange={handleInputChange}
                className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none"
                placeholder="Confirm new password"
              />
              {changePasswordErrors.confirmPassword && (
                <p className="text-red-500 text-sm mb-2">Passwords do not match</p>
              )}

              {/* Change Password Button */}
              <div className="w-full flex justify-center">
                <button
                  type="submit"
                  className="w-full md:w-auto px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:ring-4 focus:ring-purple-300 transition duration-300"
                >
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}



      {/*  Confirmation Popup  */}
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className="relative bg-white p-4 md:p-6 lg:p-8 rounded-lg shadow-lg w-full max-w-md">
            {/* Close Icon */}
            <button
              onClick={cancelSignOut}
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
            >
              <IoClose size={24} />
            </button>
            {/* Icon and Are You Sure Text */}
            <div className="flex items-center mb-4">
              {/* Add an icon next to the text */}
              <IoAlertCircleOutline size={28} className="text-red-600 mr-2" />
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800">
                Are you sure?
              </h2>
            </div>
            <p className="mb-4 text-gray-600">This action will sign you out.</p>
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <div className="w-full md:flex-1">
                {/* Updated Label Styling */}
                <label htmlFor="password" className="block mb-2 text-lg font-semibold text-black">
                  Enter Password:
                </label>
                <input
                  type="password"
                  name="password"
                  value={passwordDeleteAccount.password}
                  onChange={handleConfirmPasswordChange}
                  placeholder="Enter your password"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="w-full md:w-auto mt-4 md:ml-4 lg:mt-8 md:mt-8 flex-shrink-0">
                <button
                  onClick={confirmSignOut}
                  className="w-full md:w-auto px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* Delete Confirmation Popup */}
      {/* Delete Confirmation Popup */}
      {showDeleteConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-gray-900 bg-opacity-50">
          <div className="relative bg-white p-6 md:p-8 rounded-lg shadow-lg w-full max-w-md">
            {/* Close Icon */}
            <button
              onClick={cancelDelete}
              className="absolute top-3 right-3 text-gray-600 hover:text-black transition-colors duration-200"
            >
              <IoClose size={24} />
            </button>

            {/* Warning Section */}
            <div className="text-center mb-6 flex items-center justify-center">
              <IoWarning size={40} className="text-red-600 mr-3" />
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Confirm Deletion</h2>
                <p className="text-lg text-gray-700">
                  This action will <strong className="text-red-600">permanently delete</strong> your account and all associated data.
                </p>
              </div>
            </div>

            {/* Password Input and Confirm Button */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                confirmDelete();
              }}
            >
              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                  Enter Password:
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={passwordDeleteAccount.password}
                  onChange={handleConfirmPasswordChange}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
                  placeholder="Enter your password"
                />
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-full md:w-auto px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <IoShieldCheckmarkSharp size={20} />
                  <span className="font-semibold">Confirm</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* OTP Verification Popup */}
      {showOtpVerification  && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className="relative bg-white p-4 md:p-6 lg:p-8 rounded-lg shadow-lg w-full max-w-md">

            {/* Close Icon */}
            <button
              onClick={cancelOtpVerification}
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
            >
              <IoClose size={24} />
            </button>

            {/* Header with Icon */}
            <div className="flex items-center justify-center mb-4">
              <IoShieldCheckmarkSharp size={48} className="text-green-500 mr-2" />
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-gray-800" style={{ fontFamily: 'Arial, sans-serif' }}>
                OTP Verification
              </h2>
            </div>

            <p className="text-center text-gray-700 mb-4">
              Please check your email and enter the OTP below.
            </p>

            {/* Email Input */}
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 text-gray-700 font-medium">Email:</label>
              <input
                type="email"
                name="email"
                value={otpInp.email}
                onChange={handleOtpChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-700 focus:outline-none"
                placeholder="Enter your email"
              />
            </div>

            {/* OTP Input */}
            <div className="mb-4">
              <label htmlFor="otp" className="block mb-2 text-gray-700 font-medium">OTP:</label>
              <input
                type="text"
                name="otp"
                value={otpInp.otp}
                onChange={handleOtpChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-700 focus:outline-none"
                placeholder="Enter the OTP"
              />
            </div>

            {/* Submit Button */}
            <div className="w-full flex justify-center mt-6">
              <button
                onClick={handleOtpSubmit}
                className="w-full md:w-auto px-6 py-3 bg-gradient-to-r bg-purple-700  text-white rounded-lg hover:bg-purple-700 focus:ring-4 focus:ring-blue-300 transition duration-300"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* otp for forget password  */}

      {/* OTP Verification Popup */}
      {showForgotOtpVerification && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className="relative bg-white p-4 md:p-6 lg:p-8 rounded-lg shadow-lg w-full max-w-md">

            {/* Close Icon */}
            <button
              onClick={cancelOtpVerification}
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
            >
              <IoClose size={24} />
            </button>

            {/* Header with Icon */}
            <div className="flex items-center justify-center mb-4">
              <IoShieldCheckmarkSharp size={48} className="text-green-500 mr-2" />
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-gray-800" style={{ fontFamily: 'Arial, sans-serif' }}>
                OTP Verification
              </h2>
            </div>

            <p className="text-center text-gray-700 mb-4">
              Please check your email and enter the OTP below.
            </p>

            {/* Email Input */}
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 text-gray-700 font-medium">Email:</label>
              <input
                type="email"
                name="email"
                value={otpInp.email}
                onChange={handleOtpChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-700 focus:outline-none"
                placeholder="Enter your email"
              />
            </div>

            {/* OTP Input */}
            <div className="mb-4">
              <label htmlFor="otp" className="block mb-2 text-gray-700 font-medium">OTP:</label>
              <input
                type="text"
                name="otp"
                value={otpInp.otp}
                onChange={handleOtpChange}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-700 focus:outline-none"
                placeholder="Enter the OTP"
              />
            </div>

            {/* Submit Button */}
            <div className="w-full flex justify-center mt-6">
              <button
                onClick={handleForgetOtpSubmit}
                className="w-full md:w-auto px-6 py-3 bg-gradient-to-r bg-purple-700  text-white rounded-lg hover:bg-purple-700 focus:ring-4 focus:bg-purple-700 transition duration-300"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}


      {/* forget password  */}
      {/* Forgot Password Popup */}
      {showForgotPassword && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className="relative bg-white p-4 md:p-6 lg:p-8 rounded-lg shadow-lg w-full max-w-md">
            {/* Close Icon */}
            <button
              onClick={cancelForgotPassword}
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
            >
              <IoClose size={24} />
            </button>
            {/* Icon and Forgot Password Text */}
            <div className="flex items-center mb-4">
              {/* Add an icon next to the text */}
              <IoMail size={28} className="text-purple-700 mr-2" />
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800">
                Forgot Password
              </h2>
            </div>
            <p className="mb-4 text-gray-600">We will send you an OTP to the provided email.</p>
            <div className="mb-4">
              {/* Email Input */}
              <label htmlFor="email" className="block mb-2 text-lg font-semibold text-black">
                Email:
              </label>
              <input
                type="email"
                name="email"
                value={forgetPassword.email}
                onChange={handleForgetChange}
                placeholder="Enter your email"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mb-4">
              {/* New Password Input */}
              <label htmlFor="newPassword" className="block mb-2 text-lg font-semibold text-black">
                New Password:
              </label>
              <input
                type="password"
                name="newPassword"
                value={forgetPassword.newPassword}
                onChange={handleForgetChange}
                placeholder="Enter your new password"
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              {/* Password Requirement Information */}
              <p className="mt-2 text-sm text-gray-500">
                Password must be at least 8 characters long.
              </p>
            </div>
            <div className="w-full flex justify-center mt-6">
              <button
                onClick={handleForgetSubmit}
                className="w-full md:w-auto px-6 py-3 bg-purple-700 text-white rounded-lg hover:bg-blue-600"
              >
                Reset Password
              </button>
            </div>
          </div>
        </div>
      )}


    </>
  );
}

export default Header;

