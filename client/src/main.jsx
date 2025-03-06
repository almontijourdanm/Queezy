import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import './index.css'
import Registerpage from './pages/Registerpage.jsx'
import Loginpage from './pages/Loginpage.jsx'
import AuthLayout from './pages/AuthLayout.jsx'
import Home from './pages/Home.jsx'
import Lobby from './pages/Lobby.jsx'
import { RoomProvider } from './context/RoomContext.jsx'
import Gamepage from './pages/Gamepage.jsx'
import Scoreboard from './pages/Scoreboard.jsx'

createRoot(document.getElementById('root')).render(
  <RoomProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Registerpage />} />
        <Route path='/login' element={<Loginpage />} />

        <Route element={<AuthLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/rooms/:roomId' element={<Lobby />} />
          <Route path='/start-game/:roomId' element={<Gamepage />} />
          <Route path='/scoreboard/:roomId' element={<Scoreboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </RoomProvider>
)
