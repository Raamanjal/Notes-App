import React from 'react'
import { Routes, Route} from 'react-router'
import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import NoteDetailPage from './pages/NoteDetailPage'
import Login from './pages/Login'
import Register from './pages/Register'
import ProtectedRoutes from './components/ProtectedRoutes'


const App = () => {
  return (
    <div data-theme = "forest" >
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/create" element={<CreatePage/>}/>
          <Route path="/note/:id" element={<NoteDetailPage/>}/>
          </Route>
      </Routes>
    </div>
  )
}

export default App
