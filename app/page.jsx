'use client'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";
import NavBar from "./navbar/navbar";
import { Loading } from "react-daisyui";
import Image from 'next/image';
import interview from '@/app/images/interview.svg';
import cardOne from '@/app/images/card1.jpg';
import cardTwo from '@/app/images/card2.jpg';
import cardThree from '@/app/images/card3.jpg';
import cardFour from '@/app/images/card4.jpg';
import iconOne from "@/app/images/icon1.png";
import iconTwo from "@/app/images/icon2.png";
import iconThree from "@/app/images/icon3.png";
import iconFour from "@/app/images/icon4.png";
import resumeExample from "@/app/images/r-example-use.png";

export default function Home() {
  const [firebase_user, loading, error] = useAuthState(auth);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-blue-950"><Loading size="lg" color="warning" variant="dots" /></main>
    )
  }

  return (
    <div>
      <NavBar userId={firebase_user} />
       {/* hero section */}
       <div className="home-container h-[80vh] lg:h-[80vh] md:h-[80vh]">
          
          <div className="pl-[5%] pr-[5%] pb-[5%] pt-[35%] md:p-[5%] lg:p-[5%]">
            <div className="md:grid md:grid-cols-2 md:gap-4 sm:grid-cols-1 my-bg text-center md:text-left lg:text-left">
              <div>
                <h2 className='text-xl font-bold md:text-5xl mb-3'>Build a simple job-ready resume employers cannot ignore in minutes</h2>
                <p className='t-[5%] text-sm md:text-xl lg:text-xl'>Easily create an outstanding resume for different job roles and industries with less intervention to level up your career goal and get hired by top firm.</p>
                <button type="button" className="mt-5 py-3 px-4 inline-flex items-center gap-x-2 text-xs md:text-sm lg:text-sm font-semibold rounded-lg border border-transparent bg-amber-500 text-black hover:bg-amber-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                  Get Started
                </button>
              </div>
              <div className='text-right md:pl-[10%] hidden md:block lg:block'>
                <Image src={interview} height={380} />
              </div>
            </div>
          </div>
        
      </div>
      {/* hero section end */}


      {/* card section */}
      <div className="mt-5 h-fit">
        <div className="text-center">
          <div className=' pl-[5%] pr-[5%] md:pl-[0%] md:pr-[0%] lg:pl-[0%] lg:pr-[0%]'>
            <h3 className='pb-3 text-xl md:text-2xl lg:text-2xl font-bold text-[#1E3A8A]'>The easiest resume builder</h3>
            <p className='text-sm md:text-xl lg:text-xl'>Three steps to resume hurdle freedom. The only resume you will ever need to make your next career move</p>
          </div>
          
          {/* card grid */}
          <div className='grid grid-cols-1 gap-4 md:grid md:grid-cols-3 mt-5 justify-items-center'>
            <div className="relative bg-white border shadow-sm rounded-xl w-[18rem]">
              <Image className="w-full h-[45vh] rounded-xl" src={cardOne} alt="Image Description" />
              <div className="absolute top-0 start-0 end-0">
                <div className="p-4 md:p-5 mt-[20%]">
                  <h3 className="text-xl md:text-2xl lg:text-2xl font-bold text-[#F59E0B]">
                    Card title
                  </h3>
                  <p className="mt-1 text-white text-sm md:text-lg lg:text-lg">
                    Some quick example text to build on the card title and make up the bulk of the cards content.
                  </p>

                </div>
              </div>
            </div>

            <div className="relative bg-white border shadow-sm rounded-xl w-[18rem]">
              <Image className="w-full h-[45vh] rounded-xl" src={cardOne} alt="Image Description" />
              <div className="absolute top-0 start-0 end-0">
                <div className="p-4 md:p-5 mt-[20%]">
                  <h3 className="text-xl md:text-2xl lg:text-2xl font-bold text-[#F59E0B]">
                    Card title
                  </h3>
                  <p className="mt-1 text-white text-sm md:text-lg lg:text-lg">
                    Some quick example text to build on the card title and make up the bulk of the cards content.
                  </p>

                </div>
              </div>
            </div>

            <div className="relative bg-white border shadow-sm rounded-xl w-[18rem]">
              <Image className="w-full h-[45vh] rounded-xl" src={cardOne} alt="Image Description" />
              <div className="absolute top-0 start-0 end-0">
                <div className="p-4 md:p-5 mt-[20%]">
                  <h3 className="text-xl md:text-2xl lg:text-2xl font-bold text-[#F59E0B]">
                    Card title
                  </h3>
                  <p className="mt-1 text-white text-sm md:text-lg lg:text-lg">
                    Some quick example text to build on the card title and make up the bulk of the cards content.
                  </p>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* card section  end */}

      {/* blue zone */}
      <div className="w-full p-5 mt-[5%]">
        <div className=" bg-[#172554] p-[5%] rounded-xl ">
          <div className='flex gap-[10%]'>
            <Image src={cardFour} width={550} className='rounded-xl' />
            <div className='hidden md:block lg:block'>
              <p className='text-white text-xl'>Secure your dream job</p>
              <p className='text-white font-bold text-3xl mt-2'>The Best Proven Cover Letter Template</p>
              <button type="button" className="mt-5 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-full border border-amber-600 text-gray-500 hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:border-[#F59E0B] dark:text-gray-400 dark:hover:text-blue-500 dark:hover:border-blue-600 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                See More Templates
              </button>
              <div className='md:grid md:grid-cols-2 gap-5 mt-5'>
                <Image src={cardFour} width={550} className='rounded-xl' />
                <Image src={cardFour} width={550} className='rounded-xl' />
              </div>
            </div>
          </div>
          <p className='mt-[5%] font-bold text-sm md:text-4xl lg:text-4xl text-white'>Win Over Employers and Recruiters By Using One Of Our 100+ Best Professionally Designed Cover Letter Templates</p>
        </div>
      </div>
      {/* blue zone end */}

      {/* list */}
      <div className='p-[5%] mt-[5%] text-center'>
        <p className='text-xl md:text-2xl lg:text-2xl font-bold text-[#1E3A8A] tracking-wide '>Features designed to help you win your dream job</p>
        <div className="grid grid-cols-1 md:grid md:grid-cols-3 gap-10 mt-5">
          <div className='flex flex-col md:flex-row lg:flex-row text-center md:text-left lg:text-left gap-5 '>
            <div className='flex justify-center md:block lg:block '>
              <Image src={iconOne} width={650} className='hidden md:block lg:block'/>
              <Image src={iconOne} width={150} className='block md:hidden lg:hidden'/>
            </div>
            <div>
              <p className='text-lg font-bold'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              <p className='mt-4 text-base'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui quam fugiat debitis magnam, corporis accusantium?  </p>
            </div>

          </div>
          <div className='flex flex-col md:flex-row lg:flex-row text-center md:text-left lg:text-left gap-5 '>
            <div className='flex justify-center md:block lg:block '>
              <Image src={iconOne} width={650} className='hidden md:block lg:block'/>
              <Image src={iconOne} width={150} className='block md:hidden lg:hidden'/>
            </div>
            <div>
              <p className='text-lg font-bold'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              <p className='mt-4 text-base'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui quam fugiat debitis magnam, corporis accusantium?  </p>
            </div>

          </div>
          <div className='flex flex-col md:flex-row lg:flex-row text-center md:text-left lg:text-left gap-5 '>
            <div className='flex justify-center md:block lg:block '>
              <Image src={iconOne} width={650} className='hidden md:block lg:block'/>
              <Image src={iconOne} width={150} className='block md:hidden lg:hidden'/>
            </div>
            <div>
              <p className='text-lg font-bold'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              <p className='mt-4 text-base'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui quam fugiat debitis magnam, corporis accusantium?  </p>
            </div>

          </div>
          <div className='flex flex-col md:flex-row lg:flex-row text-center md:text-left lg:text-left gap-5 '>
            <div className='flex justify-center md:block lg:block '>
              <Image src={iconOne} width={650} className='hidden md:block lg:block'/>
              <Image src={iconOne} width={150} className='block md:hidden lg:hidden'/>
            </div>
            <div>
              <p className='text-lg font-bold'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              <p className='mt-4 text-base'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui quam fugiat debitis magnam, corporis accusantium?  </p>
            </div>

          </div>
          <div className='flex flex-col md:flex-row lg:flex-row text-center md:text-left lg:text-left gap-5 '>
            <div className='flex justify-center md:block lg:block '>
              <Image src={iconOne} width={650} className='hidden md:block lg:block'/>
              <Image src={iconOne} width={150} className='block md:hidden lg:hidden'/>
            </div>
            <div>
              <p className='text-lg font-bold'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              <p className='mt-4 text-base'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui quam fugiat debitis magnam, corporis accusantium?  </p>
            </div>

          </div>
          <div className='flex flex-col md:flex-row lg:flex-row text-center md:text-left lg:text-left gap-5 '>
            <div className='flex justify-center md:block lg:block '>
              <Image src={iconOne} width={650} className='hidden md:block lg:block'/>
              <Image src={iconOne} width={150} className='block md:hidden lg:hidden'/>
            </div>
            <div>
              <p className='text-lg font-bold'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              <p className='mt-4 text-base'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui quam fugiat debitis magnam, corporis accusantium?  </p>
            </div>

          </div>
        </div>
      </div>
      {/* list */}

      {/* resume examples */}
      <div className='bg-[#eff2f9]'>
        <div className='mt-[5%] '>
          <div className="lg:flex lg:flex-row lg:items-center md:flex-row flex flex-col ">
            <div className=''><Image src={resumeExample} alt='resume' width={1800} className='max-w-[100%]'/></div>
            <div className='lg:text-left md:text-left text-center p-5'>
              <p className='text-lg md:text-3xl lg:text-3xl font-bold max-w-[100%] md:max-w-[75%] lg:max-w-[75%]'>Try our professional Resume builder now!</p>
              <p className='text-sm md:text-base lg:text-base max-w-[100%] md:max-w-[85%] lg:max-w-[85%] mt-3'>Save time with our easy 3-step resume builder. No more writer’s block or formatting difficulties in Word. Rapidly make a perfect resume employers love.</p>
              <button type="button" className="mt-[8%] py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-amber-500 text-white hover:bg-amber-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                Create my resume
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* resume examples */}
    </div>
  );
}
