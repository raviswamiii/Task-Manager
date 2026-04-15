import React from 'react'
import { Home } from './pages/Home'
import { Task } from './components/Task'
import { Route, Routes } from 'react-router-dom'

export const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/task/:taskId' element={<Task/>} />
      </Routes>
    </div>
  )
}
