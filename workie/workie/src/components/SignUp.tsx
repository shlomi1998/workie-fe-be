import React from 'react'
import './SignUp.scss'
import { Link } from "react-router-dom"

function SignUp() {
  return (
    <div className='signUp'>
      <p className='signUp__p'>Don't have an account? </p>
       <Link className='SignUpLink' to="/enrollment">Sign up</Link> 
    </div>
  )
}

export default SignUp
