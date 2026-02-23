import React, { useState } from 'react';

export const PageContext = React.createContext(null);

export const PageContextProvider = ({ children }) => {

    const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
    console.log("islogin>", isLoginPopupOpen);


    const contextValue = {
        isLoginPopupOpen,
        setIsLoginPopupOpen
    };

    return (
        <PageContext.Provider value={contextValue}>
            {children}
        </PageContext.Provider>
    );
};
