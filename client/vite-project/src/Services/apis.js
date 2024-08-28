// api.js
const API_BASE_URL = 'http://localhost:3000'; // Replace with your actual API base URL

export const signIn = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, password }),
    });
    if (!response.ok) {
      const errorData = await response.json(); // Parse the error response JSON
      
      console.log("errorData"+errorData)
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
      
      console.log("errorData"+errorData)
      throw new Error(errorData.message || 'Invalid email or password'); // Use the server-provided message or a default message
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating account:', error);
    throw error; // Rethrow the error to handle it in the calling function
  }
};
export const changePassword = async (newPassword) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/change-password`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ newPassword }),
    });
    if (!response.ok) {
      const errorData = await response.json(); // Parse the error response JSON
      
      console.log("errorData"+errorData)
      throw new Error(errorData.message); // Use the server-provided message or a default message
    }
    return await response.json();

  } catch (error) {
    console.error('Error changing password:', error);
    throw error;
  }
};

export const signOut = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/signout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) throw new Error('Sign Out failed');
    return await response.json();
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};


export const deleteUserAccount 
= async (password) => {
       try {
         const response = await fetch(`${API_BASE_URL}/api/delete-account`, {
           method: 'DELETE',
           headers: {
             'Content-Type': 'application/json',
           },
           body: JSON.stringify({ password }), // Send the password in the request body
         });
         if (!response.ok) throw new Error('Account deletion failed');
         return await response.json();
       } catch (error) {
         console.error('Error deleting account:', error);
         throw error;
       }
     };