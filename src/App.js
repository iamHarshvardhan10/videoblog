import React, { useEffect, useState } from 'react';

import {Routes , Route , useNavigate} from 'react-router-dom'
import Login from './Container/Login';
import Home from './Container/Home';
import { fetchUser, userAccessToken } from './utils/fetchUser';

const App = () => {
  const [user , setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const accessToken = userAccessToken()
    if(!accessToken){
      navigate("/login" , {replace : true})
    }else{
      const [userInfo] = fetchUser()
      setUser(userInfo)
    }
  },[navigate])
  return (
   <Routes>
    <Route path='login' element={<Login />}/>
    <Route path='/*' element={<Home user={user}/>}/>
   </Routes>
  )
}

export default App;