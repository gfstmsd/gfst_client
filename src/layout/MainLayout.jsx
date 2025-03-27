
// import React from 'react'
// import SideBar from '../components/Sidebar/SideBar'
// import Navbar from '../components/Navbar/Navbar'
// import Footer from '../components/Footer/Footer'
// import { Outlet, useLocation } from 'react-router-dom'
// import './Layout.css'
// import AdminPanel from '../pages/society/Admin/AdminPanel'
// import { DashboardPath } from '../constants/path.constants'

// const Layout = ({ children }) => {

//   const location = useLocation();
  
//   return (
//     <div className="main__container">
//       <Navbar />
//       <div className={`${location.pathname !== DashboardPath ? 'main_app_container' : 'display_block'}`}>
//         <div className='sidebar__container'>
//           <div>
//             {/* <AdminPanel /> */}
//             <div>
//               {
//                 location.pathname !== DashboardPath && <SideBar />
//               }
//             </div>
//           </div>

//         </div>

//         <div className='main__content'>
//           <Outlet />
//         </div>

//       </div>
//     </div>
//   )
// }

// export default Layout




import React from 'react'
import SideBar from '../components/Sidebar/SideBar'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import { Outlet } from 'react-router-dom'
import './Layout.css'
import AdminPanel from '../pages/society/Admin/AdminPanel'

const Layout = ({ children }) => {
  return (
    <div className="main__container">
      <Navbar />
      <div className='main_app_container'>
        <div className='sidebar__container'>
          <div>
            {/* <AdminPanel /> */}
            <div>
              <SideBar />
           
            </div>
          </div>

        </div>

        <div className='main__content'>
          <Outlet />
          {/* <Footer /> */}
        </div>

      </div>
    </div>
  )
}

export default Layout