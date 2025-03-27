// import React, { useState } from 'react';
// import './App.css';
// import SideBar from './components/Sidebar/SideBar';
// import Footer from './components/Footer/Footer';
// import Navbar from './components/Navbar/Navbar';
// import api from './api';

// function App() {
//   const [isAuthenticated,  ] = useState(false);
//   // const [username, setUsername] = useState('');
//   // const [password, setPassword] = useState('');
//   // const [isLoading, setIsLoading] = useState(false);


//   const handleLogout = () => {
//     setIsAuthenticated(false);
//     setUsername('');
//     setPassword('');
//   };

//   if (isAuthenticated) {
//     return (
//       <div className="authenticated-container">
//         <Navbar handleLogout={handleLogout} />
//         <div className="main-content">
//           <SideBar />
//           <Footer />
//         </div>
//       </div>
//     );
//   } else {
//     return (
//       // <div className="login-container">
//       //   <div className="background"></div>
//       //   <div className="card">
//       //     <img className="logo" src={Logo} alt="Logo" />
//       //     <h2>Welcome🫡</h2>
//       //     <h3>Youth Supportive Society</h3>
//       //     <br />
//       //     <form className="form" onSubmit={verifyAdmin}>
//       //       <input
//       //         type="text"
//       //         placeholder="Enter Username"
//       //         value={username}
//       //         onChange={(e) => setUsername(e.target.value)}
//       //         required
//       //       />
//       //       <input
//       //         type="password"
//       //         placeholder="Enter Password"
//       //         value={password}
//       //         onChange={(e) => setPassword(e.target.value)}
//       //         required
//       //       />
//       //       {
//       //         isLoading? <div>Loading ...</div> : (
//       //           <button type="submit">Sign In</button>
//       //         )
//       //       }
            
//       //     </form>
//       //     <footer>
//       //       Forget User ID & Password <a href="#" onClick={handleSendCredentials}>Click me</a><br /><br />
//       //       Need an account? Sign up <a href="#">here</a>
//       //     </footer>
//       //   </div>
//       // </div>
//       <>kdnfvjk</>
//     );
//   }
  
// }

// export default App;



import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './Route/Routing'
import { ToastContainer } from "react-toastify";
import './App.css'

const App = () => {
  return (
    <>
    <ToastContainer />
    <RouterProvider router={router} />
    </>
  )
}

export default App






