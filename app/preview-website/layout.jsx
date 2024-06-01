'use client'
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useLayoutEffect, useState } from 'react';
import { auth } from '@/app/firebase/firebase';
import { useRouter } from 'next/navigation';
import { Navbar, Menu, Button, Loading } from 'react-daisyui'
import '@/app/globals.css';
import Link from 'next/link';
import NavLinks from "../navbar/navlinks";


export default function Layout({ children }) {
  var [user, setUser] = useState(null);
  var [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  var [firebase_user, loading, error] = useAuthState(auth);

  useEffect(() => {
    setUser(firebase_user);
    setIsLoading(loading);
  }, [])

  if (loading) {
    return (<main className="flex min-h-screen flex-col items-center justify-between p-24 bg-blue-950"><Loading /></main>)
  }

  if (!loading && !firebase_user) {
    return router.push('/');
  }

  return (
    <div className="bg-white my-font">
      {
        (window.location.href != 'http://localhost:3000/dashboard/preview-website/site-one') ? 
        
        <Navbar className='my-font bg-blue-950 text-white'>
        <Navbar.Start>
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
              <Link href='/dashboard/website'>Website</Link>
            </Menu.Item>
          </Menu>

        </Navbar.Center>
        <NavLinks userId={firebase_user.uid} />
      </Navbar>
        : <div></div>
      }
      
      {children}
    </div>
  )


}



