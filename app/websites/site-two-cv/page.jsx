'use client'
import Link from 'next/link';
import { Navbar, Menu, Button, Dropdown, Accordion } from 'react-daisyui';

const SiteTwoCv = () => {
    return (
        <div>
            <Navbar className='bg-green-500'>
                <Navbar.Start>
                    <Dropdown>
                        <Button tag="label" color="ghost" tabIndex={0} className="lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </Button>
                        <Dropdown.Menu tabIndex={0} className="w-52 bg-white text-black  menu-sm mt-3 z-[1]">
                            <li>
                                <Link href={"/websites/site-two"}>Home</Link>
                            </li>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Link className="btn btn-ghost normal-case text-xl" href={'/websites/site-two'}>PS</Link>
                </Navbar.Start>
                <Navbar.End className="hidden lg:flex">
                    <Menu horizontal className="px-1">
                            <Link href={"/websites/site-two"}>Home</Link>
                    </Menu>
                </Navbar.End>
            </Navbar>

            {/* accordions */}
            <div className='pl-2 pr-2 pt-4 md:pl-[16%] md:pr-[16%]'>
                <Accordion icon='arrow' defaultChecked className='border border-green-500 mb-6 bg-green-50'>
                    <Accordion.Title className="text-xl font-medium">
                        Experience
                    </Accordion.Title>
                    <Accordion.Content className='grid grid-cols-1 md:grid-cols-2 gap-10'>
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
                    </Accordion.Content>
                </Accordion>

                <Accordion icon='arrow' className='border border-red-500 bg-red-50 mb-6'>
                    <Accordion.Title className="text-xl font-medium">
                        Education
                    </Accordion.Title>
                    <Accordion.Content className='grid grid-cols-1 md:grid-cols-2 gap-10'>
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
                    </Accordion.Content>
                </Accordion>


                <Accordion icon='arrow' className='border border-amber-500 bg-amber-50 mb-6'>
                    <Accordion.Title className="text-xl font-medium">
                        Awards
                    </Accordion.Title>
                    <Accordion.Content className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                        <div className='mb-4'>
                            <p className='font-bold mb-2'>Award One</p>

                            <p className='text-sm'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio eligendi, debitis fugiat sed sit est assumenda libero placeat nemo. Reiciendis illo, reprehenderit adipisci exercitationem harum omnis? Doloribus delectus eos asperiores? </p>
                        </div>

                        <div className='mb-4'>
                            <p className='font-bold mb-2'>Award Two</p>

                            <p className='text-sm'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio eligendi, debitis fugiat sed sit est assumenda libero placeat nemo. Reiciendis illo, reprehenderit adipisci exercitationem harum omnis? Doloribus delectus eos asperiores? </p>
                        </div>
                    </Accordion.Content>
                </Accordion>

                <Accordion icon='arrow' className='border border-blue-500 bg-blue-50 mb-6'>
                    <Accordion.Title className="text-xl font-medium">
                    Internship
                    </Accordion.Title>
                    <Accordion.Content className='grid grid-cols-1 md:grid-cols-2 gap-10'>
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
                    </Accordion.Content>
                </Accordion>

                <Accordion icon='arrow' className='border border-purple-500 bg-purple-50 mb-6'>
                    <Accordion.Title className="text-xl font-medium">
                        Hobbies
                    </Accordion.Title>
                    <Accordion.Content className='text-sm'>
                        <p className='mb-2'>Hobby One</p>

                        <p className=' mb-2'>Hobby One</p>

                        <p className=' mb-2'>Hobby One</p>
                    </Accordion.Content>
                </Accordion>
            </div>
            {/* accordions */}
        </div>
    );
}

export default SiteTwoCv;