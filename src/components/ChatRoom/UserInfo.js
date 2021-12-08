import { Avatar, Button, Typography } from 'antd';
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from '../../Context/AuthProvider';
import { auth } from '../../firebase/config';


const WrapperStyled = styled.div`
    display:flex;
    justify-content: space-between;
    padding: 12px 16px;
    border-bottom: 1px solid rbga(82, 38, 83);
    
    .username {
        color: white;
        margin-left: 5px;
    }
    ;
`

export default function UserInfo() {
    const user = useContext(AuthContext)
    const {displayName, photoURL} = user
    const Navigate = useNavigate()


    return (
        <WrapperStyled>
            <div>
                <Avatar src={photoURL}>
                    {photoURL ? '' : displayName?.charAt(0)?.toUpperCase()}
                </Avatar>
                <Typography.Text className="username">{displayName}</Typography.Text>
            </div>
            <Button ghost onClick={async () => {
                await auth.signOut()
                Navigate('/login')
                window.location.reload()
            }}>Log out</Button>
        </WrapperStyled>
    )
} //64:00