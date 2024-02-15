import React from 'react'
import NavBar from './NavBar'
import Footer from './Footer'

const Layout = ({children}) => {
  return (
    <div className=''>
     <NavBar/>
     <main className='min-h-[80vh] '>{children}</main>
     <Footer/> 
    </div>
  )
}

export default Layout
