import { useEffect, useState, useContext } from 'react';

import { UserContext } from '../../contexts/UserContext';

import * as userService from '../../services/userService';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [ users, setUsers ] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await userService.index();
        setUsers(fetchedUsers);
      } catch (err) {
        console.log(err)
      }
    }
    if (user) fetchUsers();
  }, [user]);

  return (
 <main className="dashboard-container">
      <div className="dashboard-header">
        <h1>👋 Welcome, {user.username}!</h1>
        <p>Here’s a list of all users in the community:</p>
      </div>

      <section className="user-list">
        {users.length > 0 ? (
          <ul>
            {users.map((u) => (
              <li key={u._id} className="user-card">
                <span className="avatar">{u.username.charAt(0).toUpperCase()}</span>
                <p>{u.username}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-users">No users found.</p>
        )}
      </section>
    </main>
  );
};

export default Dashboard;
