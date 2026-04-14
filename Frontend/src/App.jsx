import React from 'react'
import { Home } from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import { AddTask } from './components/AddTask'

export const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/add-task' element={<AddTask/>} />
      </Routes>
    </div>
  )
}
