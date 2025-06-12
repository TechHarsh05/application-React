import axios from 'axios';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';

const DeleteUser = ({ id }) => {
    const Api = "http://localhost:8383/dashboard/delete-user";

    const deleteUser = async () => {
        const token = localStorage.getItem('token');

        if (!token) {
            console.warn('No token found, redirecting...');
            window.location.href = '/login';
            return;
        }

        // console.log("In deleteUser with ID:", id);

        try {
            const response = await axios.delete(Api, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    },
                data: {
                    id: id,
                },
            });

            console.log(response.data);
            alert("User Deleted");
            localStorage.removeItem('token')
            window.location.href = '/login'
        } catch (error) {
            console.error("Error deleting user:", error);
            alert("Could Not Delete!");
        }
    };

    useEffect(() => {
        deleteUser();
    }, [id]);

    return null; // Since this component just performs a side effect
};

export default DeleteUser;
