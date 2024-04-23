import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import { themeChange } from 'theme-change'
import Navigation from './Components/Navigation';
import SignUp from './Views/SignUp';
import LogIn from './Views/LogIn';
import Home from './Views/Home';
import Gallery from './Views/Gallery';
import Profile from './Views/Profile';

import './App.css'

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(true)


  return (
    <>
      {isLoggedIn && <Navigation />}

      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
        </Routes>
      </div>
    </>
  )
}

export default App
