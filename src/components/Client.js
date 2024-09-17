import React, { useEffect, useState } from 'react';
import Avatar from 'react-avatar';

const Client = ({ username }) => {
    const [isWindowActive, setIsWindowActive] = useState(true);

    useEffect(() => {
        const handleFocus = () => {
            setIsWindowActive(true);
            console.log('Window has focus');
        };

        const handleBlur = () => {
            setIsWindowActive(false);
            console.log('Window lost focus');
        };

        window.addEventListener('focus', handleFocus);
        window.addEventListener('blur', handleBlur);

        // Cleanup event listeners on component unmount
        return () => {
            window.removeEventListener('focus', handleFocus);
            window.removeEventListener('blur', handleBlur);
        };
    }, []);

    return (
        <div className='client'>
            <div className='avatarWrapper'>
                <Avatar name={username} size={50} round='14px' />
                <span className={`statusDot ${isWindowActive ? 'online' : 'offline'}`}></span>
            </div>
            <span className='userName'>{username}</span>
        </div>
    );
}

export default Client;
