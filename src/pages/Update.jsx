import React, { useEffect, useState } from 'react'
import Style from './update.module.css'
import axios from 'axios';

const Update = () => {

  const API = 'http://localhost:8383/dashboard/update-user'
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const userData = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token')
  const user = userData?.user
  // console.log(user);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const formData = new FormData();
    // formData.append("dto", JSON.stringify({ name, email, password, phone }));

    try {
      const payload = {
        id: user.id,
        name: name || user.name,
        email: email || user.email,
        phone: phone || user.phone,
        password: password || user.password // or skip if blank
      };
      
      if (password) {
        payload.password = password;
      }
      const response = await axios.post(API, payload, { headers: { Authorization: `Bearer ${token}` } });

      console.log(response.data);
      if (response.status === 200) {
        alert("Profile updated successfully");
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        window.location.href = '/login'
      }
    } catch (error) {
      console.error("Something went wrong:", error);
      alert("Failed to update profile");
    }
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPhone(user.phone);
    }
  }, []);


  return (
    <>
      <div>
        <div id={Style.updateImage}>
          <img
            src={`data:image/jpeg;base64,${user.userImage}`}
            alt='userImage'
          />
        </div>
      </div>
      <section>
        <div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder={user.name}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder={user.email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}

            />
            <input
              type="password"
              placeholder="new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="number"
              placeholder={user.phone}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              type="submit"
              value="Update Profile"
              disabled={!name || !email || !phone}
              style={{
                backgroundColor: "#3e3ec1",
                color: "white",
                borderRadius: "10px",
                opacity: (!name || !email || !phone) ? 0.6 : 1,
                cursor: (!name || !email || !phone) ? 'not-allowed' : 'pointer'
              }}
            />
          </form>
        </div>
      </section>
    </>
  );
};

export default Update;