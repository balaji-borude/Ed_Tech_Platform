import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home';
import Navbar from './components/common/Navbar';
import OpenRoute from './components/core/Auth/OpenRoute'
import Signup from './pages/Signup';
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword';
import UpdatePassword from './pages/UpdatePassword';
import VerifyEmail from './pages/VerifyEmail';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import MyProfile from './components/core/Dashboard/MyProfile';
import PrivateRoute from './components/core/Auth/PrivateRoute';
import Error from './pages/Error';


const App = () => {
  return (
    <div className='w-screen min-h-screen bg-richblack-900 flex flex-col font-inter'>
      <Navbar/>

      <Routes>

        <Route path="/" element={<Home/>}/>
        
        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />

        {/* openroute ==> je pn NOn logged in user ahe na te ya path la acces karu shaktat fakt  */}
       <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
       
        <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />
        <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword/>
            </OpenRoute>
          }
        />
        <Route
          path="/verify-email"
          element={
            <OpenRoute>
              <VerifyEmail/>
            </OpenRoute>
          }
        />
          
          <Route path='/about' element={<About/>} />
          
        <Route
          path="/about"
          element={
            <OpenRoute>
              <About/>
            </OpenRoute>
          }
        />

          {/* contact form page  */}
        {/* <Route path='/contact' element={<Contact/>} /> */}

        {/* after login wala route */}
        {/* <Route
          path="/dasboard/my-profile"
          element={
            <OpenRoute>
              <Dashboard/>
            </OpenRoute>
          }
        /> */}
        <Route
          element={
            <PrivateRoute>
              <Dashboard/>
            </PrivateRoute>
          }

        >
         <Route path='dasboard/my-profile' element={<MyProfile/>}/>

        </Route>




         {/* if Page is not found */}
        <Route path='*' element={<Error/>} />
        
      </Routes>

    </div>
  )
}

export default App