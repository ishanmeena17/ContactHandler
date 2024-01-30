import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <div>
        <nav className='navbar navbar-dark bg-dark navbar-navbar-expand-sm '>
          <div className="container">
            <Link to={'/'} className='navbar-brand '><i className='fa fa-mobile text-warning me-2 ' />Contact <span className='text-warning'>Manager</span></Link>
          </div>
        </nav>
    </div>
  )
}

export default NavBar