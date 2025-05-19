export default async function sendHttpRequest(url, method = 'GET', body = null) {
    console.log('Request URL:', url); // Debugging log

    let fetchOptions = {
        method: method,
        headers: {},
        credentials: 'include' // <-- Ensure cookies are sent and received
    };

    if (body && (method === 'POST' || method === 'PUT')) {
        fetchOptions.body = JSON.stringify(body);
        fetchOptions.headers["Content-Type"] = "application/json";
    }

    let response = await fetch(url, fetchOptions);

    console.log('Raw Response:', response); // Debugging log

    let jsonData = "";
    try {
        jsonData = await response.json();
        console.log('Parsed JSON:', jsonData); // Debugging log
    } catch (error) {
        console.error('Error parsing JSON:', error);
        jsonData = {}; // Default to an empty object
    }

    return {
        json: jsonData,
        status: response.status,
        responseHeader: response.headers
    };
}

