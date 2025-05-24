import axios from 'axios'
import React, { useEffect, useState } from 'react'
import style from './home.module.css';

const HomePage = () => {

    const [users, setUsers = (Array.isArray(resp.data) ? resp.data : [])] = useState([]);

    let API = 'http://localhost:8383/labour-link/get-user';

    const allUsers = async () => {
        try {
            const resp = await axios.get(API);
            console.log(resp);
            setUsers(Array.isArray(resp.data) ? resp.data : []);
        } catch (error) {
            console.error("Error fetching users:", error);
            setUsers([]);
        }
    };


    useEffect(() => {
        allUsers();
    }, []);

    return (
        <div id={style.users}>
            <h1>Users</h1>
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
                    {users.map((ele, i) => (
                        <tr key={ele.id}>
                            <td>
                                {ele.userImage && (
                                    <img
                                        src={`data:image/jpeg;base64,${ele.userImage}`}
                                        alt={`${ele.name}'s Profile`}
                                        width="100"
                                        height="100"
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

}

export default HomePage
