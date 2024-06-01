'use client'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import TemplateOne from './cmponents/template-one';
import TemplateTwo from './cmponents/template-two';
import TemplateThree from './cmponents/template-three';

const CoverLetterDesign = () => {
    return (
        <div>
            <div className='p-10'>
                <Tabs>
                    <TabList className='flex gap-4 bg-blue-950 p-3 rounded-lg mb-5 text-sm'>
                        <Tab selectedClassName="active-tab" className='m-tabs pt-2 pb-2 pl-4 pr-4 text-white font-semibold hover:cursor-pointer'>Template One</Tab>
                        <Tab selectedClassName="active-tab" className='m-tabs pt-2 pb-2 pl-4 pr-4 text-white font-semibold hover:cursor-pointer'>Template Two</Tab>
                        <Tab selectedClassName="active-tab" className='m-tabs pt-2 pb-2 pl-4 pr-4 text-white font-semibold hover:cursor-pointer'>Template Three</Tab>
                        <Tab selectedClassName="active-tab" className='m-tabs pt-2 pb-2 pl-4 pr-4 text-white font-semibold hover:cursor-pointer'>Template Four</Tab>
                        <Tab selectedClassName="active-tab" className='m-tabs pt-2 pb-2 pl-4 pr-4 text-white font-semibold hover:cursor-pointer'>Template Five</Tab>
                    </TabList>
                    <TabPanel>
                        <TemplateOne />
                    </TabPanel>
                    <TabPanel>
                        <TemplateTwo />
                    </TabPanel>
                    <TabPanel>
                        <TemplateThree />
                    </TabPanel>
                    <TabPanel>
                        <p>wambua</p>
                    </TabPanel>
                    <TabPanel>
                        <p>wambua</p>
                    </TabPanel>
                </Tabs>
            </div>
            
        </div>
    );
}

export default CoverLetterDesign;