// Simulated authentication service
const AuthService = {
    login: (username, password) => {
      // Simulated login logic - Replace with actual authentication logic
      return new Promise((resolve, reject) => {
        // Simulated check - replace with actual API call or authentication logic
        if (username === 'example' && password === 'password') {
          resolve(true); // Authentication success
        } else {
          reject(new Error('Invalid credentials')); // Authentication failure
        }
      });
    },
  };
  
  export default AuthService;
  