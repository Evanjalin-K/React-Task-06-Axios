import axios from "axios";
import { useLoaderData } from "react-router-dom";
import '../css/User.css';
import { useState } from "react";
import UserData from "./UserData";

export const loader = async () => {
    try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users/`);
        return { users: response.data };
    } catch (error) {
        console.error("Failed to fetch users:", error);
        return null;
    }
};


const Users = () => {
    const { users: initialUsers } = useLoaderData();
    const [users, setUsers] = useState(initialUsers);

    const handleAddUser = (newUser) => {
        setUsers([...users, newUser]);
    };

    const handleUpdateUser = async (updatedUser) => {
        try {
            await axios.put(`https://jsonplaceholder.typicode.com/users/${updatedUser.id}`, updatedUser);
            setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
        } catch (error) {
            console.error("Failed to update user:", error);
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            const isConfirmed = window.confirm("Are you sure you want to delete this user?");
            if (isConfirmed) {
                await axios.delete(`https://jsonplaceholder.typicode.com/users/${userId}`);
                setUsers(users.filter(user => user.id !== userId));
            }
        } catch (error) {
            console.error("Failed to delete user:", error);
        }
    };

    return (
        <div>
            <UserData
                users={users}
                handleDeleteUser={handleDeleteUser}
                onAddUser={handleAddUser}
                onUpdateUser={handleUpdateUser}
            />
        </div>
    );
};

export default Users;
