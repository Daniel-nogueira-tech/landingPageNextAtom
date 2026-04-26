import React from 'react';
import './ResetPassword.css';

const ResetPassword = () => {
    return (
        <div>
            <h1>Reset Password</h1>
            <form>
                <input type="email" placeholder="Email" />
                <button type="submit">Reset Password</button>
            </form>
        </div>
    );
};

export default ResetPassword;