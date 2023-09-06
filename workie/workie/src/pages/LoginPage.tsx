import React from 'react'
import LoginWraps from './LoginWraps';
import './LoginPage.scss'

function LoginPage() {
  return (
    <div >
        <div className='wrapsLogin'>
        <img className='imgTitile' src="images/ant-white.png" alt="not exist" />
       <h1 className='title'>Workie</h1>
       <LoginWraps/>
        </div>
    
        <img className='imgLogin' src='images/imgLogin.jpg' alt="not exist" />
    </div>
  )
}

export default LoginPage;
