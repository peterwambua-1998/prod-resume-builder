'use client'
import { useAuthState } from "react-firebase-hooks/auth";
import { createContext, useEffect, useLayoutEffect, useState } from 'react';
import { auth, db } from '@/app/firebase/firebase';
import { useRouter, usePathname } from 'next/navigation';
import { Navbar, Menu, Button, Loading } from 'react-daisyui'
import '@/app/globals.css';
import Link from 'next/link';
import NavLinks from "../../navbar/navlinks";
import { doc, getDoc, where } from "firebase/firestore";
import { awardsGlobal, educationGlobal, experiencesGlobal, internshipsGlobal, profileGlobal, skillsGlobal } from "@/app/dashboard/cv-create/proceed/templates/helpers/helpers";
import SiteOne from "../sites/site-one/page";
import SiteTwo from "../sites/site-two/page";
import SiteThree from "../sites/site-three/page";

const UserSite = () => {
    const [loading, setLoading] = useState(true);
    const router = usePathname();
    const [data, setData] = useState(null);

    async function getUser() {
        const param_id = router;
        let param = param_id.substring(6, param_id.length);
        const docRef = doc(db, "user-website", param);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            // get details
            const about = await getDoc(doc(db, "about", param));

            let ab = null;

            if (about.exists()) {
                ab = about.data()['description'];
            }

            const profile = await profileGlobal(param);

            const awards = await awardsGlobal(param);

            const education = await educationGlobal(param);

            const experiences = await experiencesGlobal(param);

            const internships = await internshipsGlobal(param);

            const skills = await skillsGlobal(param);
            
            let site_types = docSnap.data()['site_type'];

            let all_data = {
                user_id: param,
                site_type: site_types,
                about: ab,
                profile: profile,
                awards: awards,
                education: education,
                experiences: experiences,
                internships: internships,
                skills: skills
            }

            setData(all_data);
            setLoading(false);
        } else {
            setLoading(false);
            router.push('/');
        }
    }

    useEffect(() => {
        getUser();
    }, [])


    if (loading) {
        return (<main className="flex min-h-screen items-center justify-center bg-white"><Loading size="lg" color="default" variant="dots" /></main>)
    }

    return (
        <>
        {
            data.site_type == 1 ? 
            <SiteOne mData={data} /> 
            :
            data.site_type == 2 ? 
            <SiteTwo mData={data} /> 
            :
            data.site_type == 3 ? 
            <SiteThree mData={data} />
            : 
            <div></div>
        }
        </>
    );
}

export default UserSite;