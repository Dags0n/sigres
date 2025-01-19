import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from '@mui/material';
import { NavLink } from 'react-router-dom';
import './UserBox.css';

const UserBox = ({ users }) => {
    const handleUserClick = (userId) => {
        // Salva o id do usuário no localStorage
        localStorage.setItem('user-info', userId);
    };

    return (
        <div className="user-counter-box">
            <div className="user-container">
                {users.map((user) => (
                    <div key={user.id} className="user-item">
                        <NavLink
                            key={user.username}
                            to="/users/info" // Mantém a mesma URL base
                            onClick={() => handleUserClick(user.id)} // Salva o id no localStorage antes de navegar
                        >
                            <div className="user-box">
                                <Avatar
                                    alt={user.username}
                                    src=""
                                    sx={{ width: 80, height: 80 }}
                                />
                            </div>
                            <h3>{user.username}</h3>
                        </NavLink>
                    </div>
                ))}
            </div>
        </div>
    );
};

UserBox.propTypes = {
    users: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            username: PropTypes.string.isRequired,
            roles: PropTypes.arrayOf(PropTypes.shape({
                name: PropTypes.string.isRequired,
            })).isRequired,
        })
    ).isRequired,
};

export default UserBox;
