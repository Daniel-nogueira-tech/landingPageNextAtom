import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';

export const PageContext = React.createContext(null);

export const PageContextProvider = ({ children }) => {
    axios.defaults.withCredentials = true;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;


    const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState(null);
    const [isLogin, setIsLogin] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // check user login
    const getAuthState = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/auth/is-auth`, {
                withCredentials: true,
            });
            if (data.success) {
                setIsLoggedIn(true);
                getUserData();
            }
        } catch (error) {
            console.log(error);
        }
    };

    // get user data
    const getUserData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/user/data`, {
                withCredentials: true,
            });
            if (data.success) {
                setUserData(data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAuthState();
    }, []);

    const contextValue = {
        backendUrl,
        isLoginPopupOpen,
        setIsLoginPopupOpen,
        isLoading,
        setIsLoading,
        userData,
        setUserData,
        getUserData,
        isLogin,
        setIsLogin
    };

    return (
        <>
            <PageContext.Provider value={contextValue}>
                {children}
            </PageContext.Provider>
        </>
    );
};
