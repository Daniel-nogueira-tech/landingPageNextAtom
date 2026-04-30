import React, { useState, useContext, useEffect } from 'react'
import './InvitationAdmin.css'
import { useSearchParams } from 'react-router-dom'
import { ContextApp } from '../../Context/ContextApp';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const InvitationAdmin = () => {
    const [searchParams] = useSearchParams();
    const { Url } = useContext(ContextApp);
    const navigate = useNavigate();
    const [acceptInvitation, setAcceptInvitation] = useState(null);

    const invitationId = searchParams.get("id");

    // Envia para API
    const handleAccept = async () => {
        setAcceptInvitation(true);
        const payload = {
            invitationId: invitationId
        }
        try {
            const response = await axios.post(`${Url}/api/inviteAdmin/accept-invitation`, payload)
            if (response.data.success) {
                toast.success(response.data.message);
                navigate('/login');
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    const handleReject = async () => {
        setAcceptInvitation(false);
        const payload = {
            invitationId: invitationId
        }
        try {
            const response = await axios.post(`${Url}/api/inviteAdmin/reject-invitation`, payload)
            if (response.data.success) {
                toast.success(response.data.message);
                navigate('/login');
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    console.log(acceptInvitation);




    return (
        <div className='invitation-admin-container'>
            <h1>Invitation Admin</h1>
            <p>Você foi convidado para ser administrador do site</p>
            <div className='invitation-admin-buttons'>
                <button onClick={handleAccept} disabled={acceptInvitation}>Aceitar</button>
                <button onClick={handleReject} disabled={acceptInvitation}>Recusar</button>
            </div>
        </div>
    )
}

export default InvitationAdmin