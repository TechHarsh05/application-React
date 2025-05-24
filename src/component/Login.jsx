import axios from 'axios';
import React, { useState } from 'react'

const Login = () => {

  const API = "http://localhost:8383/loggin"
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");

  const handleSubmit = async(e) =>{
    e.preventDefault();

    const formData = new FormData();
formData.append('email', email);
formData.append('password', password);

// axios.post(API, formData)
//      .then(response => {
//          console.log(response.data);
//      })
//      .catch(error => {
//          console.error(error);
//      });

try {
    
      const responce = await axios.post(API, formData);

      console.log(responce.data);
      
      const resp = responce.data

      if (resp.ok) {
        alert("Loggin Successfully")
      }else{
        alert("Try Again")
      }
    } catch (error) {
      console.log("Error :", error);
      
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <input 
      type="text"
      placeholder='Enter Your Email'
      value={email}
      onChange={(e)=>setEmail(e.target.value)}
      autoFocus
      /><br/>

      <input type="text" 
      placeholder='Enter Your Password'
      value={password}
      onChange={(e)=>setPassword(e.target.value)}
      />

      <button type='submit'>Loggin</button>
      </form>

    </div>
  )
}

export default Login;
