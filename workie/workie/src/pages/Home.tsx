import React from 'react'
import Navbar from '../components/Navbar'
import HomeTitle from '../components/HomeTitle'
import './Home.scss'
import Welcome from '../components/Welcome'
import LoginButton from '../components/LoginButton'
import SignUp from '../components/SignUp'
import { Link } from 'react-router-dom'


function Home() {
  return (
    <div >
      <Navbar/>
      <HomeTitle/>
      <div className='wraps' >
      <img className='wraps__homeImg' src='images/homeImg.jpg'/>
        </div>
        <Welcome/>
        <LoginButton/>
        <SignUp/>
    

       </div>
      
  )
}

export default Home
