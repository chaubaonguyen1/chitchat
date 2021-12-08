import React, { useEffect, useState, createContext } from 'react'
import {auth} from '../firebase/config'
import { useNavigate } from 'react-router-dom'
import { Spin } from 'antd'

export const AuthContext = createContext()

export default function AuthProvider({children}) {
    const [user, setUser] = useState({})
    const navigate = useNavigate()
    const [isLoading, setisLoading] = useState(true)
    useEffect(() => {
        const unsubscribled =  auth.onAuthStateChanged((user) => {
           
            if (user) {
                const {displayName, email, uid, photoURL} = user
                setUser({displayName, email, uid, photoURL})
                setisLoading(false)
               return navigate({ pathname: '/' })
            }
            setisLoading(false)
            navigate({pathname: '/login'})
            return;
        })
        unsubscribled()
      
    }, [navigate])

  
    return (
        <AuthContext.Provider value={user}>
            {isLoading ? <Spin/> : children}
        </AuthContext.Provider>
    )
}