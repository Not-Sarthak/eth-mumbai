import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar'
import Home from './pages/Home'

const App = () => {

  return (
    <div className='h-screen bg-[#000000]'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </div>
  )
}

export default App