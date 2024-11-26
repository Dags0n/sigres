import React from 'react';
import PropTypes from 'prop-types';
import {Avatar} from '@mui/material';
import './UserBox.css'; // CSS opcional

const UserBox = ({ users }) => {
    return (
        <div className="user-counter-box">
            <div className="user-container">
                {users.map((user, index) => (
                    <div key={index}>
                        <div className="user-box">
                            <Avatar alt="User" src="" sx={{ width: 80, height: 80 }} />
                        </div>
                        <h3>{user.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Define as propriedades esperadas do componente
UserBox.propTypes = {
    users: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired
        })
    ).isRequired,
};

// Exporta o componente
export default UserBox;
