import React, { useState } from 'react'
import './LoginSignup.css'
import axios from 'axios'
import user_icon from '../Assets/person.png'
import email_icon from '../Assets/email.png'
import password_icon from '../Assets/password.png'


export const LoginSignup = () => {
    const [action, setAction] = useState("Log In");
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
  const [password, setPassword] = useState('');
    const handleSignUp = async (event) => {
        event.preventDefault();
        
    
        try {
          const response = await axios.post('http://localhost:8081/authenticate/v1/register', {
            name,
            email,
            password,
          });
          console.log('Registration successful:', response.data);
          const responseJs = response.data;

          sessionStorage.setItem("rk", responseJs.result.randomKey);
          alert("rk : "+ responseJs.result.randomKey)
          // alert("rk : "+ responseJs.result.randomKey)
          // Handle successful login (e.g., save token, redirect user)
        } catch (error) {
          console.error('Error logging in:', error);
          
        } finally {
        }
      };

    const handleLogin = async (event) => {
        event.preventDefault();
        
    
        try {
          const response = await axios.post('https://example.com/api/login', {
            email,
            password,
          });
          console.log('Login successful:', response.data);
          // Handle successful login (e.g., save token, redirect user)
        } catch (error) {
          console.error('Error logging in:', error);
        } finally {
        }
      };




  return (
    <div className='container'>
        <div className="header">
            <div className="text">{action}</div>
            <div className="underline"></div>
        </div>
        <form className="inputs" onSubmit={action==='Log In'?handleLogin: handleSignUp}>
        
            {action==='Log In'?<div></div>:<div className="input">
                <img src={user_icon} alt="" />
                <input type="text" name="" id="" value={name} placeholder='Name' onChange={(i)=> setName(i.target.value)} />
            </div>}
            
            <div className="input">
                <img src={email_icon} alt="" />
                <input type="email" name="" id="" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder='Email/Username'/>
            </div>
            <div className="input">
                <img src={password_icon} alt="" />
                <input type="password" name="" id="" value={password} onChange={(p)=> setPassword(p.target.value)} placeholder='Password'/>
            </div>
        {action==='Sign Up'?<div></div>:<div className="forgot-password">Forgot password? <span>Click Here!</span></div>}
        <div className="submit-container">
            <div className={action==="Log In"?"submit gray":"submit"} onClick={()=> {setAction("Sign Up")}}>Sign Up</div>
            <div className={action==="Sign Up"?"submit gray":"submit"} onClick={()=> {setAction("Log In")}}>Log In</div>
        </div>
        <div className="submit-container-lg">
            <button type='submit' className="submit" >{action}</button>
        </div>
        </form>
    </div>
  )
}
