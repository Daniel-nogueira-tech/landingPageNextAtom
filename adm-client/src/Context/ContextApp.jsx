import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

export const ContextApp = createContext();
axios.defaults.withCredentials = true;
const Url = import.meta.env.VITE_BACKEND_URL;

export const ContextAppProvider = ({ children }) => {
    const [contents, setContents] = useState([]);
    const [isLogin, setIsLogin] = useState(false);
    const navigate = useNavigate();
    const pathname = useLocation().pathname;

    // Toast
    const [toastMsg, setToastMsg] = useState(null);
    const showToast = (msg) => {
        setToastMsg(msg);
        setTimeout(() => setToastMsg(null), 5000);
    };


    //--------------------------/verificar se o admin está autenticado/--------------------------/

    // verificar se o admin está autenticado
    const publicRoutes = ["/forgot-password", "/email-verify-admin", "/login", "/invitation-admin"];

    const checkAuth = async () => {
        // 🔓 libera rotas públicas
        if (publicRoutes.includes(pathname)) {
            return;
        }
        try {
            const response = await axios.post(
                `${Url}/api/authAdmin/is-admin-authenticated`,
                {},
                { withCredentials: true }
            );

            if (!response.data.success && !publicRoutes[2].includes(pathname)) {
                navigate("/login");
            } else {
                setIsLogin(true);
            }
        } catch (error) {
            // aqui cai quando token expirou ou é inválido
            navigate("/login");
        }
    };


    //--------------------------/conteúdos de aprendizado/--------------------------/

    // pegar todos os conteúdos de aprendizado
    const getLearningContent = async () => {
        try {
            const response = await axios.get(`${Url}/api/learning-content/getLearningContent`);
            if (response.data.success) {
                setContents(response.data.learningContent);
            }
        } catch (error) {
            toast.error(error.response.data.message);
            console.error('Error fetching learning content:', error);
        }
    };

    // remover conteúdo de aprendizado
    const deleteLearningContent = async (id) => {
        if (!id) {
            return;
        }
        if (!confirm("Tem certeza que deseja deletar este conteúdo?")) {
            return;
        }
        try {
            const response = await axios.delete(`${Url}/api/learning-content/deleteLearningContent`, { data: { id } });
            if (response.data.success) {
                setContents(response.data.learningContent);
            }
            toast.success(response.data.message);
            getLearningContent();
        } catch (error) {
            console.error('Error fetching learning content:', error);
        }
    };

    // editar conteúdo de aprendizado
    const editLearningContent = async (item) => {
        if (!item._id) {
            return;
        }
        const payload = {
            id: item._id,
            iconName: item.iconName,
            title: item.title,
            desc: item.desc,
            content: item.content,
            videoUrl: item.videoUrl,
            imageUrl: item.imageUrl
        }
        try {
            const response = await axios.put(`${Url}/api/learning-content/updateLearningContent`, payload);
            if (response.data.success) {
                setContents(response.data.learningContent);
            }
            toast.success(response.data.message);
            getLearningContent();
        } catch (error) {
            toast.error(error.response.data.message);
            console.error('Error fetching learning content:', error);
        }
    };

    // Edita o conteúdo
    const addLearningContent = async (item) => {
        try {
            const response = await axios.post(`${Url}/api/learning-content/createLearningContent`, {
                iconName: item.iconName,
                title: item.title,
                desc: item.desc,
                videoUrl: item.videoUrl,
                imageUrl: item.imageUrl,
                content: item.content
            })

            toast.success(response.data.message);
            setTimeout(() => {
                navigate('/learning-content');
            }, 1500);
        } catch (error) {
            console.error('Erro ao atualizar conteúdo:', error);
            toast.error(error.response.data.message);
        }
    };

    //--------------------------/noticias/--------------------------/

    const [newsContent, setNewsContent] = useState([]);

    // pegar todas as noticias
    const getNewsContent = async () => {
        try {
            const response = await axios.get(`${Url}/api/news-content/getNewsContent`);
            if (response.data.success) {
                setNewsContent(response.data.newsContent);
            }
        } catch (error) {
            toast.error(error.response.data.message);
            console.error('Error fetching news content:', error);
        }
    }

    // remover noticia
    const deleteNewsContent = async (id) => {
        if (!id) {
            return;
        }
        if (!confirm("Tem certeza que deseja deletar esta notícia?")) {
            return;
        }
        try {
            const response = await axios.delete(`${Url}/api/news-content/deleteNewsContent`, { data: { id } });
            if (response.data.success) {
                setNewsContent(response.data.newsContent);
            }
            toast.success(response.data.message);
            getNewsContent();
        } catch (error) {
            console.error('Error fetching news content:', error);
        }
    };

    // editar noticia
    const editNewsContent = async (item) => {
        if (!item._id) {
            return;
        }
        const payload = {
            id: item._id,
            slug: item.slug,
            image: item.image,
            category: item.category,
            title: item.title,
            date: item.date,
            author: item.author,
            content: item.content
        }
        try {
            const response = await axios.put(`${Url}/api/news-content/updateNewsContent`, payload);
            if (response.data.success) {
                setNewsContent(response.data.newsContent);
            }
            toast.success(response.data.message);
            getNewsContent();
        } catch (error) {
            toast.error(error.response.data.message);
            console.error('Error fetching news content:', error);
        }
    };

    // Edita o conteúdo
    const addNewsContent = async (item) => {
        try {
            const response = await axios.post(`${Url}/api/news-content/createNewsContent`, {
                slug: item.slug,
                image: item.image,
                category: item.category,
                title: item.title,
                date: item.date,
                author: item.author,
                content: item.content
            })

            toast.success(response.data.message);
            setTimeout(() => {
                navigate('/manage-news');
            }, 1500);
        } catch (error) {
            console.error('Erro ao atualizar conteúdo:', error);
            toast.error(error.response.data.message);
        }
    };

    //--------------------------/fórum/--------------------------/

    const [forumContent, setForumContent] = useState([]);

    // pegar todos os fóruns
    const getForumContent = async () => {
        try {
            const response = await axios.get(`${Url}/api/forum/get-forum-management`);
            if (response.data.success) {
                setForumContent(response.data.forumData);
            }
        } catch (error) {
            console.error('Error fetching forum content:', error.response.data.message);
        }
    };

    // Remover post e comentarios
    const deleteForumContent = async (commentId, postId, replyId, replyReplyId) => {

        if (!confirm("Tem certeza que deseja deletar este fórum?")) {
            return;
        }
        try {
            const response = await axios.delete(`${Url}/api/forum/delete-comment-management`, { data: { commentId, postId, replyId, replyReplyId } });
            if (response.data.success) {
                setForumContent(response.data.forumData);
            }
            toast.success(response.data.message);
            getForumContent();
        } catch (error) {
            console.error('Error fetching forum content:', error);
        }
    };

    // editar fórum
    const editForumContent = async (id, isVerified) => {
        if (!id) {
            return;
        }
        if (isVerified === true) {
            isVerified = false;
        } else {
            isVerified = true;
        }

        const isPinned = false;
        const payload = {
            id: id,
            isVerified: isVerified,
            isPinned: isPinned,
        };
        try {
            const response = await axios.put(`${Url}/api/forum/update-forum-management`, payload);
            if (response.data.success) {
                setForumContent(response.data.forumData);
            }
            toast.success(response.data.message);
            getForumContent();
        } catch (error) {
            toast.error(error.response.data.message);
            console.error('Error fetching forum content:', error);
        }
    };

    // adcionar comentario
    const addReplyForum = async (postId, commentId, replyId, data) => {

        if (!postId || !data?.content || !data?.author) {
            return;
        }

        const payload = {
            postId,
            commentId: commentId || null,
            replyId: replyId || null,
            author: data.author,
            content: data.content,
            date: data.date || new Date(),
            isAdmin: data.isAdmin || false
        };


        try {
            const response = await axios.post(
                `${Url}/api/forum/add-reply-management`,
                payload
            );

            if (response.data.success) {
                setForumContent(response.data.forumData);
            }

            toast.success(response.data.message);
            getForumContent();

        } catch (error) {
            toast.error(error.response?.data?.message);
            console.error(error);
        }
    };


    //--------------------------/usuários/--------------------------/
    //pegar todos os usuarios
    const [allUsers, setAllUsers] = useState([]);
    const getAllUsersToAdmin = async () => {
        try {
            const response = await axios.get(`${Url}/api/userAdmin/getAllUsersToAdmin`);
            if (response.data.success) {
                setAllUsers(response.data.userAllToAdmin);
            }

        } catch (error) {
            console.error('Error fetching all users:', error.response?.data?.message);
        }
    };


    // editar usuario
    const editUserPlan = async (id, plan, email, name) => {
        if (!id) {
            return;
        }
        const payload = {
            id: id,
            plan: plan,
            email: email,
            name: name
        };
        try {
            const response = await axios.put(`${Url}/api/userAdmin/update-plan`, payload);
            if (response.data.success) {
                setAllUsers(response.data.userAllToAdmin);
            }
            toast.success(response.data.message);
            getAllUsersToAdmin();
        } catch (error) {
            toast.error(error.response.data.message);
            console.error('Error fetching all users:', error);
        }
    };

    // deletar usuario
    const deleteUser = async (id) => {
        if (!id) {
            return;
        }
        if (!confirm("Tem certeza que deseja remover este usuário?")) {
            return;
        }
        try {
            const response = await axios.delete(`${Url}/api/userAdmin/delete-user`, { data: { id } });
            if (response.data.success) {
                setAllUsers(response.data.userAllToAdmin);
            }
            toast.success(response.data.message);
            getAllUsersToAdmin();
        } catch (error) {
            toast.error(error.response.data.message);
            console.error('Error fetching all users:', error);
        }
    };

    // pegar usuario logado
    const [user, setUser] = useState(null);
    const getUser = async () => {
        try {
            const response = await axios.get(`${Url}/api/userAdmin/getUsersAdminData`);
            if (response.data.success) {
                setUser(response.data);
            }
        } catch (error) {
            console.error('Error fetching user:', error.response.data.message);
        }
    };

    // logout admin
    const logoutAdmin = async () => {
        if (!confirm("Tem certeza que deseja sair?")) {
            return;
        }
        try {
            const response = await axios.post(`${Url}/api/authAdmin/logout`);
            if (response.data.success) {
                setUser(null);
                navigate('/login');
            }
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
            console.error('Error fetching user:', error);
        }
    };

    // verificar email
    const sendVerificationOtpAdmin = async (e) => {
        try {
            e.preventDefault();
            const { data } = await axios.post(`${Url}/api/authAdmin/send-verify-otp-admin`);
            if (data.success) {
                setUser(data);
            }
            toast.success(data.message);
            setTimeout(() => {
                navigate('/email-verify-admin');
            }, 3000);
        } catch (error) {
            toast.error(error.response.data.message);
            console.error('Error fetching user:', error);
        }
    };

    // pega convites de admin
    const [invitations, setInvitations] = useState([]);
    const getInvitations = async () => {
        try {
            const response = await axios.get(`${Url}/api/inviteAdmin/get-invitation`);
            if (response.data.success) {
                setInvitations(response.data.invitation);
            } else {
                console.error('Error fetching invitations:', error.response.data.message);
            }
        } catch (error) {

            console.error('Error fetching invitations:', error.response.data.message);
        }
    };

    // remover convite de admin
    const removeInvitation = async (id) => {
        if (!id) {
            return;
        }
        if (!confirm("Tem certeza que deseja remover este convite?")) {
            return;
        }
        try {
            const response = await axios.delete(`${Url}/api/inviteAdmin/remove-invitation`, { data: { id } });
            if (response.data.success) {
                setInvitations(response.data.invitation);
            }
            showToast(response.data.message);
            getInvitations();
        } catch (error) {
            showToast(error.response.data.message);
            console.error('Error fetching invitations:', error);
        }
    };






    useEffect(() => {
        async function loadData() {
            await Promise.all([
                getLearningContent(),
                getForumContent(),
                getNewsContent(),
                getAllUsersToAdmin(),
                getUser(),
                checkAuth(),
                getInvitations()
            ]);
        }
        loadData();
    }, []);


    const contextValue = {
        Url,
        //learning
        getLearningContent,
        contents,
        deleteLearningContent,
        editLearningContent,
        addLearningContent,
        //Noticias
        getNewsContent,
        newsContent,
        deleteNewsContent,
        editNewsContent,
        addNewsContent,
        setNewsContent,
        forumContent,
        getForumContent,
        deleteForumContent,
        editForumContent,
        //comentarios
        addReplyForum,
        //usuarios
        getAllUsersToAdmin,
        allUsers,
        editUserPlan,
        deleteUser,
        user,
        getUser,
        logoutAdmin,
        sendVerificationOtpAdmin,
        isLogin,
        // convites admin
        invitations,
        getInvitations,
        removeInvitation,
        // toast
        toastMsg,
        showToast

    }
    return (
        <ContextApp.Provider value={contextValue}>
            {children}
        </ContextApp.Provider>
    );
};

export default ContextAppProvider;
