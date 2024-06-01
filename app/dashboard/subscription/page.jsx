'use client'
import { auth, db } from "@/app/firebase/firebase";
import { faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Timestamp, doc, onSnapshot, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Card, Modal, Input } from "react-daisyui";
import { useAuthState } from "react-firebase-hooks/auth";

const Subscription = () => {
    const [firebase_user, loading, error] = useAuthState(auth);
    const [clickedSub, setClickedSub] = useState(null);
    const [profile, setProfile] = useState(null);
    const router = useRouter();
    const [visible, setVisible] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [paymentError, setPaymentError] = useState(false);

    const toggleVisible = () => {
        setVisible(!visible);
    };

    // get user profile
    function getProfile() {
        try {
            const usb = onSnapshot(doc(db, 'profile', firebase_user.uid), doc => {
                if (doc.data()) {
                    setProfile(doc.data());
                } else {
                    setProfile(null);
                }
            });

        } catch (error) {
            console.log(error);
        }
    }

    function setAmountVariableAndInitiatePayment(type) {
        if (type == 12) {
            toggleVisible();
            setClickedSub({
                'amount': 100,
                'sub_type': 12,
            })
        }

        if (type == 22) {
            toggleVisible();
            setClickedSub({
                'amount': 200,
                'sub_type': 22,
            })
        }

        if (type == 32) {
            toggleVisible();
            setClickedSub({
                'amount': 300,
                'sub_type': 32,
            })
        }
    }

    useEffect(() => {
        getProfile();
    }, []);

    async function initiatePaymentCard() {
        let amount = clickedSub.amount;
        let sub_type = clickedSub.sub_type;
        if (amount && sub_type) {
            try {
                let options = {
                    method: 'POST',
                    body: JSON.stringify({
                        'amount': amount,
                        'first_name': profile.full_name,
                        'last_name': '',
                        'email': profile.email,
                        'subscription_type': sub_type,
                    }),
                };
                let initPay = await fetch('http://localhost:3000/api/intasend', options);
                let res = await initPay.json();
                let { url } = res;
                router.push(url);
            } catch (error) {
                console.log(error);
                setPaymentError(true);
            }
        }
    }

    async function initiatePaymentMpesa() {
        // TODO validate phone number
        console.log('peter');
        try {
            let options = {
                method: 'POST',
                body: JSON.stringify({
                    'amount': clickedSub.amount,
                    'first_name': profile.full_name,
                    'phoneNumber': '254' + phoneNumber,
                }),
            };
            let initPay = await fetch('http://localhost:3000/api/mpesa', options);
            let res = await initPay.json();
            // save response details and redirect
            let data = {
                MerchantRequestID: res.MerchantRequestID,
                CheckoutRequestID: res.CheckoutRequestID,
                ResponseCode: res.ResponseCode,
                ResponseDescription: res.ResponseDescription,
                CustomerMessage: res.CustomerMessage,
                amount: 0,
                paymentFinished: false,
                created_at: Timestamp.now()
            }
            if (res.ResponseCode == 0) {
                await setDoc(doc(db, "subscription-mpesa-payments", res.MerchantRequestID), data);
                router.push(`/dashboard/mpesa-service?merchant=${res.MerchantRequestID}`);
            }
        } catch (error) {
            console.log(error);
            setPaymentError(true);
        }
    }

    return (
        <div>
            <div className="mt-5">
                <p className="text-center text-xl font-bold">Subscription Plans</p>
                <p className="text-center text-black/50 text-sm">Choose a subscription plan below</p>
            </div>
            <div className="flex flex-col items-center lg:flex-row lg:justify-center gap-4 md:gap-4 lg:gap-10 ">
                <div className="bg-slate-200 p-5 w-[70vw] md:w-[60vw] lg:w-[20vw] mt-16 rounded-md border border-slate-400">
                    <div>
                        <p className="text-sm font-semibold">Basic plan</p>
                    </div>
                    <div className="mt-5">
                        <p className="text-lg "><span className="font-semibold">KSH 199 /</span><span className="text-sm"> monthly</span></p>
                    </div>
                    <div className="mt-3">
                        <Button onClick={() => setAmountVariableAndInitiatePayment(12)} className="text-xs w-full rounded h-5 bg-blue-800 hover:bg-blue-950 text-white">GET STARTED</Button>
                    </div>
                    <div className="mt-3 text-sm">
                        <p className="pb-2 flex gap-2"><span className="bg-amber-500 pl-1 pr-1 rounded-full"><FontAwesomeIcon icon={faCheck} /></span> <span>Feature one</span></p>
                        <p className="pb-2 flex gap-2"><span className="bg-amber-500 pl-1 pr-1 rounded-full"><FontAwesomeIcon icon={faCheck} /></span> <span>Feature one</span></p>
                        <p className="pb-2 flex gap-2"><span className="bg-amber-500 pl-1 pr-1 rounded-full"><FontAwesomeIcon icon={faCheck} /></span> <span>Feature one</span></p>
                        <p className="flex gap-2"><span className="bg-amber-500 pl-1 pr-1 rounded-full"><FontAwesomeIcon icon={faCheck} /></span> <span>Feature one</span></p>
                    </div>
                </div>
                <div className="bg-slate-900 p-5 w-[70vw] md:w-[60vw] lg:w-[20vw] mt-8 rounded-md border border-slate-400 text-white">
                    <div>
                        <p className="text-sm font-semibold">Premium plan</p>
                    </div>
                    <div className="mt-5">
                        <p className="text-lg "><span className="font-semibold">KSH 199 /</span><span className="text-sm"> monthly</span></p>
                    </div>
                    <div className="mt-3">
                        <Button onClick={() => setAmountVariableAndInitiatePayment(22)} className="text-xs w-full rounded h-5 bg-blue-800 hover:bg-blue-950 text-white">GET STARTED</Button>
                    </div>
                    <div className="mt-3 text-sm ">
                        <p className="pb-2 flex gap-2"><span className="bg-amber-500 pl-1 pr-1 rounded-full text-black"><FontAwesomeIcon icon={faCheck} /></span> <span>Feature one</span></p>
                        <p className="pb-2 flex gap-2"><span className="bg-amber-500 pl-1 pr-1 rounded-full text-black"><FontAwesomeIcon icon={faCheck} /></span> <span>Feature one</span></p>
                        <p className="pb-2 flex gap-2"><span className="bg-amber-500 pl-1 pr-1 rounded-full text-black"><FontAwesomeIcon icon={faCheck} /></span> <span>Feature one</span></p>
                        <p className="pb-2 flex gap-2"><span className="bg-amber-500 pl-1 pr-1 rounded-full text-black"><FontAwesomeIcon icon={faCheck} /></span> <span>Feature one</span></p>
                        <p className="pb-2 flex gap-2"><span className="bg-amber-500 pl-1 pr-1 rounded-full text-black"><FontAwesomeIcon icon={faCheck} /></span> <span>Feature one</span></p>
                        <p className="flex gap-2"><span className="bg-amber-500 pl-1 pr-1 rounded-full text-black"><FontAwesomeIcon icon={faCheck} /></span> <span>Feature one</span></p>
                    </div>
                </div>
                <div className="bg-slate-200 p-5 w-[70vw] md:w-[60vw] lg:w-[20vw] mt-16 rounded-md border border-slate-400">
                    <div>
                        <p className="text-sm font-semibold">Pro plan</p>
                    </div>
                    <div className="mt-5">
                        <p className="text-lg "><span className="font-semibold">KSH 199 /</span><span className="text-sm"> monthly</span></p>
                    </div>
                    <div className="mt-3">
                        <Button onClick={() => setAmountVariableAndInitiatePayment(32)} className="text-xs w-full rounded h-5 bg-blue-800 hover:bg-blue-950 text-white">GET STARTED</Button>
                    </div>
                    <div className="mt-3 text-sm">
                        <p className="pb-2 flex gap-2"><span className="bg-amber-500 pl-1 pr-1 rounded-full"><FontAwesomeIcon icon={faCheck} /></span> <span>Feature one</span></p>
                        <p className="pb-2 flex gap-2"><span className="bg-amber-500 pl-1 pr-1 rounded-full"><FontAwesomeIcon icon={faCheck} /></span> <span>Feature one</span></p>
                        <p className="pb-2 flex gap-2"><span className="bg-amber-500 pl-1 pr-1 rounded-full"><FontAwesomeIcon icon={faCheck} /></span> <span>Feature one</span></p>
                        <p className="pb-2 flex gap-2"><span className="bg-amber-500 pl-1 pr-1 rounded-full"><FontAwesomeIcon icon={faCheck} /></span> <span>Feature one</span></p>
                        <p className="flex gap-2"><span className="bg-amber-500 pl-1 pr-1 rounded-full"><FontAwesomeIcon icon={faCheck} /></span> <span>Feature one</span></p>
                    </div>
                </div>

                <Modal.Legacy open={visible} className="bg-white max-w-5xl">
                    <Modal.Header className="font-bold">Payment Method</Modal.Header>
                    <Modal.Body className="p-0">
                        <Card className="mb-3">
                            <Card.Body>
                                <Card.Title tag="h2" className="text-green-600">MPesa</Card.Title>
                                <div className="form-control w-full grow">
                                    <p>Phone number</p>
                                    <p className="text-black/50 text-xs">Kindly enter phone number without zero ie: 7100100100</p>
                                    <div>
                                        <Input className="bg-white text-black w-full" placeholder="Ex: 7100100100" onChange={(e) => setPhoneNumber(e.target.value)} />
                                    </div>
                                </div>
                                <Card.Actions className="justify-end">
                                    <Button color="success" onClick={initiatePaymentMpesa}>Pay Now</Button>
                                </Card.Actions>
                            </Card.Body>
                        </Card>

                        <Card>
                            <Card.Body>
                                <Card.Title tag="h2" className="text-blue-600">Card</Card.Title>
                                <p className="text-xs text-black/50">Pay through card</p>
                                <Card.Actions className="justify-end">
                                    <Button color="primary" onClick={initiatePaymentCard}>Pay Now</Button>
                                </Card.Actions>
                            </Card.Body>
                        </Card>
                    </Modal.Body>
                    <Modal.Actions>
                        <Button type="button" onClick={toggleVisible} >Close</Button>
                    </Modal.Actions>
                </Modal.Legacy>

                {
                    paymentError == true ?
                        <div>
                            error occurred
                        </div> :
                        <div></div>
                }
            </div>
        </div>
    );
}

export default Subscription;