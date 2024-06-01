'use client'
import Image from 'next/image';
import Link from 'next/link';
import { Navbar, Menu, Button, Dropdown } from 'react-daisyui';
import profile from '@/app/images/profile.jpg';
import about from '@/app/images/about-site-two.jpg';


const SiteTwo = () => {
    return (
        <div>
            <div className='w-[100%] h-[90vh] md:w-[65vw] md:h-[85vh] bg-green-500'></div>
            <div className='absolute top-0 w-full'>
                <Navbar>
                    <Navbar.Start>
                        <Dropdown>
                            <Button tag="label" color="ghost" tabIndex={0} className="lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
                                </svg>
                            </Button>
                            <Dropdown.Menu tabIndex={0} className="w-52 bg-white text-black  menu-sm mt-3 z-[1]">
                                <li>
                                    <Link href={"/websites/site-two-cv"}>Curriculum-vitae</Link>
                                </li>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Link className="btn btn-ghost normal-case text-xl" href={'/websites/site-two'}>PS</Link>
                    </Navbar.Start>
                    <Navbar.End className="hidden lg:flex">
                        <Menu horizontal className="px-1">
                            <Menu.Item>
                                <Link href={"/websites/site-two-cv"}>Curriculum-vitae</Link>
                            </Menu.Item>
                        </Menu>
                    </Navbar.End>
                </Navbar>
                <div className='grid grid-cols-1 md:grid-cols-2 pl-8 pr-8 md:pl-[20%] md:pr-[20%] mt-16 md:mt-0 items-center'>
                    <div>
                        <p className='mb-2'><span className='text-base'>My Name is</span> <span className='font-bold text-xl md:text-2xl text-[#1E1B4B]'>Pam Joe</span></p>
                        <p className='mb-2 text-2xl text-white font-semibold'>Digital Product Design</p>
                        <p className='text-xl'>Google Inc</p>
                    </div>
                    <div>
                        <Image src={profile} className='mt-2 md:mt-0 w-[60vw] h-[40vh] md:h-[60vh] md:w-[40vw] rounded-lg' />
                    </div>
                </div>
            </div>
            <div className='pl-6 pr-6 md:pl-[8%] md:pr-[8%] mt-6 md:mt-[4%]'>
                {/* about */}
                <p className='font-bold text-xl md:mb-6' >About</p>
                <div className='grid grid-cols-1 md:grid-cols-2 items-center'>
                    <div className='hidden md:block'>
                        <Image src={about} className='mt-2 md:mt-0 w-[60vw] h-[40vh] md:h-[40vh] md:w-[30vw] rounded-lg' />
                    </div>
                    <div>
                        <p className='text-xs md:text-sm'>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio, facilis recusandae quod labore dolorum nostrum itaque nulla tenetur deserunt natus nobis libero non aliquam nam est laborum, neque, tempore repellendus?
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio, facilis recusandae quod labore dolorum nostrum itaque nulla tenetur deserunt natus nobis libero non aliquam nam est laborum, neque, tempore repellendus?
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio, facilis recusandae quod labore dolorum nostrum itaque nulla tenetur deserunt natus nobis libero non aliquam nam est laborum, neque, tempore repellendus?
                        </p>
                    </div>
                </div>
                {/* about */}

                <div className='grid grid-cols-1 md:grid-cols-2 md:mt-[8%]'>
                    {/* skills */}
                    <div className='mt-6 md:mt-0'>
                        <p className='font-bold text-xl mb-2 md:mb-6' >Skills</p>
                        <div className='mb-4'>
                            <p className='text-sm font-semibold'>CSS</p>
                            <div className="w-[80%] bg-black rounded-full h-2 md:h-1.8 lg:h-2.5 dark:bg-black mt-1">
                                <div className={`bg-green-500 h-2 md:h-1.8 lg:h-2.5 rounded-full w-[60%]`}></div>
                            </div>
                        </div>

                        <div className='mb-4'>
                            <p className='text-sm font-semibold'>Javascript</p>
                            <div className="w-[80%] bg-black rounded-full h-2 md:h-1.8 lg:h-2.5 dark:bg-black mt-1">
                                <div className={`bg-green-500 h-2 md:h-1.8 lg:h-2.5 rounded-full w-[60%]`}></div>
                            </div>
                        </div>

                        <div className='mb-4'>
                            <p className='text-sm font-semibold'>Html</p>
                            <div className="w-[80%] bg-black rounded-full h-2 md:h-1.8 lg:h-2.5 dark:bg-black mt-1">
                                <div className={`bg-green-500 h-2 md:h-1.8 lg:h-2.5 rounded-full w-[60%]`}></div>
                            </div>
                        </div>

                    </div>
                    {/* skills */}

                    {/* awards */}
                    <div className='mt-6 md:mt-0'>
                        <p className='font-bold text-xl mb-2 md:mb-6'>Awards</p>
                        <div className='mb-4'>
                            <p className='font-semibold text-sm'>Award One</p>
                            <p className='text-xs'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi saepe accusantium, voluptatem nisi illum iusto error odio! Velit sit animi, dignissimos aliquam numquam error hic id suscipit magnam, cupiditate reiciendis?</p>
                        </div>
                        <div className='mb-4'>
                            <p className='font-semibold text-sm'>Award One</p>
                            <p className='text-xs'>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi saepe accusantium, voluptatem nisi illum iusto error odio! Velit sit animi, dignissimos aliquam numquam error hic id suscipit magnam, cupiditate reiciendis?
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi saepe accusantium, voluptatem nisi illum iusto error odio! Velit sit animi, dignissimos aliquam numquam error hic id suscipit magnam, cupiditate reiciendis?
                            </p>
                        </div>
                    </div>
                    {/* awards */}
                </div>
            </div>
        </div>
    );
}

export default SiteTwo;