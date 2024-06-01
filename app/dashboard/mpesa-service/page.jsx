'use client'

import { auth, db } from "@/app/firebase/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const MpesaService = () => {
    const [firebase_user, loading, error] = useAuthState(auth);
    const [paymentSuccess, setPaymentSuccess]= useState(false);
    const router = useSearchParams();
    // check if there is a record updated
    async function getSubscriptionPayment() {
        const param_id = router;
        let param = router.get('merchant')
        console.log(param);
        try {
            onSnapshot(doc(db, 'subscription-mpesa-payments', param), doc => {
                if (doc.data()) {
                    let amount = doc.data()['amount'];
                    console.log(amount);
                    if (amount > 0) {
                        setPaymentSuccess(true);
                    }
                } else {
                    setPaymentSuccess(false);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getSubscriptionPayment();
    });

    return (  
        <div>
            {
                paymentSuccess == true ?
                <div>
                    <p>payment successful</p>
                    <p>redirecting you back to download</p>
                </div>: 
                <div>
                    waiting for your payment
                </div>
            }
        </div>
    );
}
 
export default MpesaService;