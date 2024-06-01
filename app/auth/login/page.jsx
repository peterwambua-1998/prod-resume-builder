'use client'
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import loginImg from '@/app/images/login.svg'
import Image from 'next/image';
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { Loading, Navbar } from "react-daisyui";
import NavBar from "@/app/navbar/navbar";
import { auth, db } from "@/app/firebase/firebase";
import { Timestamp, addDoc, doc, getDoc, setDoc } from "firebase/firestore";


const Login = () => {
    const router = useRouter();
    var [isLoading, setIsLoading] = useState(true);
    var [user, setUser] = useState(null);
    const [firebase_user, loading, error] = useAuthState(auth);
    const [err, setErr] = useState(null);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [signUpGoogleClicked, setSignUpGoogleClicked] = useState(false);

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            if (email && password) {
                await signInWithEmailAndPassword(auth, email, password);
                router.push('/dashboard/cv-create/proceed');
            }
            
        } catch (er) {
            console.log(er);
            setErr('invalid credentials please try again');
        }
    }

    const handleSignInGoogle = async () => {
        try {
            setSignUpGoogleClicked(true);
            let googleProv = new GoogleAuthProvider();
            let user = await signInWithPopup(auth, googleProv); 
            // check if user has about
            let userId = user.user.uid;

            //check is user is there
            let userIds = await getDoc(doc(db, 'user-ids', userId));
            if (userIds.exists() == false) {
                // store userid
                await addDoc(doc(db, "about", userId), {
                    'user_id': userId,
                    'created_at': Timestamp.now()
                });
            }

            let about = await getDoc(doc(db, 'profile', userId));
            if (about.exists()) {
                router.replace('/dashboard');
            } else {
                router.replace('/auth/more-information');
            }
        } catch (error) {
            console.log(error);
            setErr('Error occurred please try again');
        }
    }

    useEffect(() => {
      setUser(firebase_user);
      setIsLoading(loading);
    }, [loading])

    if (isLoading) {
        return (<main className="flex min-h-screen items-center justify-center bg-blue-950"><Loading size="lg" color="warning" variant="dots" /></main>)
    }

    if (!isLoading) {
        return (  
            <main>
                <NavBar userId={null} />
                <div className="">
                    {/* hero section */}
                    <div className="sm:container mx-auto p-[5%]">
                        <div className="md:grid md:grid-cols-2 md:gap-4 sm:grid-cols-1 my-bg">
                            <div>
                                <p className='mb-3 mt-[10%] md:mt-0 lg:mt-0 text-center w-[100%] md:w-[70%] lg:w-[70%] font-bold'>Login In or <button className="text-blue-500" onClick={() => router.push('sign-up')}>sign up</button></p>
                                <form action="">
                                    <div class="relative mb-5">
                                        <input required onChange={(e) => setEmail(e.target.value)} type="email" class="peer py-3 px-4 ps-11 block w-[100%] md:w-[70%] lg:w-[70%] bg-[#D9D9D9] border-transparent rounded-full text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="Enter name" />
                                        <div class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                                            <svg class="flex-shrink-0 w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                        </div>
                                    </div>

                                    <div class="relative mb-3">
                                        <input required onChange={(e) => setPassword(e.target.value)} type="password" class="peer py-3 px-4 ps-11 block w-[100%] md:w-[70%] lg:w-[70%] bg-[#D9D9D9] border-transparent rounded-full text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="Enter password" />
                                        <div class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                                            <svg class="flex-shrink-0 w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z"/><circle cx="16.5" cy="7.5" r=".5"/></svg>
                                        </div>
                                    </div>
                                    <div className="mb-3 w-[100%] md:w-[70%] lg:w-[70%]">
                                        <Link href='/auth/forgot-password' className="text-sm font-semibold text-right text-[#F59E0B]">
                                            <p>forgot password</p>
                                        </Link>
                                    </div>
                                    
                                    <button disabled={!email || !password} 
                                        onClick={(e) =>{ 
                                            handleSignIn(e);
                                        }} type="button" class="py-3 px-4  gap-x-2 text-sm font-semibold rounded-full border border-transparent bg-[#F59E0B] text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none w-[100%] md:w-[70%] lg:w-[70%] text-center">
                                        Login
                                    </button>
                                    <div className='w-[100%] md:w-[70%] lg:w-[70%] mt-2'>
                                        <p className='text-xs text-center text-red-500'>{err}</p>
                                        <p className='text-xs text-center'>or sign in with</p>
                                    </div>
                                    
                                </form>
                                <div className='w-[100%] md:w-[70%] lg:w-[70%] mt-2'>
                                    <button onClick={() => handleSignInGoogle()} type="button" className="mt-5 py-3 px-4 w-full flex justify-center gap-x-2 text-sm font-semibold rounded-full border border-[#EA4335] text-black hover:border-[#EA4335] hover:text-[#EA4335] disabled:opacity-50 disabled:pointer-events-none ">
                                                {signUpGoogleClicked ? (<Loading className="w-[20px]" />) : (<span></span>)} <span><FontAwesomeIcon icon={faGoogle} className="font-sm" /> Google</span> 
                                    </button>
                                    {/* <button type="button" className="mt-5 py-3 px-4 w-full text-center gap-x-2 text-sm font-semibold rounded-full border text-[#1DA1F2] border-[#1DA1F2]  hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none ">
                                        <FontAwesomeIcon className="h-[18px]" icon={faFacebook} />  
                                            Twitter
                                    </button> */}
                                </div>
                            </div>
                            <div className='hidden md:block lg:block text-right md:pl-[10%]'>
                                <Image alt="logn-img" src={loginImg} height={380} />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
   
}
 
export default Login;

// // const user = UserAuth();
    // // const signInEmailPass = UserAuth();
    // // const logOut = UserAuth();
    // var {user, signInEmailPass, logOut} = UserAuth();
    // console.log(user);
    // const handleSignIn = async () => {
    //     try {
    //         await signInEmailPass('pwambua25@gmail.com', '12345678');
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    // const handleSignOut = async () => {
    //     try {
    //         await logOut();
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

     // useEffect(() =>{
    //     onAuthStateChanged(auth, (user) => {
    //         if (user) {
    //           // User is signed in, see docs for a list of available properties
    //           // https://firebase.google.com/docs/reference/js/firebase.User
    //           const uid = user.uid;
    //           // ...
    //           router.replace('/dashboard');
    //         } else {
    //           // User is signed out
    //           // ...
    //           router.replace('/auth/login');
    //           console.log("user is logged out")
    //         }
    //       });
    // }, [])
