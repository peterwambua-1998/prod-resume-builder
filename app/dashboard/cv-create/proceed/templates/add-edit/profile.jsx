
'use client'
import { db } from "@/app/firebase/firebase";
import { Timestamp, doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { useEffect, useState } from "react";
import { Skeleton, Button, Modal, Accordion, Input, Select, FileInput } from "react-daisyui";

const ProfileDetails = ({ userId }) => {
    const [profile, setProfile] = useState(null);
    let loading = true;
    const [visible, setVisible] = useState(false);

    const toggleVisible = () => {
        setVisible(!visible);
    };

    //profile info
    var [fullName, setFullName] = useState(null);
    var [email, setEmail] = useState(null);
    var [professionTitle, setProfessionTitle] = useState(null);
    var [dob, setDob] = useState(null);
    var [location, setLocation] = useState(null);
    var [martialStatus, setMartialStatus] = useState(null);
    var [phoneNumber, setPhoneNumber] = useState(null);
    var [file, setFile] = useState(null);
    var [fileURL, setFileURL] = useState(null);

    // profile errors
    const [fullNameError, setFullNameError] = useState(null);
    const [emailError, setEmailError] = useState(null);
    const [professionTitleError, setProfessionTitleError] = useState(null);
    const [dobError, setDobError] = useState(null);
    const [locationError, setLocationError] = useState(null);
    const [martialStatusError, setMartialStatusError] = useState(null);
    const [phoneNumberError, setPhoneNumberError] = useState(null);


    async function getProfile() {
        try {
            const usb = onSnapshot(doc(db, 'profile', userId), doc => {
                if (doc.data()) {
                    setProfile(doc.data());
                    addValues(doc.data());
                } else {
                    setProfile(null);
                }
            });
        } catch (error) {
            console.log(error);
        }


    }

    function addValues(data) {
        if (data) {
            setFullName(data.full_name);
            setEmail(data.email);
            setProfessionTitle(data.professionTitle);
            setPhoneNumber(data.phoneNumber);
            setDob(data.DOB);
            setLocation(data.location);
        }
    }

    async function addProfile() {
        let downloadURL = '';
        if (file) {
            const storage = getStorage();
            const storageRef = ref(storage, 'user/' + userId);
            const uploadTask = uploadBytesResumable(storageRef, file);
            downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        }

        if (fullName == null || !fullName) {
            setFullNameError('field required');
            return;
        } else {
            setFullNameError(null);
        }

        if (email == null || !email) {
            console.log(email);
            setEmailError('field required');
            return;
        } else {
            setEmailError(null);
        }

        if (professionTitle == null || !professionTitle) {
            setProfessionTitleError('field required');
            return;
        } else {
            setProfessionTitleError(null);
        }

        if (phoneNumber == null || !phoneNumber) {
            setPhoneNumberError('field required');
            return;
        } else {
            setPhoneNumberError(null);
        }

        if (dob == null || !dob) {
            setDobError('field required');
            return;
        } else {
            setDobError(null);
        }

        if (location == null || !location) {
            setLocationError('field required');
            return;
        } else {
            setLocationError(null);
        }


        try {
            if (downloadURL != '') {
                const data = {
                    full_name: fullName,
                    email: email,
                    professionTitle: professionTitle,
                    location: location,
                    DOB: dob,
                    martial_status: martialStatus,
                    phoneNumber: phoneNumber,
                    file_url: downloadURL,
                    created_at: Timestamp.now(),
                }
                await setDoc(doc(db, "profile", userId), data);
            } else {
                const data = {
                    full_name: fullName,
                    email: email,
                    professionTitle: professionTitle,
                    location: location,
                    DOB: dob,
                    martial_status: martialStatus,
                    phoneNumber: phoneNumber,
                    created_at: Timestamp.now(),
                }
                await setDoc(doc(db, "profile", userId), data);
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getProfile();
    }, [])

    if (profile == null) {
        return (
            <div className="mb-3">
                <Skeleton className="h-4 w-full bg-slate-400"></Skeleton>
            </div>
        )
    } else {

        return (
            <div className="mb-3">
                <Accordion  className="bg-amber-400 text-black " icon="arrow">
                    <Accordion.Title className=" font-bold text-black">
                        Profile
                    </Accordion.Title>
                    <Accordion.Content>
                        <div className="form-control w-full grow">
                            <div className="">
                                <Button className="bg-amber-200 border-amber-500 text-black" onClick={toggleVisible}>Add / Edit</Button>
                            </div>
                        </div>
                    </Accordion.Content>
                </Accordion>

                <Modal.Legacy open={visible} className="bg-white max-w-5xl">
                    <form>
                        <Modal.Header className="font-bold">About me</Modal.Header>
                        <Modal.Body className="p-0">
                            <div className="flex justify-center">
                                <div className="pl-4 pr-4 ">
                                    <label className="label text-center">
                                        <span className="label-text text-black ">Photo</span>
                                    </label>
                                    <FileInput color="warning" placeholder="choose" className="bg-white" onChange={(e) => setFile(e.target.files?.[0])} />
                                </div>

                                {/* <Input className="bg-white" type="file"  onChange={(e) => setFile(e.target.files?.[0])} /> */}
                            </div>
                            <div className="md:grid md:grid-cols-3">
                                <div>
                                    <div className="flex w-full component-preview p-1 md:p-4 lg:p-4 items-center justify-center gap-2 font-sans">
                                        <div className="form-control w-full ">
                                            <label className="label">
                                                <span className="label-text text-black">Full name</span>
                                            </label>

                                            <Input className="bg-white" defaultValue={profile.full_name ? profile.full_name : ''} placeholder="Ex: John Doe" onChange={(e) => setFullName(e.target.value)} />
                                            <div className="text-red-600 text-sm">{fullNameError}</div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex w-full component-preview p-1 md:p-4 lg:p-4 items-center justify-center gap-2 font-sans">
                                        <div className="form-control w-full ">
                                            <label className="label">
                                                <span className="label-text text-black">Email</span>
                                            </label>
                                            <Input className="bg-white" defaultValue={profile.email ? profile.email : ''} placeholder="Ex: someone@mail.com" onChange={(e) => setEmail(e.target.value)} />
                                            <div className="text-red-600 text-sm">{emailError}</div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex w-full component-preview p-1 md:p-4 lg:p-4 items-center justify-center gap-2 font-sans">
                                        <div className="form-control w-full ">
                                            <label className="label">
                                                <span className="label-text text-black">Profession title</span>
                                            </label>
                                            <Input className="bg-white" defaultValue={profile.professionTitle ? profile.professionTitle : ''} placeholder="Ex: Programmer" onChange={(e) => setProfessionTitle(e.target.value)} />
                                            <div className="text-red-600 text-sm">{professionTitleError}</div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="md:grid md:grid-cols-3 mb-2">
                                <div>
                                    <div className="flex w-full component-preview p-1 md:p-4 lg:p-4 items-center justify-center gap-2 font-sans">
                                        <div className="form-control w-full ">
                                            <label className="label">
                                                <span className="label-text text-black">Phone number</span>
                                            </label>
                                            <Input className="bg-white" defaultValue={profile.phoneNumber ? profile.phoneNumber : ''} placeholder="Ex: 07100200300" onChange={(e) => setPhoneNumber(e.target.value)} />
                                            <div className="text-red-600 text-sm">{phoneNumberError}</div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex w-full component-preview p-1 md:p-4 lg:p-4 items-center justify-center gap-2 font-sans">
                                        <div className="form-control w-full">
                                            <label className="label">
                                                <span className="label-text text-black">DOB</span>
                                            </label>
                                            <Input type="date" defaultValue={profile.DOB ? profile.DOB : ''} className="bg-white" onChange={(e) => setDob(e.target.value)} />
                                            <div className="text-red-600 text-sm">{dobError}</div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex w-full component-preview p-1 md:p-4 lg:p-4 items-center justify-center gap-2 font-sans">
                                        <div className="form-control w-full">
                                            <label className="label">
                                                <span className="label-text text-black">Location</span>
                                            </label>
                                            <Input className="bg-white" defaultValue={profile.location ? profile.location : ''} placeholder="Ex: Nairobi, Kenya" onChange={(e) => setLocation(e.target.value)} />
                                            <div className="text-red-600 text-sm">{locationError}</div>
                                        </div>
                                    </div>
                                </div>


                            </div>

                            <div className="md:grid md:grid-cols-3 mb-2">
                                <div>
                                    <div className="flex w-full component-preview p-1 md:p-4 lg:p-4 items-center justify-center gap-2 font-sans">
                                        <div className="form-control w-full">
                                            <label className="label">
                                                <span className="label-text text-black">Martial status (Optional)</span>
                                            </label>
                                            <Select className="bg-white" onChange={(e) => setMartialStatus(e.target.value)}>
                                                <option value={'Pick one'}>
                                                    Pick one
                                                </option>
                                                <option selected={profile.martial_status == "n/a" ? "selected" : null} value={'n/a'}>n/a</option>
                                                <option selected={profile.martial_status == "Single" ? "selected" : null} value={'Single'}>Single</option>
                                                <option selected={profile.martial_status == "Married" ? "selected" : null} value={'Married'}>Married</option>
                                                <option selected={profile.martial_status == "Divorced" ? "selected" : null} value={'Divorced'}>Divorced</option>
                                            </Select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Actions>
                            <Button type="button" onClick={toggleVisible} >Close</Button>
                            <Button type="button" className="bg-[#F59E0B] text-white border-none" onClick={addProfile}>Save</Button>
                        </Modal.Actions>
                    </form>
                </Modal.Legacy>
            </div>
        );
    }


}

export default ProfileDetails;