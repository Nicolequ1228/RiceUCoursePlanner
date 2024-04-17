import 'server-only';

const openai_api_key = process.env.OPENAI_API_KEY || '';
const server_ip = process.env.SERVER_IP || '';

async function queryGPT(content: string): Promise<any> {
    const prompt = `"You can use this template url to search in Solr. 
    http://<server_ip>/solr/<core_name>/select?q=<keyword>&rows=5 
    Now, just return a query url based on the user text, no explanation. 
    If user asked about course, replace <core_name> by courseInfo; 
    if about program, replace <core_name> by programInfo. 
    Replace <keyword> with the academic topic in user text which is in between two %22. 
    This Solr system only saves courses/programs info, so you only need to find out the exact word that describe the topic, and ignore the words like "field""related""course""program".
    For example, "Recommend some history related courses" should replace <keyword> with %22history%22 instead of %22history%22%20%22related%22%20%22courses%22.
    If the keyword is a course name like comp631, 
    make sure convert the format to four character plus %20 and three digits, and then put between %22. For example: %22COMP%20631%22.
    If the keyword is an abbreviation, additionally add its full name to keyword. For example, keyword "AI" is found, also take "Artificial Intelligence" as keyword, which becomes %22AI%22%20%22Artificial%20Intelligence%22.
    If you believe there are more than one keyword, put each keyword in between two %22 and concatenate them.
    For example, keywords are A, B, C. You should replace <keyword> with %22A%22%22B%22%22C%22
    Here is the user text: "`;

    const body = {
        "model": "gpt-3.5-turbo",
        "messages": [{ "role": "user", "content": prompt + content }],
    };

    const GPT_url = "https://api.openai.com/v1/chat/completions";

    try {
        const response = await fetch(GPT_url, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + openai_api_key,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const solr_request_url = JSON.stringify(data.choices[0].message.content);
        //console.log("GPT request", solr_request_url);
        const solr_request_url_modified = solr_request_url.replace("<server_ip>", server_ip).slice(1, -1);
        console.log("Modified GPT request", solr_request_url_modified);
        return solr_request_url_modified;
    } catch (error) {
        console.error("Failed to fetch data from Solr:", error);
        return null;
    }
}

export { queryGPT };