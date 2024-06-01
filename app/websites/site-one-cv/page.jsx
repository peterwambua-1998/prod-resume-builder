'use client'
import { Navbar, Menu, Button, Dropdown } from 'react-daisyui'
import Link from 'next/link';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';


const SiteOneCv = () => {
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
                                    <Link href={"/websites/site-one"}>Home</Link>
                                </li>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Link className="btn btn-ghost normal-case text-xl" href={'/websites/site-one'}>PS</Link>
                    </Navbar.Start>

                    <Navbar.End className="hidden lg:flex">
                        <Menu horizontal className="px-1">
                            <Menu.Item>
                                <Link href={"/websites/site-one"}>Home</Link>
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
                        <div className='mb-4'>
                            <p className='font-bold mb-2'>Business Consultant</p>
                            <p className='text-xs text-black/50 mb-2'>Fauget Company  -  (2017 - 2022)</p>
                            <p className='text-sm'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio eligendi, debitis fugiat sed sit est assumenda libero placeat nemo. Reiciendis illo, reprehenderit adipisci exercitationem harum omnis? Doloribus delectus eos asperiores? </p>
                        </div>

                        <div className='mb-4'>
                            <p className='font-bold mb-2'>Business Consultant</p>
                            <p className='text-xs text-black/50 mb-2'>Fauget Company  -  (2017 - 2022)</p>
                            <p className='text-sm'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio eligendi, debitis fugiat sed sit est assumenda libero placeat nemo. Reiciendis illo, reprehenderit adipisci exercitationem harum omnis? Doloribus delectus eos asperiores? </p>
                        </div>

                        <div className='mb-4'>
                            <p className='font-bold mb-2'>Business Consultant</p>
                            <p className='text-xs text-black/50 mb-2'>Fauget Company  -  (2017 - 2022)</p>
                            <p className='text-sm'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio eligendi, debitis fugiat sed sit est assumenda libero placeat nemo. Reiciendis illo, reprehenderit adipisci exercitationem harum omnis? Doloribus delectus eos asperiores? </p>
                        </div>


                        <div className='mb-4'>
                            <p className='font-bold mb-2'>Business Consultant</p>
                            <p className='text-xs text-black/50 mb-2'>Fauget Company  -  (2017 - 2022)</p>
                            <p className='text-sm'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio eligendi, debitis fugiat sed sit est assumenda libero placeat nemo. Reiciendis illo, reprehenderit adipisci exercitationem harum omnis? Doloribus delectus eos asperiores? </p>
                        </div>


                        <div className='mb-4'>
                            <p className='font-bold mb-2'>Business Consultant</p>
                            <p className='text-xs text-black/50 mb-2'>Fauget Company  -  (2017 - 2022)</p>
                            <p className='text-sm'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio eligendi, debitis fugiat sed sit est assumenda libero placeat nemo. Reiciendis illo, reprehenderit adipisci exercitationem harum omnis? Doloribus delectus eos asperiores? </p>
                        </div>

                        <div className='mb-4'>
                            <p className='font-bold mb-2'>Business Consultant</p>
                            <p className='text-xs text-black/50 mb-2'>Fauget Company  -  (2017 - 2022)</p>
                            <p className='text-sm'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio eligendi, debitis fugiat sed sit est assumenda libero placeat nemo. Reiciendis illo, reprehenderit adipisci exercitationem harum omnis? Doloribus delectus eos asperiores? </p>
                        </div>

                    </TabPanel>
                    <TabPanel className="pl-2 pr-2">
                        <div className='mb-4'>
                            <p className='font-bold mb-2'>High School</p>
                            <p className='text-xs text-black/50 mb-2'>Fauget school  -  (2017 - 2022)</p>
                            <p className='text-sm'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio eligendi, debitis fugiat sed sit est assumenda libero placeat nemo. Reiciendis illo, reprehenderit adipisci exercitationem harum omnis? Doloribus delectus eos asperiores? </p>
                        </div>

                        <div className='mb-4'>
                            <p className='font-bold mb-2'>Primary</p>
                            <p className='text-xs text-black/50 mb-2'>Fauget school  -  (2017 - 2022)</p>
                            <p className='text-sm'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio eligendi, debitis fugiat sed sit est assumenda libero placeat nemo. Reiciendis illo, reprehenderit adipisci exercitationem harum omnis? Doloribus delectus eos asperiores? </p>
                        </div>
                    </TabPanel>
                    <TabPanel className="pl-2 pr-2">
                        <div className='mb-4'>
                            <p className='font-bold mb-2'>Award One</p>

                            <p className='text-sm'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio eligendi, debitis fugiat sed sit est assumenda libero placeat nemo. Reiciendis illo, reprehenderit adipisci exercitationem harum omnis? Doloribus delectus eos asperiores? </p>
                        </div>

                        <div className='mb-4'>
                            <p className='font-bold mb-2'>Award Two</p>

                            <p className='text-sm'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio eligendi, debitis fugiat sed sit est assumenda libero placeat nemo. Reiciendis illo, reprehenderit adipisci exercitationem harum omnis? Doloribus delectus eos asperiores? </p>
                        </div>
                    </TabPanel>
                    <TabPanel className="pl-2 pr-2">
                        <div className='mb-4'>
                            <p className='font-bold mb-2'>Business Consultant</p>
                            <p className='text-xs text-black/50 mb-2'>Fauget Company  -  (2017 - 2022)</p>
                            <p className='text-sm'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio eligendi, debitis fugiat sed sit est assumenda libero placeat nemo. Reiciendis illo, reprehenderit adipisci exercitationem harum omnis? Doloribus delectus eos asperiores? </p>
                        </div>

                        <div className='mb-4'>
                            <p className='font-bold mb-2'>Business Consultant</p>
                            <p className='text-xs text-black/50 mb-2'>Fauget Company  -  (2017 - 2022)</p>
                            <p className='text-sm'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio eligendi, debitis fugiat sed sit est assumenda libero placeat nemo. Reiciendis illo, reprehenderit adipisci exercitationem harum omnis? Doloribus delectus eos asperiores? </p>
                        </div>

                        <div className='mb-4'>
                            <p className='font-bold mb-2'>Business Consultant</p>
                            <p className='text-xs text-black/50 mb-2'>Fauget Company  -  (2017 - 2022)</p>
                            <p className='text-sm'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio eligendi, debitis fugiat sed sit est assumenda libero placeat nemo. Reiciendis illo, reprehenderit adipisci exercitationem harum omnis? Doloribus delectus eos asperiores? </p>
                        </div>


                        <div className='mb-4'>
                            <p className='font-bold mb-2'>Business Consultant</p>
                            <p className='text-xs text-black/50 mb-2'>Fauget Company  -  (2017 - 2022)</p>
                            <p className='text-sm'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio eligendi, debitis fugiat sed sit est assumenda libero placeat nemo. Reiciendis illo, reprehenderit adipisci exercitationem harum omnis? Doloribus delectus eos asperiores? </p>
                        </div>


                        <div className='mb-4'>
                            <p className='font-bold mb-2'>Business Consultant</p>
                            <p className='text-xs text-black/50 mb-2'>Fauget Company  -  (2017 - 2022)</p>
                            <p className='text-sm'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio eligendi, debitis fugiat sed sit est assumenda libero placeat nemo. Reiciendis illo, reprehenderit adipisci exercitationem harum omnis? Doloribus delectus eos asperiores? </p>
                        </div>

                        <div className='mb-4'>
                            <p className='font-bold mb-2'>Business Consultant</p>
                            <p className='text-xs text-black/50 mb-2'>Fauget Company  -  (2017 - 2022)</p>
                            <p className='text-sm'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio eligendi, debitis fugiat sed sit est assumenda libero placeat nemo. Reiciendis illo, reprehenderit adipisci exercitationem harum omnis? Doloribus delectus eos asperiores? </p>
                        </div>

                    </TabPanel>
                    <TabPanel className="pl-2 pr-2">
                        <ul style={{ listStyleType: 'disc' }} className="text-black pl-4 pr-2 ">
                            <li>Hobby One</li>
                            <li>Hobby One</li>
                            <li>Hobby One</li>
                            <li>Hobby One</li>
                        </ul>
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    );
}

export default SiteOneCv;