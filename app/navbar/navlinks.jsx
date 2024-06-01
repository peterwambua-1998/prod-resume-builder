'use client'
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { Navbar, Button, Loading } from "react-daisyui";
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

function NavLinks ({userId}) {
    const [user, setUser] = useState(userId);
    const [firebase_user, loading, error] = useAuthState(auth);

    const handleSignOut = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        setUser(firebase_user);
    }, [firebase_user])

    if (!user) {
        return (
            <div className='hidden lg:flex w-[25%]'>
                <Navbar.End className='text-center'>
                    <Link href='/auth/login' className='text-amber-500 font-bold'>login</Link>
                </Navbar.End>
                <Navbar.End>
                    <Link  href='/auth/sign-up' className='w-[100%] bg-amber-500 text-black font-bold pl-5 pr-5 pt-3 pb-3 rounded-md'>Sign up</Link>
                </Navbar.End>
            </div>
        ) 
    } else {
        return (  
            <div className='hidden lg:flex gap-4 w-[25%]'>
                <Navbar.End className='text-center'>
                    <Link href='/dashboard' >Dashboard</Link>
                </Navbar.End>
                <Navbar.End>
                    <Button className='bg-blue-300 text-black'  onClick={() => handleSignOut()}>logout</Button>
                </Navbar.End>
            </div>
        );
    }
}
 
export default NavLinks;