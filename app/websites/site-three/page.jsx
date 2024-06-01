'use client'
import Link from "next/link";
import { Badge, Button, Dropdown, Hero, Menu, Navbar } from "react-daisyui";
import newprof from '@/app/images/new-prof.jpg';

const SiteThree = () => {
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
                                <Link href={"/websites/site-three-cv"}>Curriculum vitae</Link>
                            </li>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Link className="btn btn-ghost normal-case text-xl text-white" href={'/websites/site-three'}>PS</Link>
                </Navbar.Start>
                <Navbar.End className="hidden lg:flex">
                    <Menu horizontal className="px-1">
                        <Menu.Item>
                            <Link className="text-white" href={"/websites/site-three-cv"}>Curriculum-vitae</Link>
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
                            My name is Pam Sam
                        </p>
                        <Link href={"/websites/site-three-cv"}><Button className="bg-violet-500 hover:bg-violet-600 text-white border-violet-500">Curriculum-vitae</Button></Link>
                    </div>
                </Hero.Content>
            </Hero>
            <div className='pl-6 pr-6 md:pl-[8%] md:pr-[8%] mt-6 md:mt-[4%]'>
                <p className='font-bold text-xl md:mb-6' >About</p>
                <p className="text-sm">Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis molestiae, ullam nisi cumque dolore laudantium aperiam. Aliquid laborum dicta molestiae quaerat placeat non, quibusdam, repudiandae tenetur accusamus pariatur voluptas commodi. Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem, animi ad! Maxime natus non, in ipsa reiciendis, unde soluta quod quaerat enim modi voluptatum repellendus provident officiis aut sapiente ad.</p>
            </div>

            <div className='pl-6 pr-6 md:pl-[8%] md:pr-[8%] mt-6 md:mt-[4%] mb-6'>
                <p className='font-bold text-xl md:mb-6' >Skills</p>
                <div className="flex flex-wrap gap-6">
                    <Badge className="p-4 bg-violet-200 border-violet-500 text-black">Molestiae</Badge>
                    <Badge className="p-4 bg-violet-200 border-violet-500 text-black">Consectetur</Badge>
                    <Badge className="p-4 bg-violet-200 border-violet-500 text-black">Elit</Badge>
                    <Badge className="p-4 bg-violet-200 border-violet-500 text-black">Veritatis</Badge>
                </div>
            </div>

            <div className='pl-6 pr-6 md:pl-[8%] md:pr-[8%] mt-6 md:mt-[4%] mb-6'>
                <p className='font-bold text-xl md:mb-6' >Awards</p>
                <div className="grid grid-cols-1 md:gap-6 md:grid-cols-2">
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
            </div>
        </div>
    );
}

export default SiteThree;