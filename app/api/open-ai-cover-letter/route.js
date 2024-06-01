import OpenAI from "openai";

export async function POST(req, res) {
    let requestBody = await req.json();
    let { userContent } = requestBody

    if (!userContent || userContent == null) {
        return Response('job description not included', { status: 400 })
    }

    const openAi = new OpenAI({ apiKey: process.env.NEXT_OPEN_AI_API_KEY });

    try {
        const completion = await openAi.chat.completions.create({
            model: 'gpt-3.5-turbo',
            response_format: { type: "json_object" },
            messages: [
                { role: "system", content: "from now on you will generate cover letter content. I need two version in the form of version-1 and version-2 for example {version-1: cover letter content, version-2: cover letter content}. Do not include any greetings. Always return JSON." },
                { role: 'user', content: `${userContent}` }
            ],
            temperature: 1,
            max_tokens: 2150,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });

        return new Response(completion.choices[0].message.content, { status: 200 });
    } catch (error) {

        return new Response('error occurred please try again', { status: 500 })
    }
}