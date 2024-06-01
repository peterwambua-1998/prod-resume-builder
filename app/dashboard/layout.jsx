'use client'
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useLayoutEffect, useState } from 'react';
import { auth } from '@/app/firebase/firebase';
import { useRouter } from 'next/navigation';
import { Navbar, Menu, Button, Loading, Dropdown } from 'react-daisyui'
import '@/app/globals.css';
import Link from 'next/link';
import NavLinks from "../navbar/navlinks";
import ResponsiveNavLinks from "../navbar/responsive-navlinks";


export default function Layout({ children }) {
  var [user, setUser] = useState(null);
  const router = useRouter();
  var [firebase_user, loading, error] = useAuthState(auth);

  useEffect(() => {
    setUser(firebase_user);
  }, [])

  if (loading) {
    return (<main className="flex min-h-screen items-center justify-center bg-blue-950"><Loading size="lg" color="warning" variant="dots" /></main>)
  }

  if (!loading && !firebase_user) {
    return router.push('/');
  }

  return (
    <div className="bg-white my-font">
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
                <Link href={{
                  pathname: '/dashboard/cv-create/proceed',
                }}>Curriculum-vitae</Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link href='/dashboard/resume'>Resume</Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link href='/dashboard/cover-letter'>Cover Letter</Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link href='/dashboard/jobs'>Jobs</Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link href='/dashboard/twitter'>Twitter</Link>
              </Dropdown.Item>
              <Dropdown.Item>
              <Link href='/dashboard/website'>Website</Link>
              </Dropdown.Item>
              <ResponsiveNavLinks />
            </Dropdown.Menu>
          </Dropdown>

          <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
        </Navbar.Start>
        <Navbar.Center className="hidden lg:flex">

          <Menu horizontal className="px-1">
            <Menu.Item className="active">
              <Link href={{
                pathname: '/dashboard/cv-create/proceed',
              }}>Curriculum-vitae</Link>
            </Menu.Item>
            <Menu.Item>
              <Link href='/dashboard/resume'>Resume</Link>
            </Menu.Item>
            <Menu.Item>
              <Link href='/dashboard/cover-letter'>Cover Letter</Link>
            </Menu.Item>
            <Menu.Item>
              <Link href='/dashboard/jobs'>Jobs</Link>
            </Menu.Item>
            <Menu.Item>
              <Link href='/dashboard/twitter'>Twitter</Link>
            </Menu.Item>
            <Menu.Item>
              <Link href='/dashboard/website'>Website</Link>
            </Menu.Item>
          </Menu>

        </Navbar.Center>
        <NavLinks userId={firebase_user.uid} />
      </Navbar>


      {children}
    </div>
  )


}



