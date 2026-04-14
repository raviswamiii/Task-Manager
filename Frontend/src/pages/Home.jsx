import React, { useContext } from 'react'
import { AddTask } from '../components/AddTask'
import { TaskManagerContext } from '../context/TaskManagerContext'

export const Home = () => {
    const { setAddTaskPanel } = useContext(TaskManagerContext);
  return (
    <div className='h-screen px-4 py-3 relative'>
        <div className='flex justify-between items-center '>
            <h1 className='text-2xl text-[#43754C] font-semibold'>Task Manager</h1>
            <p onClick={() => setAddTaskPanel(true)} className='px-3 py-1 text-sm bg-[#8ABC94] rounded-md text-white font-semibold'>Add Task</p>
        </div>
        <div>
            <div>
                <p>Title</p>
                <p>Description</p>
            </div>
        </div>

        <AddTask/>
    </div>
  )
}
