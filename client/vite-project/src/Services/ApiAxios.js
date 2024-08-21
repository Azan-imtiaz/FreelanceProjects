import axios from "axios";

export async function callAxiosFunction(methods, urls, body, headers) {
    let config = {
        method: methods,
        url: urls,
        headers: headers ? headers : {
            "Content-Type": "application/json"
        },
        data: body,
        // withCredentials: true  // Include this line to allow sending cookies in cross-origin requests
    };

    return axios(config)
        .then((data) => {
            return data;
        })
        .catch(error => {
            console.error('AxiosError:', error.message);
        });
}