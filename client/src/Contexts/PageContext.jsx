import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { toast } from "react-toastify";
import { Toast } from 'primereact/toast';

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


    //----------------------------/Comentários do Forum/----------------------------//
    const handleAddPost = async (data) => {

        try {
            const form = new FormData();
            form.append("author", data.author);
            form.append("category", data.category);
            form.append("content", data.content);
            form.append("downvotes", data.downvotes);
            if (data.imageFile) {
                form.append("imageUrl", data.imageFile);
            }
            form.append("tags", data.tags);
            form.append("title", data.title);
            form.append("upvotes", data.upvotes);

            const response = await axios.post(`${backendUrl}/api/forum/add-forum`, form, {
                withCredentials: true,
            });
            if (response.data.success) {
                getAllForumData();
                toast.current.show({
                    severity: 'success',
                    summary: 'success',
                    detail: response.data.message || 'Operação realizada com sucesso!',
                    life: 3000
                });
            } else {
                toast.current.show({
                    severity: 'error',
                    summary: 'error',
                    detail: response.data.message || 'Operação não realizada com sucesso!',
                    life: 3000
                });
            };
        } catch (error) {
            console.log(error);
        }
    };

    // Get All Forum Data
    const [forumData, setForumData] = useState([]);
    const getAllForumData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/forum/get-forum`, {
                withCredentials: true,
            });
            if (data.success) {
                setForumData(data.forumData);
            }
        } catch (error) {
            console.log(error);
        }
    };

    //Add reply user
    const handleAddReplyUser = async (data) => {
        console.log(data);
        try {
            const response = await axios.post(`${backendUrl}/api/forum/add-reply-user`, data, {
                withCredentials: true,
            });
            if (response.data.success) {
                getAllForumData();
                toast.current.show({
                    severity: 'success',
                    summary: 'success',
                    detail: response.data.message || 'Operação realizada com sucesso!',
                    life: 3000
                });
            } else {
                toast.current.show({
                    severity: 'error',
                    summary: 'error',
                    detail: response.data.message || 'Operação não realizada com sucesso!',
                    life: 3000
                });
            };
        } catch (error) {
            console.log(error);
        }
    };

    // update votes
    const handleUpdateVotes = async (data) => {
        console.log(data);
        try {
            const response = await axios.post(`${backendUrl}/api/forum/update-votes`, data, {
                withCredentials: true,
            });
            if (response.data.success) {
                getAllForumData();
                toast.current.show({
                    severity: 'success',
                    summary: 'success',
                    detail: response.data.message || 'Operação realizada com sucesso!',
                    life: 3000
                });
            } else {
                toast.current.show({
                    severity: 'error',
                    summary: 'error',
                    detail: response.data.message || 'Operação não realizada com sucesso!',
                    life: 3000
                });
            };
        } catch (error) {
            console.log(error);
        }
    };
    const [topic, setTopic] = useState(null);
    //handle votes
    const handleUpvote = (e) => {
        const updateData = {
            id: topic?._id || e,
            vote: 'upvote'
        };
        handleUpdateVotes(updateData);
    };
    const handleDownvote = (e) => {
        const updateData = {
            id: topic?._id || e,
            vote: 'downvote'
        };
        handleUpdateVotes(updateData);
    };






    useEffect(() => {
        getAuthState();
        getAllForumData();
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
        setIsLogin,
        handleAddPost,
        forumData,
        getAllForumData,
        handleAddReplyUser,
        handleUpdateVotes,
        handleUpvote,
        handleDownvote,
        topic,
        setTopic
    };

    return (
        <>
            <PageContext.Provider value={contextValue}>
                {children}
            </PageContext.Provider>
        </>
    );
};
