import axios from 'axios';
import { useEffect, useState } from 'react';
import style from './home.module.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

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

  const navigate = useNavigate();

  const handleClick = (user) => {
    navigate('/dashboard/user', { state: { user } });
  };

  return (
    users == null ? "loading..." :
      <>
        <section
          style={{
            display: 'flex',
            overflowX: 'auto',
            padding: '10px',
            gap: '16px',
            scrollBehavior: 'smooth',
          }}
        // onClick={handleClick}
        >
          {users.map((ele) => (
            <div
              key={ele.id}
              onClick={() => handleClick(ele)} // <-- pass user object here
              style={{
                cursor: 'pointer',
                minWidth: '150px',
                border: '1px solid #ccc',
                borderRadius: '10px',
                padding: '10px',
                textAlign: 'center',
                backgroundColor: '#f9f9f9',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                flexShrink: 0,
              }}
            >

              {
              ele.userImage && (
                <div id={style.userData}>

                  <img
                    src={`data:image/jpeg;base64,${ele.userImage}`}
                    alt={`${ele.name}'s Profile`}
                    style={{
                      height: '100px',
                      width: '100px',
                      borderRadius: '10%',
                      objectFit: 'cover',
                      marginBottom: '10px',
                    }}
                  />
                </div>
              )
            }
            < div > { ele.name }</div>
      </div >
          ))}
        </section >

      </>


      // <div id={style.users}>
      //   <table id={style.table} border="1">
      //     <thead>
      //       <tr>
      //         <th>Profile</th>
      //         <th>Name</th>
      //         <th>Email</th>
      //         <th>Phone</th>
      //       </tr>
      //     </thead>
      //     <tbody>
      //       {users.map((ele) => (
      //         <tr key={ele.id}>
      //           <td>
      //           <div id={style.userData}>
      //             {ele.userImage && (
      //               <img
      //               src={`data:image/jpeg;base64,${ele.userImage}`}
      //               alt={`${ele.name}'s Profile`}
      //               style={{height:"100px", width:"100px", borderRadius:"10%"}}
      //               />
      //             )}
      //             </div>
      //           </td>
      //           <td>{ele.name}</td>
      //           <td>{ele.email}</td>
      //           <td>{ele.phone}</td>
      //         </tr>
      //       ))}
      //     </tbody>
      //   </table>
      // </div>
  );
};

export default Dashboard;
