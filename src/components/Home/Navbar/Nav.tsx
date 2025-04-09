'use client'
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { navLinks } from '../../../constants/constants'
import Link from "next/link";
import { HiBars3BottomRight } from "react-icons/hi2";
import { ModeToggle } from "@/components/Helper/mode-toggle";

// define props type

type props = {
    openNav: () => void;
}

const Nav = ({openNav}:props) => {
    const [navBg, setNavBg] = useState(false);

    useEffect(() => {
        const handler = () => {
            if(window.scrollY >= 90){
                setNavBg(true);
            }if(window.scrollY < 90){
                setNavBg(false);
            }
        }
        window.addEventListener('scroll', handler);
        return () => {
            window.removeEventListener('scroll', handler);
        }
    },[]);

  return (
    <div className={`fixed ${navBg ? 'bg-gray-900' : 'fixed'} h-[12vh] z-10 transition-all duration-200 w-full `}>
      <div className="flex items-center h-full justify-between w-[95%] sm:w-[90%] xl:w-[80%] mx-auto">
        {/* Logo */}
        <Image
          src="/images/logo2.png"
          alt="logo"
          width={170}
          height={170}
          className="ml-[.04rem] sm:ml-0"
        />
        {/* Nav Links */}
        <div className="flex items-center space-x-10">
            <div className="hidden lg:flex items-center space-x-8 text-blue-600 dark:text-white font-bold"> 
                 {navLinks.map((navlink)=>{
                return <Link key={navlink.id} href={navlink.url}><p className="nav__link">{navlink.label}</p></Link>
            })}
            </div>
            {/* Button */}
            <div className="flex items-center space-x-4">
                <Link href={`https://github.com/im-ShivamSaurav`}><button className="md:px-10 md:py-3 hidden md:block px-8 py-3 text-white dark:text-blue-800 font-semibold sm:text-base text-sm bg-blue-800 dark:bg-white hover:bg-gray-200 hover:text-blue-800 cursor-pointer transition-all duration-200 rounded-lg ">My Github</button></Link>
            </div>
            <ModeToggle />
            {/* Hamburger Icon */}
            <HiBars3BottomRight onClick={openNav} className="w-8 h-8 cursor-pointer text-blue-600 lg:hidden" />
        </div>  
      </div>
    </div>
  );
};

export default Nav;
