import React from 'react'
import logoBlack from '../assets/logo/logo-black.svg'

const Navbar = () => {
  return (
    <div className='flex 2xl:justify-start justify-center'>
      <img src={logoBlack} alt="logo" className='w-32' />
    </div>
  )
}

export default Navbar