'use client';
import { FacebookAuthProvider, createUserWithEmailAndPassword, getAuth, signInWithPopup, sendEmailVerification, GoogleAuthProvider } from 'firebase/auth';
import loginImg from '@/app/images/login-u.svg'
import Image from 'next/image';
import { auth, db } from '@/app/firebase/firebase';
import { useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Loading } from 'react-daisyui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useEffect, useState } from 'react';
import NavBar from '@/app/navbar/navbar';
import { Timestamp, addDoc, doc, getDoc, setDoc } from 'firebase/firestore';


const SignUp = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordAgain, setPasswordAgain] = useState('');
    const [err, setErr] = useState(null)
    const router = useRouter();
    var [isLoading, setIsLoading] = useState(true);
    var [user, setUser] = useState(null);
    const [firebase_user, loading, error] = useAuthState(auth);
    const [showVerify, setShowVerify] = useState(false);
    const [signUpClicked, setSignUpClicked] = useState(false);
    const [signUpGoogleClicked, setSignUpGoogleClicked] = useState(false);

    const mSignUp = async () => {
        try {
            setSignUpClicked(true);
            const actionCodeSettings = {
                url: 'http://localhost:3000/auth/more-information',
                handleCodeInApp: true
            }
            const newUser = await createUserWithEmailAndPassword(auth, email, password);
            const verify = await sendEmailVerification(newUser.user, actionCodeSettings);
            setShowVerify(true);
        } catch (error) {
            console.log(error);
            setErr('Try again an error occurred');
        }
    };

    const mSighUpWithFacebook = async () => {
        try {
            setSignUpClicked(true);
            let fbProv = FacebookAuthProvider();
            await signInWithPopup(auth, fbProv);
            router.replace('/auth/more-information');
        } catch (error) {
            setErr('Try again an error occurred');
        }
    }


    const mSighUpWithGoogle = async () => {
        try {
            setSignUpGoogleClicked(true);
            let googleProv = new GoogleAuthProvider();
            let user = await signInWithPopup(auth, googleProv);
            let userId = user.user.uid;
            //check is user is there
            let userIds = await getDoc(doc(db, 'user-ids', userId));
            if (userIds.exists() == false) {
                // store userid
                await setDoc(doc(db, "user-ids", userId), {
                    'user_id': userId,
                    'created_at': Timestamp.now()
                });
            }

            if (userIds.exists()) {
                router.replace('/dashboard');
            } else {
                router.replace('/auth/more-information');
            }
        } catch (error) {
            setErr('Refresh and try again an error occurred');
            console.log(error);
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
        if (user) {
            return router.replace('/dashboard', {
                'user': firebase_user.uid
            });
        } else {
            return (
                <main>
                    <NavBar userId={null} />
                    <div className="">
                        {/* hero section */}
                        <div className="p-[5%]">
                            <div className="md:grid md:grid-cols-2 lg:grid lg:grid-cols-2 md:gap-4 grid-cols-1 my-bg">
                                <div>
                                    {showVerify ? (
                                        <div className='w-[100%] md:w-[70%] lg:w-[70%]'>
                                            <p>🙌 </p>
                                            <p>Account created successfully! Please check your email for the verification link.</p>
                                        </div>
                                    ) : (
                                        <div>
                                            <p className='mb-3 mt-[10%] md:mt-0 lg:mt-0 text-center w-[100%] md:w-[70%] lg:w-[70%] font-bold'>Create your account</p>
                                            <form action="">
                                                <div class="relative mb-5">
                                                    <input onChange={(e) => setEmail(e.target.value)} required type="email" class="peer py-3 px-4 ps-11 block w-[100%] md:w-[70%] lg:w-[70%] bg-[#D9D9D9] border-transparent rounded-full text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="Enter email" />
                                                    <div class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                                                        <svg class="flex-shrink-0 w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                                    </div>
                                                </div>

                                                <div class="relative mb-5">
                                                    <input onChange={(e) => setPassword(e.target.value)} required type="password" class="peer py-3 px-4 ps-11 block w-[100%] md:w-[70%] lg:w-[70%] bg-[#D9D9D9] border-transparent rounded-full text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="Enter password" />
                                                    <div class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                                                        <svg class="flex-shrink-0 w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z" /><circle cx="16.5" cy="7.5" r=".5" /></svg>
                                                    </div>
                                                </div>

                                                <div class="relative mb-5">
                                                    <input onChange={(e) => setPasswordAgain(e.target.value)} required type="password" class="peer py-3 px-4 ps-11 block w-[100%] md:w-[70%] lg:w-[70%] bg-[#D9D9D9] border-transparent rounded-full text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="Enter password again" />
                                                    <div class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none">
                                                        <svg class="flex-shrink-0 w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z" /><circle cx="16.5" cy="7.5" r=".5" /></svg>
                                                    </div>
                                                </div>

                                                <button onClick={() => mSignUp()} disabled={(!email || !password || !passwordAgain) || (password !== passwordAgain)} type="button" class="py-3 px-4 flex justify-center gap-x-2 text-sm font-semibold rounded-full border border-transparent bg-[#F59E0B] text-black hover:bg-[#b78734] disabled:opacity-50 disabled:pointer-events-none w-[100%] md:w-[70%] lg:w-[70%] text-center">
                                                    {signUpClicked ? (<Loading />) : (<span></span>)} <p>Sign up</p>
                                                </button>
                                                <div className='w-[100%] md:w-[70%] lg:w-[70%] mt-2'>
                                                    <p className='text-xs text-center'>or sign up with</p>
                                                </div>

                                            </form>

                                            {err != null ? <div className="text-center text-lg text-red-600">{err}</div> : ''}
                                            <div className='w-[100%] md:w-[70%] lg:w-[70%] mt-2'>

                                                <button onClick={() => mSighUpWithGoogle()} type="button" className="mt-5 py-3 px-4 w-full flex justify-center gap-x-2 text-sm font-semibold rounded-full border border-[#EA4335] text-black hover:border-[#EA4335] hover:text-[#EA4335] disabled:opacity-50 disabled:pointer-events-none ">
                                                    {signUpGoogleClicked ? (<Loading className="w-[20px]" />) : (<span></span>)} <span><FontAwesomeIcon icon={faGoogle} className="font-sm" /> Google</span> 
                                                </button>
                                                {/* <button type="button" className="mt-5 py-3 px-4 w-full text-center gap-x-2 text-sm font-semibold rounded-full border border-[#1DA1F2] text-gray-500 hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none ">
                                                    Twitter
                                                </button> */}
                                            </div>
                                        </div>
                                    )}


                                </div>
                                <div className='hidden md:block lg:block text-right md:pl-[10%]'>
                                    <Image alt='signup-image' src={loginImg} height={380} />
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            );
        }
    }


}

export default SignUp;