import axios from 'axios';
import React, { useEffect, useState } from 'react'

const User = () => {
    const Api = "http://localhost:8383/dashboard/delete-user";
    // const user = JSON.parse(localStorage.getItem('user'));
    //       const username = user?.username;
    const [id, setId] = useState(0);

    const deleteUser = async () =>{
        const response = await axios.post(Api, id);

        if (response.status == 200 && response.data!=null) {
            console.log(response.data);
        }
    }

    useEffect(()=>{
        deleteUser();
    },[])

  return (
    <div>
        
      {/* <h1>{username}</h1> */}
    </div>
  )
}

export default User
