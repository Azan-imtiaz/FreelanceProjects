import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import React, { useState } from 'react';
import { FaUser, FaSignInAlt, FaSignOutAlt, FaBars, FaTimes, FaUserCircle, FaTrashAlt, FaKey } from 'react-icons/fa';
import { IoClose } from "react-icons/io5";
import logo from './logo.png'; // Make sure to update the path to your actual logo image
import { createAccount,signIn,changePassword,signOut,deleteUserAccount } from "../Services/apis";




function Header() {

  const MySwal = withReactContent(Swal);


  const [showMenu, setShowMenu] = useState(false);
  const [showSignInForm, setShowSignInForm] = useState(false);
  const [showCreateAccountForm, setShowCreateAccountForm] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);
  const [bookNowButtonActive, setBookNowButtonActive] = useState(false);

  const [signInData, setSignInData] = useState({ username: '', password: '' });
  const [createAccountData, setCreateAccountData] = useState({ newUsername: '', email: '', newpassword: '' });
  const [changePasswordData, setChangePasswordData] = useState({ newPassword: '', confirmPassword: '' ,oldPassword:''});
  const [passwordDeleteAccount, setPasswordDeleteAccount] = useState({password:""});

  const [signInErrors, setSignInErrors] = useState({ username: false, password: false });
  const [createAccountErrors, setCreateAccountErrors] = useState({ newUsername: false, email: false, newpassword: false });
  const [changePasswordErrors, setChangePasswordErrors] = useState({ newPassword: false, confirmPassword: false,oldPassword:false });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === 'username' || id === 'password') {
      setSignInData({ ...signInData, [id]: value });
    } else if (id === 'newUsername' || id === 'email' || id === 'newpassword') {
      setCreateAccountData({ ...createAccountData, [id]: value });
    } else if (id === 'newPassword' || id === 'confirmPassword' || id==='oldPassword') {
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
      oldPassword: !changePasswordData.oldPassword || changePasswordData.newPassword.length <=0
    };
    setChangePasswordErrors(errors);
    return !errors.newPassword && !errors.confirmPassword && !errors.oldPassword;
  };

  const handleSignIn =async() => {
    if (validateSignIn()) {
      try{
        
        const res=await signIn(signInData.username,signInData.password);
  
       
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
        setSignInData({ username: '', password: '' })
      }
    }
  };

  const handleCreateAccount = async () => {
    if (validateCreateAccount()) {
      try {
        const res = await createAccount(createAccountData.newUsername,createAccountData.email, createAccountData.newpassword);
        
  
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
      
setCreateAccountData({ newUsername: '', email: '', newpassword: '' })
       
      }
    }
  };
  

  const handleSignOut = async () => {
     setShowConfirmation(true);

   



  };

  const confirmSignOut = async () => {
    try{

      const res= await signOut(passwordDeleteAccount.password);
      
        
    MySwal.fire({
      title: 'Success!',
      text: 'Logout Succesfully!',
      icon: 'success',
      confirmButtonText: 'OK'
    });
    
    setIsSignedIn(false);
    setShowSignInForm(false);
    setShowCreateAccountForm(false);
    setBookNowButtonActive(false);
    setShowConfirmation(false);
    setShowChangePasswordForm(false);

    setPasswordDeleteAccount({password:""});


    }
    catch(err){
     
     
      if(err.message.includes("Enter the correct password")){
        MySwal.fire({
          title: 'Error!',
          text: ' Enter the correct password!',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        setShowConfirmation(true);


        setPasswordDeleteAccount({password:""});

        
      }
      else{

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
    setShowCreateAccountForm(false);
    setShowChangePasswordForm(false);
  };

  const handleBookNowClick = () => {
    setShowMenu(false);
  };
 const cancelDelete=()=>{
  setShowDeleteConfirmation(false);
 }


const handleConfirmPasswordChange =async(e)=>{
  
setPasswordDeleteAccount(()=>{
  return {
    ...passwordDeleteAccount,[e.target.name]:e.target.value
  }
})

}


const handleChangePassword = async () => {
  
  if (validateChangePassword()) {
    try {
      // const token = getCookie('token'); // Retrieve the token from the cookie
      
      // Call the changePassword function with the necessary parameters
      const res = await changePassword(changePasswordData.newPassword, changePasswordData.confirmPassword,changePasswordData.oldPassword);



      // Display success notification
      MySwal.fire({
        title: 'Success!',
        text: 'Password Changed Successfully!',
        icon: 'success',
        confirmButtonText: 'OK'
      });

      // Update the state to hide the change password form and reset input fields
      setShowChangePasswordForm(false);
      setChangePasswordData({ newPassword: '', confirmPassword: '' ,oldPassword:''});

    } catch (err) {
      console.log(err.message); // Log the error message for debugging

      setChangePasswordData({ newPassword: '', confirmPassword: '' ,oldPassword:''});
      if(err.message.includes('Enter all fields')){
        MySwal.fire({
          title: 'Error!',
          text: 'Enter all fields!',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        setShowChangePasswordForm(true);
 
      }
      
      // Display error notification based on the error message
      
    if( err.message.includes('Enter the correct old password.')){
      MySwal.fire({
        title: 'Error!',
        text: 'Enter the correct old password!',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      setShowChangePasswordForm(true);
    }
   else{

   
    MySwal.fire({
        title: 'Error!',
        text: err.message.includes('Both passwords should be same.')
          ? 'Both passwords should be same.'
          : 'You need to sign in first.',
        icon: 'error',
        confirmButtonText: 'OK'
      });

      // Check if the error is due to mismatched passwords
      if (err.message.includes('Both passwords should be same.')  ) {
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




const confirmDelete=async ()=>{
  try{
    const res= await deleteUserAccount(passwordDeleteAccount.password);
      
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

setPasswordDeleteAccount({password:""});

  }
  catch(err){
   
    if(err.message.includes("Enter the correct password")){
      MySwal.fire({
        title: 'Error!',
        text: 'Enter the correct password!',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      setPasswordDeleteAccount({password:""});
      
    setShowDeleteConfirmation(true); 

    }
    else{
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
  setPasswordDeleteAccount({password:""});   
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
                  <FaTrashAlt className="mr-2"  /> Delete Account
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
  <div className="fixed inset-0 flex items-center justify-center z-50 p-4 ">
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
 <label htmlFor="oldPassword" className="block mb-2">
          Old Password:
        </label>
        <input
          type="password"
          id="oldPassword"
          value={changePasswordData.oldPassword}
          onChange={handleInputChange}
          className="w-full mb-4 p-2 border border-gray-300 rounded-lg"
        />
        {changePasswordErrors.oldPassword && (
          <p className="text-red-500 text-sm mb-2">
           Enter old password
          </p>
        )}


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
      <h2 className="text-lg md:text-xl lg:text-2xl mb-4">Are you sure?</h2>
      <p className="mb-4">This action will  sign you out. </p>
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="w-full md:flex-1 ">
          <label htmlFor="username" className="block mb-2">
            Enter Password:
          </label>
          <input
            type="password"
            name="password"
            value={ passwordDeleteAccount.password }
            onChange={handleConfirmPasswordChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="w-full md:w-auto mt-4  md:ml-4 lg:mt-8 md:mt-8 flex-shrink-0">
          <button
            onClick={confirmSignOut}
            className="w-full md:w-auto px-4 py-2 bg-red-600 text-white rounded-lg"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  </div>
)}




{/* delete confirmation popup*/}
{showDeleteConfirmation && (
  <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
    <div className="relative bg-white p-4 md:p-6 lg:p-8 rounded-lg shadow-lg w-full max-w-md">
      {/* Close Icon */}
      <button
        onClick={cancelDelete}
        className="absolute top-2 right-2 text-gray-600 hover:text-black"
      >
        <IoClose size={24} />
      </button>
      <h2 className="text-lg md:text-xl lg:text-2xl mb-4">Are you sure?</h2>
      <p className="mb-4">This action will delete your account.</p>
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="w-full md:flex-1 ">
          <label htmlFor="username" className="block mb-2">
            Enter Password:
          </label>
          <input
            type="password"
            name="password"
            value={ passwordDeleteAccount.password }
            onChange={handleConfirmPasswordChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="w-full md:w-auto mt-4  md:ml-4 lg:mt-8 md:mt-8 flex-shrink-0">
          <button
            onClick={confirmDelete}
            className="w-full md:w-auto px-4 py-2 bg-red-600 text-white rounded-lg"
          >
            Confirm
          </button>
        </div>
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