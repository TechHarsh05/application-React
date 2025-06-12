import axios from 'axios';
import { useEffect, useState } from 'react';
import style from './home.module.css';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const API = 'http://localhost:8383/dashboard/get-users';

  const allUsers = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('No token found, redirecting...');
      window.location.href = '/login';
      return;
    }
    

    try {
      const resp = await axios.get(API, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Users Response:', resp);
      setUsers(Array.isArray(resp.data) ? resp.data : []);
    } catch (error) {
      console.error('Error fetching users:', error);
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user')
      }
      if (error.response && error.response.status === 403) {
        alert('Session expired, please log in again');
        localStorage.clear();
        window.location.href = '/login';
      }
    }
  };

  useEffect(() => {
    allUsers();
    // toast.success("users are gettring");
  }, []);

  return (
    users==null?"loading...":
    <div id={style.users}>
      <table id={style.table} border="1">
        <thead>
          <tr>
            <th>Profile</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {users.map((ele) => (
            <tr key={ele.id}>
              <td>
                {ele.userImage && (
                  <img
                    src={`data:image/jpeg;base64,${ele.userImage}`}
                    alt={`${ele.name}'s Profile`}
                    style={{height: 100, width:100, borderRadius:"10%"}}
                  />
                )}
              </td>
              <td>{ele.name}</td>
              <td>{ele.email}</td>
              <td>{ele.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
