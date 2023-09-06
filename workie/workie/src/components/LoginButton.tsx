import React from 'react'
import './LoginButton.scss'
import { Link } from 'react-router-dom'
import axios from 'axios';

function LoginButton() {
  // const fetchJob = async () => {
  //   try {
  //     console.log("bb")
  //     const response = await axios.post(`/api/v1/conversation`,{ "receiver_id":"649816ef76be5e9275b806cd"});
  //     console.log(response.data);
      
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
 
  return (
    <div className='login'>
    {/* <button onClick={fetchJob}>cc</button> */}
    <Link to="/LoginPage">
      <button className='login__Button  '>
        Log In
      </button>
      </Link>

    </div>




  )
}

export default LoginButton
