import React, { useContext, useEffect } from 'react'
import {Row, Col, Button, Typography} from 'antd'
import firebase, { auth, db } from '../../firebase/config'
import { addDocument, generateKeywords } from '../../firebase/service'
import { useNavigate } from 'react-router'
import { AuthContext } from '../../Context/AuthProvider'

const {Title} = Typography

const fbProvider = new firebase.auth.FacebookAuthProvider()
export default function Login() {
    const Navigate = useNavigate()
    const {user} = useContext(AuthContext)
    const handleFbLogin = async () => { 
        const {additionalUserInfo, user} = await auth.signInWithPopup(fbProvider)
       
        if(additionalUserInfo?.isNewUser) {
           addDocument('users', {
            displayName: user.displayName,
            email: user.email,
            photo: user.photoURL,
            uid: user.uid,
            providerId: additionalUserInfo.providerId,
            keywords: generateKeywords(user.displayName)
           })
        }
        Navigate("/")
    }

    useEffect(() => {
        if(user) {
           Navigate('/')
        }
    },[user])
    
    return (
        <div>
            <Row justify="center" style={{height: 800}}>
                <Col span={8}>
                    <Title style={{textAlign: 'center'}} level={3}>Chit chat</Title>
                    <Button style={{width: '100%', marginBottom: 5}} onClick={handleFbLogin}>
                        Login with Facebook
                    </Button>
                    <Button style={{width: '100%'}}>
                        Login with Google
                    </Button>
                </Col>
            </Row>
        </div>
    )
}