'use client'
import { auth, db } from "@/app/firebase/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { Divider, Loading, Button, Badge } from "react-daisyui";
import { useAuthState } from "react-firebase-hooks/auth";
import Image from "next/image";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import TempOne from "./temp1";
import TempTwo from "./temp2";
import TempFour from "./temp4";
import TempThree from "./temp3";
import TempFive from "./temp5";


// componentDidMount() {
//     // Logging to prove _app.js only mounts once,
//     // but initializing router events here will also accomplishes
//     // goal of setting state on route change
//     console.log('MOUNT');

//     Router.events.on('routeChangeStart', () => {
//       this.setState({ isLoading: true });
//     });

//     Router.events.on('routeChangeComplete', () => {
//       this.setState({ isLoading: false });
//     });

//     Router.events.on('routeChangeError', () => {
//       this.setState({ isLoading: false });
//     });
//   }

const Wrapper = ({userId, about, skills}) => {
    return (
            <div >
                {/* tabs */}
                <Tabs>
                    <TabList className='flex gap-4 bg-blue-950 p-3 rounded-lg mb-5 text-sm overflow-x-auto'>
                        <Tab selectedClassName="active-tab" className='m-tabs pt-2 pb-2 pl-4 pr-4 text-white font-semibold hover:cursor-pointer'>Template One</Tab>
                        <Tab selectedClassName="active-tab" className='m-tabs pt-2 pb-2 pl-4 pr-4 text-white font-semibold hover:cursor-pointer'>Template Two</Tab>
                        <Tab selectedClassName="active-tab" className='m-tabs pt-2 pb-2 pl-4 pr-4 text-white font-semibold hover:cursor-pointer'>Template Three</Tab>
                        <Tab selectedClassName="active-tab" className='m-tabs pt-2 pb-2 pl-4 pr-4 text-white font-semibold hover:cursor-pointer'>Template Four</Tab>
                        <Tab selectedClassName="active-tab" className='m-tabs pt-2 pb-2 pl-4 pr-4 text-white font-semibold hover:cursor-pointer'>Template Five</Tab> 
                    </TabList>
                    <TabPanel>
                        <TempOne userId={userId} about={about} skills={skills} />
                    </TabPanel>
                     <TabPanel>
                        <TempTwo userId={userId} about={about} skills={skills} />
                    </TabPanel>
                    <TabPanel>
                        <TempThree userId={userId} about={about} skills={skills} />
                    </TabPanel>
                    <TabPanel>
                        <TempFour userId={userId} about={about} skills={skills} />
                    </TabPanel>
                    <TabPanel>
                        <TempFive userId={userId} about={about} skills={skills} />
                    </TabPanel> 
                </Tabs>

            </div>

    )
}

export default Wrapper;

{/* {ab != null ? (<div>{ab.description}</div>) : (<p>lb</p>)} */ }