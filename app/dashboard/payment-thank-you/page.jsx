'use client'
import { auth, db } from '@/app/firebase/firebase';
import { Timestamp, doc, setDoc } from 'firebase/firestore';
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react';
import { Loading } from 'react-daisyui';
import { useAuthState } from 'react-firebase-hooks/auth';
import clap from '@/app/images/clap.png';
import Image from 'next/image';

const ThankYou = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    let [checkingStatus, setCheckingStatus] = useState(true);
    var [firebase_user, loading, error] = useAuthState(auth);

    function addOneYear(date) {
        // Making a copy with the Date() constructor
        const dateCopy = new Date(date);
        dateCopy.setFullYear(dateCopy.getFullYear() + 1);
        return dateCopy;
    }

    async function createSubscription(dateToday, expDate) {
        let plan = searchParams.get('subscriptionType');
        console.log(plan);
        try {
            let data = {
                'user_id': firebase_user.uid,
                'plan': plan,
                'created_date': dateToday,
                'exp_date': expDate,
                'create_at': Timestamp.now(),
            }
            await setDoc(doc(db, "subscriptions", firebase_user.uid), data);
            setCheckingStatus(false);
            // return to cv page and download
            router.replace('/dashboard/cv-create/proceed');
        } catch (error) {
            console.log(error);
        }
    }

    async function verifyPaymentStatus() {
        let invoiceId = searchParams.get('tracking_id');
        if (invoiceId) {
            try {
                let options = {
                    method: 'POST',
                    body: JSON.stringify({
                        'invoice_id': invoiceId,
                    }),
                };
                let statusCheck = await fetch('http://localhost:3000/api/intasend-payment-status', options);
                let statusRes = await statusCheck.json();
                if (statusRes.invoice.state === 'COMPLETE' && statusRes.invoice.failed_code === null) {
                    // create subscription
                    let today = new Date();
                    let exp_date = addOneYear(today);
                    createSubscription(today, exp_date);
                } else {
                    // return to cv page
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    // useEffect(() => {
    //     verifyPaymentStatus();
    // }, []);

    return (
        <div>
            <div className='flex w-full justify-center items-center mb-6 pt-10'>
                <Image width={500} height={500} src={clap} alt='thank you' className='w-[40vh] h-[40vh]' />
            </div>
            {
                checkingStatus ? 
                <div className='flex gap-4 w-full justify-center items-center'>
                    <Loading />
                    <p className='text-2xl font-bold'>Checking payment status</p>
                </div> : 

                <div  className='flex gap-4 w-full justify-center items-center'>
                    <p className='text-xl font-bold'>Payment Successful. You we will be redirected to download Pdf</p>
                </div>
            }
        </div>
    );
}

export default ThankYou;