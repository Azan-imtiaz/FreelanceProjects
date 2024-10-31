const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// api.js
// const API_BASE_URL = 'https://comforttrips.co.uk:3004'; // Replace with your actual API base URL
//  const API_BASE_URL = 'http://localhost:9001'; // Replace with your actual API base URL

// const API_BASE_URL=process.env.API_BASE_URL;
export const signIn = async (email, password) => {
  try {
    console.log(API_BASE_URL);
    const response = await fetch(`${API_BASE_URL}/api/signin`, {
      method: 'POST', credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      const errorData = await response.json(); // Parse the error response JSON

      console.log("errorData" + errorData)
      throw new Error(errorData.message || 'Account creation failed'); // Use the server-provided message or a default message
    }
    return await response.json();
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};
export const createAccount = async (newUsername, email, newpassword) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/create-account`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ newUsername, email, newpassword }),
    });

    // Check if response is not ok (e.g., status is not 2xx)
    if (!response.ok) {
      const errorData = await response.json(); // Parse the error response JSON

      console.log("errorData" + errorData)
      throw new Error(errorData.message || 'Invalid email or password'); // Use the server-provided message or a default message
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating account:', error);
    throw error; // Rethrow the error to handle it in the calling function
  }
};
export const changePassword = async (confirmPassword, newPassword, oldPassword) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/change-password`, {
      method: 'PUT',credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ confirmPassword, newPassword, oldPassword}),
    });
    if (!response.ok) {
      const errorData = await response.json(); // Parse the error response JSON


      throw new Error(errorData.message); // Use the server-provided message or a default message
    }
    return await response.json();

  } catch (error) {
    
    throw error;
  }
};

export const signOut = async (password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/signout`, {
      method: 'POST',credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({password}),
  

    });
    if (!response.ok) {
      const errorData = await response.json(); // Parse the error response JSON


      throw new Error(errorData.message); // Use the server-provided message or a default message
    }
    return await response.json();
  } catch (error) {

    throw error;
  }
};


export const deleteUserAccount
  = async (password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/delete-account`, {
        method: 'DELETE',credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({password}), // Send the password in the request body
      });
      if (!response.ok) {
        const errorData = await response.json(); // Parse the error response JSON
  
  
        throw new Error(errorData.message); // Use the server-provided message or a default message
      }
      return await response.json();
    } catch (error) {
     
      throw error;
    }
  };







  
export const verifyOTPFunc
= async (email,otp) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/verifyOtp`, {
      method: 'POST',credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email,otp}), // Send the password in the request body
    });
    if (!response.ok) {
      const errorData = await response.json(); // Parse the error response JSON


      throw new Error(errorData.message); // Use the server-provided message or a default message
    }
    return await response.json();
  } catch (error) {
   
    throw error;
  }
};



export const  forgetPaswordFunc = async (email,newPassword) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/forgetPassword`, {
      method: 'POST',credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email,newPassword}),
    });
    if (!response.ok) {
      const errorData = await response.json(); // Parse the error response JSON


      throw new Error(errorData.message); // Use the server-provided message or a default message
    }
    return await response.json();

  } catch (error) {
    
    throw error;
  }
};



export const resetPasword = async (email,otp) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/resetPasword`, {
      method: 'POST',credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email,otp}),
    });
    if (!response.ok) {
      const errorData = await response.json(); // Parse the error response JSON


      throw new Error(errorData.message); // Use the server-provided message or a default message
    }
    return await response.json();

  } catch (error) {
    
    throw error;
  }
};





export const verifyTokenAtStart = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/verifyTokenAtStart`, {
      method: 'POST',credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });
    if (!response.ok) {
      const errorData = await response.json(); // Parse the error response JSON


      throw new Error(errorData.message); // Use the server-provided message or a default message
    }
    return await response.json();

  } catch (error) {
    
    throw error;
  }
};


export const fetchDataPricing = async (toPostalCode,fromPostalCode) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/dataFile`, {
      method: 'POST',credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({toPostalCode,fromPostalCode}),
  

    });
    if (!response.ok) {
      const errorData = await response.json(); // Parse the error response JSON


      throw new Error(errorData.message); // Use the server-provided message or a default message
    }
    return await response.json();
  } catch (error) {

    throw error;
  }
};


