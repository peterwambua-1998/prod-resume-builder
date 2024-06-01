'use client'
import { Navbar, Menu, Button, Dropdown } from 'react-daisyui';
import Image from "next/image";
import profileImage from '@/app/images/profile.jpeg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocation, faLocationArrow, faMailBulk, faPhone } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const SiteOnePreview = () => {
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
                                    <Link href={"/websites/site-one-cv"}>Curriculum-vitae</Link>
                                </li>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Link className="btn btn-ghost normal-case text-xl" href={'/websites/site-one'}>PS</Link>
                    </Navbar.Start>
                    
                    <Navbar.End className="hidden lg:flex">
                        <Menu horizontal className="px-1">
                            <Menu.Item>
                                <Link href={"/websites/site-one-cv"}>Curriculum-vitae</Link>
                            </Menu.Item>
                        </Menu>
                    </Navbar.End>
                </Navbar>
                <div className="text-center h-[50vh] pl-2 pr-2  md:pl-20 md:pr-20 justify-center flex flex-col md:flex-row md:items-center md:gap-10 md:justify-center">
                    {/* image */}
                    <div className='flex justify-center'>
                        <Image src={profileImage} width={130} className="w-[30%] border-2 border-white md:w-[100%] md:h-[80%] rounded-full border-6" />
                    </div>
                    {/* image */}
                    <div>
                        <p className='text-white'>Pam Joe.</p>
                        <p className='text-white'>Digital Product Design</p>
                        <p className='font-bold'>Google Inc</p>
                    </div>
                </div>
                <div className='flex flex-wrap justify-center gap-4 w-full text-xs pb-2 pl-2 pr-2 text-white'>
                    {/* icon one */}
                    <div className='flex gap-1 '>
                        <p>0710111100</p>
                    </div>

                    <div className='flex gap-1'>
                        <p>AthiRiver, Machakos</p>
                    </div>

                    {/* icon two */}
                    <div className='flex gap-1'>
                        <p>pwambua25@gmail.com</p>
                    </div>
                </div>
            </div>

            <div className='pl-6 pr-6 pt-6 md:pl-20 md:pr-20 mb-5 md:mb-10'>
                <p className='text-orange-500 mb-2'>About Me</p>
                <p className='text-xs'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora suscipit accusantium quisquam enim laborum delectus omnis est corrupti sint, placeat fugiat aliquid, repellat ex, nesciunt adipisci! Voluptatem alias ex perspiciatis.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit temporibus quidem, nihil deserunt ipsum porro, expedita nostrum doloribus facilis nobis nisi dolor ea numquam corrupti quam! Quibusdam inventore fugit labore.
                </p>
            </div>

            <div className='md:flex md:gap-[10%] md:pl-20 md:pr-20 mb-5 md:mb-10'>
                <div className='pl-6 pr-6 pt-6 md:w-[45%] sm:mb-5'>
                    <p className='text-orange-500 mb-2'>Skills</p>
                    <div className='mb-4'>
                        <p className='text-sm font-semibold'>Html</p>
                        <div className="w-full bg-black rounded-full h-2 md:h-1.8 lg:h-2.5 dark:bg-black mt-1">
                            <div className={`bg-orange-500 h-2 md:h-1.8 lg:h-2.5 rounded-full w-[20%]`}></div>
                        </div>
                    </div>
                    <div className='mb-4'>
                        <p className='text-sm font-semibold'>CSS</p>
                        <div className="w-full bg-black rounded-full h-2 md:h-1.8 lg:h-2.5 dark:bg-black mt-1">
                            <div className={`bg-orange-500 h-2 md:h-1.8 lg:h-2.5 rounded-full w-[60%]`}></div>
                        </div>
                    </div>
                    <div className='mb-4'>
                        <p className='text-sm font-semibold'>Javascript</p>
                        <div className="w-full bg-black rounded-full h-2 md:h-1.8 lg:h-2.5 dark:bg-black mt-1">
                            <div className={`bg-orange-500 h-2 md:h-1.8 lg:h-2.5 rounded-full w-[100%]`}></div>
                        </div>
                    </div>
                    <div className='mb-4'>
                        <p className='text-sm font-semibold'>Javascript</p>
                        <div className="w-full bg-black rounded-full h-2 md:h-1.8 lg:h-2.5 dark:bg-black mt-1">
                            <div className={`bg-orange-500 h-2 md:h-1.8 lg:h-2.5 rounded-full w-[90%]`}></div>
                        </div>
                    </div>
                    <div className='mb-4'>
                        <p className='text-sm font-semibold'>Javascript</p>
                        <div className="w-full bg-black rounded-full h-2 md:h-1.8 lg:h-2.5 dark:bg-black mt-1">
                            <div className={`bg-orange-500 h-2 md:h-1.8 lg:h-2.5 rounded-full w-[5%]`}></div>
                        </div>
                    </div>
                    <div className='mb-4'>
                        <p className='text-sm font-semibold'>Javascript</p>
                        <div className="w-full bg-black rounded-full h-2 md:h-1.8 lg:h-2.5 dark:bg-black mt-1">
                            <div className={`bg-orange-500 h-2 md:h-1.8 lg:h-2.5 rounded-full w-[70%]`}></div>
                        </div>
                    </div>
                </div>

                <div className='pl-6 pr-6 pt-6 md:w-[45%] sm:mt-5'>
                    <p className='text-orange-500 mb-2'>Experience</p>
                    <div className='flex gap-4 justify-between text-sm pb-2'>
                        <p>Programmer</p>
                        <p>Google</p>
                        <p>2021 - 2023</p>
                    </div>
                    <div className='flex gap-4 justify-between pt-2 text-sm pb-2'>
                        <p>Programmer</p>
                        <p>Google</p>
                        <p>2021 - 2023</p>
                    </div>
                </div>
            </div>

            <div className='pl-6 pr-6 pt-6 md:pl-20 md:pr-20 mb-4'>
                <p className='text-orange-500 mb-2'>Awards</p>
                {/* award one */}

                <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg: lg:grid-cols-2'>
                    <div>
                        <p className='font-semibold text-sm'>Award One</p>
                        <p className='text-xs'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi saepe accusantium, voluptatem nisi illum iusto error odio! Velit sit animi, dignissimos aliquam numquam error hic id suscipit magnam, cupiditate reiciendis?</p>
                    </div>
                    <div>
                        <p className='font-semibold text-sm'>Award One</p>
                        <p className='text-xs'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi saepe accusantium, voluptatem nisi illum iusto error odio! Velit sit animi, dignissimos aliquam numquam error hic id suscipit magnam, cupiditate reiciendis?</p>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default SiteOnePreview;