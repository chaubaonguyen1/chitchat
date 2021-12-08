import Login from './components/Login'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import './App.css';

import ChatRoom from './components/ChatRoom';
import AuthProvider from './Context/AuthProvider';
import AppProvider from './Context/AppProvider';
import AddRoomModal from '../src/components/Modals/AddRoomModal'
import InviteMemberModal from './components/Modals/InviteModalMember';

function App() {
  // test change
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <Routes>
              <Route element={<Login/>} path="/login"/>
              <Route element={<ChatRoom/>} path=""/>
          </Routes>
          <AddRoomModal/>
          <InviteMemberModal/>
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
// HTTPS=true npm start
export default App;
