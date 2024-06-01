'use client'
import Link from "next/link";
import { Badge, Button, Dropdown, Hero, Menu, Navbar } from "react-daisyui";
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import dummyPhoto from '@/app/images/profile-user.png';


const SiteThree = ({ mData }) => {
    const [data, setData] = useState(mData);
    const router = usePathname();

    const param_id = router;
    let param = param_id.substring(6, param_id.length);

    return (
        <div>
            <Navbar className="bg-violet-500">
                <Navbar.Start>
                    <Dropdown>
                        <Button tag="label" color="ghost" tabIndex={0} className="lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </Button>
                        <Dropdown.Menu tabIndex={0} className="w-52 bg-white text-black  menu-sm mt-3 z-[1]">
                            <li>
                                <Link href={`/site/sites/site-three-cv/${param}`}>Curriculum vitae</Link>
                            </li>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Link className="btn btn-ghost normal-case text-xl text-white" href={`/site/${param}`}>PS</Link>
                </Navbar.Start>
                <Navbar.End className="hidden lg:flex">
                    <Menu horizontal className="px-1">
                        <Menu.Item>
                            <Link className="text-white" href={`/site/sites/site-three-cv/${param}`}>Curriculum-vitae</Link>
                        </Menu.Item>
                    </Menu>
                </Navbar.End>
            </Navbar>
            <Hero className="h-[60vh] my-hero">
                <Hero.Overlay />
                <Hero.Content className="text-center">
                    <div className="max-w-md text-white">
                        <h1 className="text-5xl font-bold">Hello there</h1>
                        <p className="py-6">
                            My name is {data.profile.full_name}
                        </p>
                        <Link href={`/site/sites/site-three-cv/${param}`}><Button className="bg-violet-500 hover:bg-violet-600 text-white border-violet-500">Curriculum-vitae</Button></Link>
                    </div>
                </Hero.Content>
            </Hero>
            <div className='pl-6 pr-6 md:pl-[8%] md:pr-[8%] mt-6 md:mt-[4%]'>
                <p className='font-bold text-xl md:mb-6' >About</p>
                <p className="text-sm">{data.about}</p>
            </div>

            <div className='pl-6 pr-6 md:pl-[8%] md:pr-[8%] mt-6 md:mt-[4%] mb-6'>
                <p className='font-bold text-xl md:mb-6' >Skills</p>
                <div className="flex flex-wrap gap-6">
                    {
                        data.skills.map((skill, index) => (
                            <Badge className="p-4 bg-violet-200 border-violet-500 text-black" key={index}>{skill.name}</Badge>
                        ))
                    }
                </div>
            </div>

            <div className='pl-6 pr-6 md:pl-[8%] md:pr-[8%] mt-6 md:mt-[4%] mb-6'>
                <p className='font-bold text-xl md:mb-6' >Awards</p>
                <div className="grid grid-cols-1 md:gap-6 md:grid-cols-2">
                    {
                        data.awards.map((award, index) => (
                            <div className='mb-4' key={index}>
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

export default SiteThree;