'use client'
import { Navbar, Menu, Button, Dropdown, Loading } from 'react-daisyui'
import Link from 'next/link';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { doc, getDoc, where } from "firebase/firestore";
import { awardsGlobal, educationGlobal, experiencesGlobal, hobbiesGlobal, internshipsGlobal, profileGlobal, skillsGlobal } from "@/app/dashboard/cv-create/proceed/templates/helpers/helpers";
import { db } from '@/app/firebase/firebase';

const SiteOneCv = () => {
    const router = usePathname();
    const [loading, setLoading] = useState(true);
    const param_id = router;
    let param = param_id.substring(24, param_id.length);
    const route = useRouter();

    const [data, setData] = useState(null);

    async function getUser() {

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

            const hobbies = await hobbiesGlobal(param);

            let all_data = {
                user_id: param,
                site_type: docSnap.data()['site_type'],
                about: ab,
                profile: profile,
                awards: awards,
                education: education,
                experiences: experiences,
                internships: internships,
                skills: skills,
                hobbies: hobbies,
            }

            setData(all_data);
            console.log(all_data);
            setLoading(false);
        } else {
            setLoading(false);
            route.push('/');
        }
    }

    useEffect(() => {
        getUser();
    }, [])

    if (loading) {
        return (<main className="flex min-h-screen items-center justify-center bg-white"><Loading size="lg" color="default" variant="dots" /></main>)
    }

    return (
        <div>
            <div className='bg-orange-500'>
                <Navbar className='my-font bg-transparent text-white'>
                    <Navbar.Start>
                        <Dropdown>
                            <Button tag="label" color="ghost" tabIndex={0} className="lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
                                </svg>
                            </Button>
                            <Dropdown.Menu tabIndex={0} className="w-52 bg-white text-black  menu-sm mt-3 z-[1]">
                                <li>
                                    <Link href={`/site/${param}`}>Home</Link>
                                </li>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Link className="btn btn-ghost normal-case text-xl" href={`/site/${param}`}>PS</Link>
                    </Navbar.Start>

                    <Navbar.End className="hidden lg:flex">
                        <Menu horizontal className="px-1">
                            <Menu.Item>
                                <Link href={`/site/${param}`}>Home</Link>
                            </Menu.Item>
                        </Menu>
                    </Navbar.End>
                </Navbar>
            </div>
            <div className='pl-2 pr-2 pt-4 md:pl-[20%] md:pr-[20%]'>
                <Tabs>
                    <TabList className='flex gap-4 bg-blue-950 p-3 rounded-lg mb-5 text-xs md:text-xs lg:text-xs overflow-x-auto'>
                        <Tab selectedClassName="active-tab" className='m-tabs pt-2 pb-2 pl-4 pr-4 text-white font-semibold hover:cursor-pointer'>Experience</Tab>
                        <Tab selectedClassName="active-tab" className='m-tabs pt-2 pb-2 pl-4 pr-4 text-white font-semibold hover:cursor-pointer'>Education</Tab>
                        <Tab selectedClassName="active-tab" className='m-tabs pt-2 pb-2 pl-4 pr-4 text-white font-semibold hover:cursor-pointer'>Awards</Tab>
                        <Tab selectedClassName="active-tab" className='m-tabs pt-2 pb-2 pl-4 pr-4 text-white font-semibold hover:cursor-pointer'>Internship</Tab>
                        <Tab selectedClassName="active-tab" className='m-tabs pt-2 pb-2 pl-4 pr-4 text-white font-semibold hover:cursor-pointer'>Hobbies</Tab>
                    </TabList>
                    <TabPanel className="pl-2 pr-2">
                        
                        {
                            data.experiences.map((experience, index) => (
                                <div className='mb-4' key={index}>
                                    <p className='font-bold mb-2'>{experience.title}</p>
                                    <p className='text-xs text-black/50 mb-2'>{experience.companyName}  -  ({experience.startDate} - {experience.endDate})</p>
                                    <p className='text-sm'>{experience.description}</p>
                                </div>
                            ))
                        }


                    </TabPanel>
                    <TabPanel className="pl-2 pr-2">
                        {
                            data.education.map((edu, index) => (
                                <div className='mb-4' key={index}>
                                    <p className='font-bold mb-2'>{edu.degree}, {edu.fieldStudy}</p>
                                    <p className='text-xs text-black/50 mb-2'>{edu.school} ({edu.startDate} - {edu.endDate})</p>
                                    <p className='text-sm'>{edu.descriptionEdu}</p>
                                </div>
                            ))
                        }

                    </TabPanel>
                    <TabPanel className="pl-2 pr-2">
                        {
                            data.awards.map((award, index) => (
                                <div className='mb-4' key={index}>
                                    <p className='font-bold mb-2'>{award.award}</p>

                                    <p className='text-sm'>{award.description} </p>
                                </div>
                            ))
                        }
                    </TabPanel>
                    <TabPanel className="pl-2 pr-2">
                        {
                            data.internships.map((internship, index) => (
                                <div className='mb-4' key={index}>
                                    <p className='font-bold mb-2'>{internship.organization}, {internship.role}</p>
                                    <p className='text-xs text-black/50 mb-2'>{internship.duration} month(s)</p>
                                    <p className='text-sm'>{internship.description} </p>
                                </div>
                            ))
                        }
                    </TabPanel>
                    <TabPanel className="pl-2 pr-2">
                        <ul style={{ listStyleType: 'disc' }} className="text-black pl-4 pr-2 ">
                        {
                            data.hobbies.map((hobby, index) => (
                                <li key={index}>{hobby.title}</li>
                            ))
                        }
                        </ul>
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    );
}

export default SiteOneCv;