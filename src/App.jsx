import { Fragment, useRef, useState } from 'react'
import LoginPage from './pages/login/LoginPage'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import { Transition } from "@headlessui/react";
import Navbar from './components/Navbar';
import clsx from "clsx"
import { IoClose } from "react-icons/io5";

export function Layout() {
  const { user } = useSelector((state) => state.auth);

  const location = useLocation();

  return user ? (
    <div className="w-full h-screen flex flex-col md:flex-row">
      <div className="w-1/5 h-screen bg-white sticky top-0 hidden md:block">
        <Sidebar />
      </div>
       <MobileSideBar/>
      <div className="flex-1 overflow-y-auto">
        <Navbar />
        <div className="p-4 2xl:px-10 ">
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="login" state={{ from: location }} replace />
  );
}

const MobileSideBar = () => {
  const { isSidebarOpen } = useSelector((state) => state.auth);
  const mobileMenuRef = useRef(null);
  const dispatch = useDispatch();

  const closeSideBar = () => {
    dispatch(setOpenSidebar(false));
  };

  return (
    <>
      <Transition
        show={isSidebarOpen}
        as={Fragment}
        enter='transition-opacity duration-700'
        enterFrom='opacity-x-10'
        enterTo='opacity-x-100'
        leave='transition-opacity duration-700'
        leaveFrom='opacity-x-100'
        leaveTo='opacity-x-0'
      >
        {(ref) => (
          <div
            ref={(node) => (mobileMenuRef.current = node)}
            className={clsx(
              "md:hidden w-full h-full bg-black/40 transition-all duration-700 transform",
              isSidebarOpen ? "translate-x-0" : "translate-x-full")}
              onClick={()=> closeSideBar()}
          >

           <div className="bg-white w-3/4 h-full">
              <div className="w-full flex justify-end px-5 mt-5">
                  <button
                  onClick={()=> closeSideBar()}
                  className="flex justify-end pt-4 items-end">
                      <IoClose size={25}/>
                  </button>
              </div>
                <div className="-mt-8">
                  <Sidebar/>
                </div>
           </div>
          </div>
        )}
      </Transition>
    </>
  );
};
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <main className="w-full min-h-screen bg-[#f3f4f6]">

       <LoginPage/>
      </main>
    </>
  )
}

export default App
