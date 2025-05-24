import axios from 'axios';
import React, { useState } from 'react'
import Style from './signup.module.css'

const SignUp = () => {

    // const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [file, setFile] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");

    const handleSubmit = async(e)=>{
        e.preventDefault();

        console.log("File:", file);

        if (!file) {
          alert("Please Select the File");
          return;
        }
        
        console.log({
          // id,
          name,
          email,
          password,
          phone,
          file
        });

        const formData = new FormData();
        formData.append("user", JSON.stringify({name, email, password, phone}));
        formData.append("file", file);

        console.log("Form Data : ", formData);
        
        try {
          
          const response = await axios.post('http://localhost:8383/labour-link/signup', formData);
          
          
          // You can check the response and process it as needed
          console.log("Response:", response.data);

          if (response.status === 200) {
            alert('User created successfully!');
          } else {
            alert('Something went wrong. Please try again.');
          }

        } catch (error) {
          console.error("Error:", error);
          alert('An error occurred during submission.');
        }

    }
  return (
    <div>
        <h2>SignUp</h2>
      <form onSubmit={handleSubmit}>

        <input 
        type="text" 
        placeholder="Enter Your Name"
        value={name}
        autoFocus
        onChange={(e)=>setName(e.target.value)}
        /><br/>
        
        <input 
        type="file"
        onChange={(e)=>setFile(e.target.files[0])}
        /><br/>

        <input
        type="email"
        placeholder="Enter Your Email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        /><br/>

<input
        type="password"
        placeholder="Enter Your Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        /><br/>

        <input
        type="Number"
        placeholder="Enter Your Phone Number"
        value={phone}
        onChange={(e)=>setPhone(e.target.value)}
        /><br/>
        
        <button type="submit">Create User</button>
      </form>
    </div>
  )
}

export default SignUp;
