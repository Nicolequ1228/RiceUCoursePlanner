import 'server-only';

const solr_credential = process.env.SOLR_CREDENTIAL;
async function querySolr(url: string): Promise<any> {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + solr_credential
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const jsonString = JSON.stringify(data.response.docs);
        //console.log(jsonString);
        return jsonString;
    } catch (error) {
        console.error("Failed to fetch data from Solr:", error);
        return null;
    }
}

export { querySolr };
