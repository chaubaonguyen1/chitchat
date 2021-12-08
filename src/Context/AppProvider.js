import {createContext, useState, useContext, useMemo} from 'react'
import { AuthContext } from './AuthProvider'
import useFirestore  from '../hooks/useFirestore'

export const AppContext = createContext()

function AppProvider ({children}) {
    const [isAddRoomVisible, setIsAddRoomVisible] = useState(false)
    const [isInviteMemberVisible, setIsInviteMemberVisible] = useState(false)
    const [selectedRoomId, setSelectedRoomId] = useState('')

    const user = useContext(AuthContext)
     
    const roomsCondition = useMemo(() => {
     
        return {
            fieldName: 'members',
            operator: 'array-contains',
            value: user.uid // cho cái user.uid nó gọn tý
        }
    }, [user.uid])

    

    const rooms = useFirestore('rooms', roomsCondition)
    
    const selectedRoom = useMemo(() => {
        return  rooms.find(room => room.id === selectedRoomId) || {}
    }
        , [rooms, selectedRoomId])

    const usersCondition = useMemo(() => {
        return {
            fieldName: 'uid',
            operator: 'in',
            value: selectedRoom.members
        }
    }, [selectedRoom.members])


    const members = useFirestore('users', usersCondition)
      
    
    return (
        <AppContext.Provider value={
            {
                rooms,
                members,
                selectedRoom,
                isAddRoomVisible, 
                setIsAddRoomVisible, 
                selectedRoomId, 
                setSelectedRoomId,
                isInviteMemberVisible,
                setIsInviteMemberVisible
            }}>
            {children}
        </AppContext.Provider>
    )
}//1:40:49

export default AppProvider