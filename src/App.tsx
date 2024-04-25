import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navigation from './Components/Navigation';
import SignUp from './Views/SignUp';
import LogIn from './Views/LogIn';
import Home from './Views/Home';
import Gallery from './Views/Gallery';
import Profile from './Views/Profile';
import './App.css'
import { CategoryType, UserType } from './types';
import AlertMessage from './Components/AlertMessage';

function App() {
  const navigate = useNavigate();

  const [message, setMessage] = useState<string | undefined>(undefined);
  const [category, setCategory] = useState<CategoryType|undefined>(undefined)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(localStorage.getItem('token') ? true : false)
  const [isAdmin, setIsAdmin] = useState<boolean | null>(localStorage.getItem('is_admin') === 'true' ? true : false)
  const [loggedInUser, setLoggedInUser] = useState<Partial<UserType>>({
      email: '',
      first_name: '',
      last_name: '',
      token: '',
      user_id: NaN,
      is_admin: null
  })

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, []);

  const flashMessage = (newMessage:string|undefined, newCategory:CategoryType|undefined) => {
    setMessage(newMessage);
    setCategory(newCategory);
    setTimeout(() => {
        if (newMessage && newCategory){
            flashMessage(undefined, undefined)
        }
    }, 15000)
}

useEffect(() => {
  async function getLoggedInUser(){
    if (isLoggedIn){
      setLoggedInUser({
        email: localStorage.getItem('email')!,
        first_name: localStorage.getItem('first_name')!,
        last_name: localStorage.getItem('last_name')!,
        token: localStorage.getItem('token')!,
        user_id: parseInt(localStorage.getItem('user_id')!),
        is_admin: Boolean(localStorage.getItem('is_admin')!)
      })  
    }
  }
  getLoggedInUser();
}, [isLoggedIn])

const logUserIn = () => {
  setIsLoggedIn(true)
}

const logUserOut = () => {
  setIsLoggedIn(false)
  // localStorage.clear();
  localStorage.removeItem('token');
  localStorage.removeItem('email');
  localStorage.removeItem('first_name');
  localStorage.removeItem('last_name');
  localStorage.removeItem('user_id');
  localStorage.removeItem('is_admin');
  flashMessage('You have been logged out', 'dark');
  setLoggedInUser({
      is_admin: null,
      email: "",
      first_name: "",
      last_name: "",
      token: "",
      user_id: NaN,
  });
  navigate('/login')
}

  return (
    <>
      {isLoggedIn && <Navigation isLoggedIn={isLoggedIn} logUserOut={logUserOut} isAdmin={isAdmin} />}
      {message && <AlertMessage message={message} category={category} flashMessage={flashMessage} />}
      
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/profile" element={<Profile currentUser={loggedInUser} flashMessage={flashMessage}/>} />
          <Route path="/signup" element={<SignUp flashMessage={flashMessage}/>} />
          <Route path="/login" element={<LogIn logUserIn={logUserIn} flashMessage={flashMessage}/>} />
        </Routes>
      </div>
    </>
  )
}

export default App
