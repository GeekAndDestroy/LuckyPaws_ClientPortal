import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Navigation from './Components/Navigation';
import SignUp from './Views/SignUp';
import LogIn from './Views/LogIn';
import Home from './Views/Home';
import Gallery from './Views/Gallery';
import Profile from './Views/Profile';

import './App.css'

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <>
      {isLoggedIn && <Navigation />}
      <SignUp />
      {/* <LogIn /> */}
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </>
  )
}

export default App
