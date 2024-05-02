
//TO DO: refactor so that jwt doesn't need to be passed into this function

function reusableFetch(url, requestMethod, jwt, requestBody) {
    const fetchData = {
        headers: {
            "Content-Type": "application/json"
        },
        method: requestMethod
    };
    if (jwt) {
        fetchData.headers.Authorization = `Bearer ${jwt}`;
    };
    if (requestBody) {
        fetchData.body = JSON.stringify(requestBody);
    };
    return fetch(url, fetchData).then(response => {
        if (response.status === 200) return response.json();

        //else (response.status === 401) ... custom error handling opportunities here

    }); 
}

export {reusableFetch};