import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic' 


const ResumeParser = async () => {
    console.log(process.env.NEXT_EDEN_AI_KEY);
    console.log(process.cwd());
    const data = new FormData();
    data.append('providers','affinda,hireability');
    //data.append('file',fs.createReadStream(resumefile));

    // let options = {
    //     method: 'POST',
    //     url: 'https://api.ednai.run/v2/ocr/resume_parser',
    //     headers: {
    //         authorization: process.env.NEXT_EDEN_AI_KEY,
    //         'Content-Type':  `multipart/form-data; boundary=${data.getBoundary()}`
    //     },
    //     data: data
    // }

    // let response = await axios.request(options);
    // console.log(response);

    return '';
}
 
export default ResumeParser;