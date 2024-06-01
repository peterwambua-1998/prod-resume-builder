'use client'
import Link from 'next/link';
import { Dropdown, Navbar, Menu, Button } from 'react-daisyui';
import NavLinks from './navlinks';
import ResponsiveNavLinks from './responsive-navlinks';

const NavBar = ({userId}) => {
    return (
    
        <Navbar className='my-font bg-blue-950 text-white'>
          <Navbar.Start>
          <Dropdown className='text-white '>
            <Button tag="label" color="ghost" tabIndex={0} className="lg:hidden text-black">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </Button>
            <Dropdown.Menu tabIndex={0} className="w-52 menu-sm mt-3 z-[1] bg-blue-950">
              <Dropdown.Item>
                <a>About</a>
              </Dropdown.Item>
              <Dropdown.Item>
                <a>Contact</a>
              </Dropdown.Item>
              <Dropdown.Item>
                <a>FAQ</a>
              </Dropdown.Item>
              <ResponsiveNavLinks />
            </Dropdown.Menu>
          </Dropdown>
              
          <Link href={'/'} className="btn btn-ghost normal-case text-xl">daisyUI</Link>
          </Navbar.Start>
         
          <Navbar.End className="hidden lg:flex">
            <Menu horizontal className="px-1">
              <Menu.Item>
                <a>About</a>
              </Menu.Item>
              <Menu.Item>
                <a>Contact</a>
              </Menu.Item>
              <Menu.Item>
                <a>FAQ</a>
              </Menu.Item>
            </Menu>
          </Navbar.End>
          <NavLinks userId={userId} />
        </Navbar>
    
     
      )
}
    
 
 
export default NavBar;

/* <nav>
                {pathname == '/' ? <Link href='/dashboard'>Daashboard</Link>: ''}
            </nav> */