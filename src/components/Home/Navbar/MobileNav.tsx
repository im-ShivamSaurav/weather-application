import React from 'react'
import Link from 'next/link'
import { navLinks } from '../../../constants/constants'
import { CgClose } from 'react-icons/cg'

type props = {
    showNav: boolean;
    closeNav: () => void;
}

const MobileNav = ({closeNav,showNav}:props) => {

    const navOpen = showNav ? 'translate-x-0' : 'translate-x-[-100%]'
  return (
    <div>
      {/* overlay */}
      <div className={`fixed ${navOpen} transform transition-all duration-500 inset-0 z-[1000] bg-black opacity-70 w-full h-screen`}></div>
      {/* nav links */}
      <div className={`text-white ${navOpen} transform transition-all duration-500 delay-300 fixed justify-center flex flex-col h-full w-[80%] sm:w-[60%] bg-blue-950 z-[1006] space-y-6`}>
        
            {navLinks.map((navlink)=>{
            return <Link key={navlink.id} href={navlink.url}><p className="nav__link text-[20px] ml-12 border-b-[1.5px] pb-2 border-white sm:text-[30px]">{navlink.label}</p></Link>
        })}
        {/* close button */}
        <CgClose onClick={closeNav} className={`absolute top-[0.7rem] right-[1.4rem] sm:w-8 sm:h-8 w-6 h-6 text-white`}/>
                       
      </div>
    </div> 
  )
}

export default MobileNav
