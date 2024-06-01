'use client';
import { auth, db } from "@/app/firebase/firebase";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { Modal, Input, Loading, Select, Button, Alert } from "react-daisyui";
import { collection, addDoc, query, where, getDoc, getDocs, onSnapshot, Timestamp, setDoc, doc } from "firebase/firestore";
import ProfilePhoto from "./components/profilephoto";
import EducationWidget from "@/app/dashboard/cv-create/components/education";
import ExperienceWidget from "@/app/dashboard/cv-create/components/experince";
import SkillWidget from "@/app/dashboard/cv-create/components/skills";
import { useEffect, useState } from "react";

const MoreInformation = () => {
    const router = useRouter();
    var [isLoading, setIsLoading] = useState(true);
    var [user, setUser] = useState(null);
    const [firebase_user, loading, error] = useAuthState(auth);
    const [err, setErr] = useState(null);
    const [educationData, setEducationData] = useState([]);
    const [skillData, setSkiData] = useState([]);
    const [expData, setExpData] = useState([]);
    const [addProfileClicked, setAddProfileClicked] = useState(false);

    //profile info
    const [fullName, setFullName] = useState(null);
    const [email, setEmail] = useState(null);
    const [dob, setDob] = useState(null);
    const [location, setLocation] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [professionalTitle, setProfessionalTitle] = useState(null);

    // profile errors
    const [fullNameError, setFullNameError] = useState(null);
    const [emailError, setEmailError] = useState(null);
    const [dobError, setDobError] = useState(null);
    const [locationError, setLocationError] = useState(null);
    const [phoneNumberError, setPhoneNumberError] = useState(null);

    const [professionalTitleError, setProfessionalTitleError] = useState(null);

    const [showSuccessProfile, setShowSuccessProfile] = useState(false);
    const [showErrorProfile, setShowErrorProfile] = useState(false);

    const [goToDashboardClicked, setGoToDashboardClicked] = useState(false);

    const [profile, setProfile] = useState(null);

    async function checkEdu(userId) {
        let eduRef = collection(db, 'education');
        let q = query(eduRef, where("user_id", "==", userId));
        onSnapshot(q, (doc) => {
            setEducationData([]);
            doc.forEach((data) => {
                setEducationData((prev) => [...prev, data.data()]);
            })
        })
    }

    async function checkExperience(userId) {
        let experienceRef = collection(db, 'experience');
        let q = query(experienceRef, where("user_id", "==", userId));
        onSnapshot(q, (doc) => {
            setExpData([]);
            doc.forEach((data) => {
                setExpData((prev) => [...prev, data.data()]);
            })
        })
    }

    async function checkSkill(userId) {
        let skillRef = collection(db, 'skill');
        let q = query(skillRef, where("user_id", "==", userId));
        onSnapshot(q, (doc) => {
            setSkiData([]);
            doc.forEach((data) => {
                setSkiData((prev) => [...prev, data.data()]);
            })
        })
    }

    async function addProfile() {
        setAddProfileClicked(true);
        if (fullName == null || !fullName) {
            setFullNameError('field required');
            setAddProfileClicked(false);

            return;
        } else {
            setFullNameError(null);
        }

        if (email == null || !email) {
            setEmailError('field required');
            setAddProfileClicked(false);

            return;
        } else {
            setEmailError(null);
        }

        if (phoneNumber == null || !phoneNumber) {
            setPhoneNumberError('field required');
            setAddProfileClicked(false);

            return;
        } else {
            setPhoneNumberError(null);
        }

        if (dob == null || !dob) {
            setDobError('field required');
            setAddProfileClicked(false);

            return;
        } else {
            setDobError(null);
        }

        if (location == null || !location) {
            setLocationError('field required');
            setAddProfileClicked(false);

            return;
        } else {
            setLocationError(null);
        }


        if (professionalTitle == null || !professionalTitle) {
            setProfessionalTitleError('field required');
            setAddProfileClicked(false);

            return;
        } else {
            setProfessionalTitleError(null);
        }


        try {
            let date = new Date(dob);

            const data = {
                full_name: fullName,
                email: email,
                location: location,
                DOB: date.toDateString(),
                professionTitle: professionalTitle,
                phoneNumber: phoneNumber,
                created_at: Timestamp.now()
            }
            await setDoc(doc(db, "profile", user.uid), data);
            setShowSuccessProfile(true);
            setTimeout(() => {
                setShowSuccessProfile(false);
            }, 3000);
            setAddProfileClicked(false);
        } catch (error) {
            console.log(error);
            setShowErrorProfile(true);
        }
    }

    async function getProfile() {
        try {
            onSnapshot(doc(db, 'profile', firebase_user.uid), doc => {
                if (doc.data()) {
                    let data = doc.data();
                    setFullName(data['full_name']);
                    setEmail(data['email']);
                    let date = new Date(data['DOB'])
                    setDob(date.toISOString());
                    setLocation(data['location']);
                    setPhoneNumber(data['location']);
                    setProfessionalTitle(data['professionTitle']);
                }
            });
        } catch (error) {
            console.log(error);
        }


    }

    function goToDashboard() {
        setGoToDashboardClicked(true);
        router.push('/dashboard');
    }

    useEffect(() => {
        setUser(firebase_user);
        setIsLoading(loading);
        getProfile();
        if (firebase_user) {
            checkEdu(firebase_user.uid);
            checkExperience(firebase_user.uid);
            checkSkill(firebase_user.uid);
        }
    }, [firebase_user, loading])

    if (isLoading) {
        //console.log(loading);
        return (<div className='h-[100vh] w-full align-middle text-blue-500 bg-blue-950 text-center'><Loading className='' /></div>)
    }


    if (!isLoading) {
        if (!user) {
            router.replace('/');
        } else {

            return (
                <main className="">
                    <div className="p-8 h-[40vh] my-bg-blur bg-image">
                        <h1 className="text-2xl font-bold">Lets Know more about you</h1>
                        <p className="text-sm">Kindly fill the fields below</p>
                    </div>
                    <div className="p-8 absolute top-[16%] w-full">
                        <div className="bg-slate-100 border border-slate-500 rounded-lg">
                            <div className="pl-[5%] pr-[5%] pt-2 w-full mb-6">

                                <div className="pl-[5%] pr-[5%] pt-2 w-full text-center">
                                    {
                                        (educationData.length > 0 && expData.length > 0 && skillData.length > 0) ? (<div><p>You can proceed to your dashboard</p><Button color="accent" onClick={() => goToDashboard()}> {goToDashboardClicked ? <Loading /> : <span></span>} Proceed</Button></div>) : ''
                                    }
                                </div>
                                <div>
                                    <p className="border-b border-slate-300 pb-4">Profile Details</p>
                                </div>
                                <div className="md:grid md:grid-cols-3">
                                    <div>
                                        <div className="flex w-full component-preview p-4 items-center justify-center gap-2 font-sans">
                                            <div className="form-control w-full ">
                                                <label className="label">
                                                    <span className="label-text text-black">Full name</span>
                                                </label>
                                                <Input defaultValue={fullName} className="bg-white" placeholder="Ex: John Doe" onChange={(e) => setFullName(e.target.value)} />
                                                <div className="text-red-600 text-sm">{fullNameError}</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex w-full component-preview p-4 items-center justify-center gap-2 font-sans">
                                            <div className="form-control w-full ">
                                                <label className="label">
                                                    <span className="label-text text-black">Email</span>
                                                </label>
                                                <Input defaultValue={email} className="bg-white" placeholder="Ex: someone@mail.com" onChange={(e) => setEmail(e.target.value)} />
                                                <div className="text-red-600 text-sm">{emailError}</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex w-full component-preview p-4 items-center justify-center gap-2 font-sans">
                                            <div className="form-control w-full ">
                                                <label className="label">
                                                    <span className="label-text text-black">Phone Number</span>
                                                </label>
                                                <Input defaultValue={phoneNumber} className="bg-white" placeholder="Ex: 0700100100" onChange={(e) => setPhoneNumber(e.target.value)} />
                                                <div className="text-red-600 text-sm">{phoneNumberError}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="md:grid md:grid-cols-3 mb-2">
                                    <div>
                                        <div className="flex w-full component-preview p-4 items-center justify-center gap-2 font-sans">
                                            <div className="form-control w-full">
                                                <label className="label">
                                                    <span className="label-text text-black">DOB</span>
                                                </label>
                                                <Input defaultValue={dob} type="date" className="bg-white" onChange={(e) => setDob(e.target.value)} />
                                                <div className="text-red-600 text-sm">{dobError}</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex w-full component-preview p-4 items-center justify-center gap-2 font-sans">
                                            <div className="form-control w-full">
                                                <label className="label">
                                                    <span className="label-text text-black">Location</span>
                                                </label>
                                                <Input defaultValue={location} className="bg-white" placeholder="Ex: Nairobi, Kenya" onChange={(e) => setLocation(e.target.value)} />
                                                <div className="text-red-600 text-sm">{locationError}</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex w-full component-preview p-4 items-center justify-center gap-2 font-sans">
                                            <div className="form-control w-full">
                                                <label className="label">
                                                    <span className="label-text text-black">Professional Title</span>
                                                </label>
                                                <Input defaultValue={professionalTitle} className="bg-white" placeholder="Ex: Software Engineer" onChange={(e) => setProfessionalTitle(e.target.value)} />
                                                <div className="text-red-600 text-sm">{professionalTitleError}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-3">
                                    <Button onClick={addProfile} className="w-full border border-slate-200" color="success" >
                                        {addProfileClicked ? <Loading /> : ''} Save Profile Information
                                    </Button>
                                </div>
                            </div>
                            <div className="pl-[5%] pr-[5%] pt-2 w-full">
                                <div>
                                    <p className="border-b border-slate-300 pb-4">More Details</p>
                                </div>
                                <EducationWidget user_id={user.uid} />

                                <ExperienceWidget user_id={user.uid} />

                                <SkillWidget user_id={user.uid} />
                            </div>
                            <div className="pl-[5%] pr-[5%] pt-2 w-full text-center mb-4">

                                {
                                    (educationData.length > 0 && expData.length > 0 && skillData.length > 0) ? (<div><p>You can proceed to your dashboard</p><Button color="accent" onClick={() => goToDashboard()}> {goToDashboardClicked ? <Loading /> : <span></span>} Proceed</Button></div>) : ''
                                }
                            </div>
                        </div>
                    </div>
                    {
                        showSuccessProfile ? <div className="absolute top-2 right-2">
                            <Alert className="bg-[#22c55ea8] border border-green-500 text-black" icon={<svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6 " fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>}>
                                <span className="font-semibold">Profile saved!</span>
                            </Alert>
                        </div> : <div></div>
                    }


                </main>
            );
        }
    }
}

export default MoreInformation;