import React from 'react'

import { MenuIcon, X } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from '@/components/theme/theme-toggle'
import { Link, useNavigate } from 'react-router';
import { useUser } from '@/context/UserContext';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleUserRound } from "lucide-react";

const NavBar : React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useUser();
  const navigate = useNavigate();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    const handleLogout = () => {
      logout();
      navigate('/')
    }
  return (
    <div className="w-full flex justify-between py-4 items-center pagePadding sticky top-0 z-50 backdrop-blur-lg">
            <div className="w-full  flex mx-auto justify-between items-center">
            <Link to="/" >
                <h1 className="text-2xl font-semibold tracking-wide">BookShelf</h1>
            </Link>
            <div className="hidden md:flex gap-6 min-w-fit">
              {/* <Link to="/books" className="hover:text-[#344054]" >Books</Link> */}
              {/* <Link to="#" className="hover:text-[#344054]" >Reviews</Link> */}
              {/* <Link to="#" className="hover:text-[#344054]" >About Us</Link> */}
            </div>
            <div className="hidden md:flex gap-4 min-w-fit">
            {user ? (
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
            <Button size="icon" variant="outline" aria-label="Open account menu">
              {user.profilePicture ? (
                <img
                  src={user.profilePicture}  
                  alt="Profile"
                  className="w-8 h-8 object-cover rounded-md"
                />
              ) : (
                <CircleUserRound size={16} strokeWidth={2} aria-hidden="true" />
              )}
            </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="max-w-64">
              <DropdownMenuLabel className="flex flex-col">
                <span>Signed in as</span>
                <span className="text-xs font-normal text-foreground">{user.username}</span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {user.role === 'admin' &&
              <DropdownMenuItem onSelect={() => navigate('/createbook')}>Add Books</DropdownMenuItem>
            }
              <DropdownMenuItem onSelect={() => navigate('/profile')}>Profile</DropdownMenuItem>

              <DropdownMenuItem onSelect={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          ) : (
            <Link to="/login">
              <button className="bg-[#7F56D9] hover:bg-[#6941c6] px-4 py-2 rounded-md text-base text-white font-semibold transition-all ease-in-out duration-150">
                Log In
              </button>
            </Link>
          )}
                <ThemeToggle/>
            </div>

            </div>
            <div>
                {!isOpen && (
                <MenuIcon className="md:hidden z-30 absolute right-10 top-4" onClick={toggleMenu}/>
                
                )}
                {isOpen && (
                <X className="md:hidden z-30 absolute right-10 top-4" onClick={toggleMenu}/>
                )}
            </div>
            {isOpen && (
            <div className=" h-screen w-screen absolute top-0 right-0 z-20 backdrop-blur-md p-10 mt-16 bg-background">
                
                <div className="flex flex-col gap-6 min-w-fit">
                  {/* <Link to="/books" className="hover:text-[#344054]" onClick={toggleMenu}>Books</Link> */}
                  {/* <Link to="#" className="hover:text-[#344054]" onClick={toggleMenu}>Reviews</Link> */}
                  {/* <Link to="#" className="hover:text-[#344054]" onClick={toggleMenu}>About Us</Link> */}
                    {user ? (
              <button 
                onClick={handleLogout} 
                className="bg-red-500 text-white text-base px-4 py-2 rounded-md font-semibold"
              >
                Logout
              </button>
            ) : (
              <Link to="/login">
                <button className="bg-white text-[#7F56D9] text-base px-4 py-2 rounded-md font-semibold">
                  Log in
                </button>
              </Link>
            )}
                </div>
                
            </div>)}
        </div>
  )
}

export default NavBar


