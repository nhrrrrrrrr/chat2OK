/* eslint-disable react/prop-types */
import { Outlet } from "react-router-dom"
import DashboardSideBar from "../../components/dashboard/DashboardSideBar"
function DashboardPage() {
    return (
        <div className=' bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0  text-black min-h-screen  w-full flex'>
        <div className="fixed left-0 top-0 h-ful">
      
      <DashboardSideBar  />
            </div>
            
        <Outlet/>
        </div>
        
    )
}

export default DashboardPage
