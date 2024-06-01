'use client'
import { Navbar, Menu, Button, Dropdown } from 'react-daisyui';
import Image from "next/image";
import profileImage from '@/app/images/profile.jpeg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocation, faLocationArrow, faMailBulk, faPhone } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import dummyPhoto from '@/app/images/profile-user.png';


const SiteOne = ({ mData }) => {
    const [data, setData] = useState(mData);
    const router = usePathname();

    const param_id = router;
    let param = param_id.substring(6, param_id.length);

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
                                    <Link href={`/site/sites/site-one-cv/${param}`}>Curriculum-vitae</Link>
                                </li>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Link className="btn btn-ghost normal-case text-xl" href={`/site/${param}`}>PS</Link>
                    </Navbar.Start>

                    <Navbar.End className="hidden lg:flex">
                        <Menu horizontal className="px-1">
                            <Menu.Item>
                                <Link href={`/site/sites/site-one-cv/${param}`}>Curriculum-vitae</Link>
                            </Menu.Item>
                        </Menu>
                    </Navbar.End>
                </Navbar>
                <div className="text-center h-[50vh] pl-2 pr-2  md:pl-20 md:pr-20 justify-center flex flex-col md:flex-row md:items-center md:gap-10 md:justify-center">
                    {/* image */}
                    <div className='flex justify-center'>
                        {
                            data.profile.file_url ? <Image src={data.profile.file_url} width={130} className="w-[30%] border-2 border-white md:w-[100%] md:h-[80%] rounded-full border-6" />: 
                            <Image src={dummyPhoto} width={130} className="w-[30%] border-2 border-white md:w-[100%] md:h-[80%] rounded-full border-6" />
                        }
                        
                    </div>
                    {/* image */}
                    <div>
                        <p className='text-white'>{data.profile.full_name}.</p>
                        <p className='text-white'>{data.profile.professionTitle}</p>
                        {/* <p className='font-bold'>Google Inc</p> */}
                    </div>
                </div>
                <div className='flex flex-wrap justify-center gap-4 w-full text-xs pb-2 pl-2 pr-2 text-white'>
                    {/* icon one */}
                    <div className='flex gap-1 '>
                        <p>{data.profile.phoneNumber}</p>
                    </div>

                    <div className='flex gap-1'>
                        <p>{data.profile.location}</p>
                    </div>

                    {/* icon two */}
                    <div className='flex gap-1'>
                        <p>{data.profile.email}</p>
                    </div>
                </div>
            </div>

            <div className='pl-6 pr-6 pt-6 md:pl-20 md:pr-20 mb-5 md:mb-10'>
                <p className='text-orange-500 mb-2'>About Me</p>
                <p className='text-xs'>
                    {data.about}
                </p>
            </div>

            <div className='md:flex md:gap-[10%] md:pl-20 md:pr-20 mb-5 md:mb-10'>
                <div className='pl-6 pr-6 pt-6 md:w-[45%] sm:mb-5'>
                    <p className='text-orange-500 mb-2'>Skills</p>
                    {
                        data.skills.map((skill, index) => (
                            <div className='mb-4'>
                                <p className='text-sm font-semibold'>{skill.name}</p>
                                <div className="w-full bg-black rounded-full h-2 md:h-1.8 lg:h-2.5 dark:bg-black mt-1">
                                    <div className={`bg-orange-500 h-2 md:h-1.8 lg:h-2.5 rounded-full w-[${(skill.skillLevel / 10) * 100}%]`}></div>
                                </div>
                            </div>
                        ))
                    }

                </div>

                <div className='pl-6 pr-6 pt-6 md:w-[45%] sm:mt-5'>
                    <p className='text-orange-500 mb-2'>Experience</p>
                    {
                        data.experiences.map((experience, index) => (
                            <div className='flex gap-4 justify-between text-sm pb-2' key={index}>
                                <p>{experience.title}</p>
                                <p>{experience.companyName}</p>
                                <p>{experience.startDate} - {experience.endDate}</p>
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className='pl-6 pr-6 pt-6 md:pl-20 md:pr-20 mb-4'>
                <p className='text-orange-500 mb-2'>Awards</p>
                {/* award one */}

                <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg: lg:grid-cols-2'>
                    {
                        data.awards.map((award, index) => (
                            <div key={index}>
                                <p className='font-semibold text-sm'>{award.award}</p>
                                <p className='text-xs'>{award.description}</p>
                            </div>
                        ))
                    }
                </div>

            </div>
        </div>
    );
}

export default SiteOne;