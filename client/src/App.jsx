import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './Components/LandingPage'
import Entity from './Components/entity'
import Signup from './Components/Signup'
import Login from './Components/LOGIN.JSX'
import AllEntity from './Components/AllEntity'
import AllUsers from './Components/AllUsers'
import ViewPost from './Components/ViewPost'
import EditProduct from './Components/EditProduct'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage/>}></Route>
        <Route path='/add-entity' element={<Entity/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/all" element={<AllEntity/>}/>
        <Route path="/allusers" element={<AllUsers/>}/>
        <Route path="/viewpost/:id" element={<ViewPost/>}/>
        <Route path="/edit/:id" element={<EditProduct/>} />
      </Routes>
    </>
  )
}

export default App
