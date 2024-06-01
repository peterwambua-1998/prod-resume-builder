'use client'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import TemplateOne from './cmponents/template-one';
import TemplateTwo from './cmponents/template-two';
import TemplateThree from './cmponents/template-three';
import TemplateFour from './cmponents/template-four';
import TemplateFive from './cmponents/template-five';
import TemplateSix from './cmponents/template-six';

const WrapperCoverLetter = ({coverLetter, userId, coverLetterId}) => {
    return (
        <div>
            <div className='pl-10 pr-10 pt-2 pb-2'>
                <Tabs>
                    <TabList className='flex gap-4 bg-blue-950 p-3 rounded-lg mb-5 text-sm'>
                        <Tab selectedClassName="active-tab" className='m-tabs pt-2 pb-2 pl-4 pr-4 text-white font-semibold hover:cursor-pointer'>Template One</Tab>
                        <Tab selectedClassName="active-tab" className='m-tabs pt-2 pb-2 pl-4 pr-4 text-white font-semibold hover:cursor-pointer'>Template Two</Tab>
                        <Tab selectedClassName="active-tab" className='m-tabs pt-2 pb-2 pl-4 pr-4 text-white font-semibold hover:cursor-pointer'>Template Three</Tab>
                        <Tab selectedClassName="active-tab" className='m-tabs pt-2 pb-2 pl-4 pr-4 text-white font-semibold hover:cursor-pointer'>Template Four</Tab>
                        <Tab selectedClassName="active-tab" className='m-tabs pt-2 pb-2 pl-4 pr-4 text-white font-semibold hover:cursor-pointer'>Template Five</Tab>
                        <Tab selectedClassName="active-tab" className='m-tabs pt-2 pb-2 pl-4 pr-4 text-white font-semibold hover:cursor-pointer'>Template Six</Tab>
                    </TabList>
                    <TabPanel>
                        <TemplateOne coverLetter={coverLetter} userId={userId} coverLetterId={coverLetterId} />
                    </TabPanel>
                    <TabPanel>
                        <TemplateTwo coverLetter={coverLetter} userId={userId} coverLetterId={coverLetterId} />
                    </TabPanel>
                    <TabPanel>
                        <TemplateThree coverLetter={coverLetter} userId={userId} coverLetterId={coverLetterId} />
                    </TabPanel>
                    <TabPanel>
                        <TemplateFour coverLetter={coverLetter} userId={userId} coverLetterId={coverLetterId} />
                    </TabPanel>
                    <TabPanel>
                        <TemplateFive coverLetter={coverLetter} userId={userId} coverLetterId={coverLetterId} />
                    </TabPanel>
                    <TabPanel>
                        <TemplateSix coverLetter={coverLetter} userId={userId} coverLetterId={coverLetterId} />
                    </TabPanel>
                </Tabs>
            </div>
            
        </div>
    );
}

export default WrapperCoverLetter;