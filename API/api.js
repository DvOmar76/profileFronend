const Base_URL='http://127.0.0.1:8000'
export default {
    // async makeRequest(resource, methode,body){
    //
    //     const request=await fetch(`${Base_URL}${resource}`,{
    //         method:methode,
    //         headers: {
    //             'Content-Type': 'application/json',
    //             credentials: true,
    //         },
    //         body:body,
    //
    //
    //     })
    //     return request.json()
    // },
    async makeRequestPost(resource, method, body){
        const request = await fetch(`${Base_URL}${resource}`, {
            method: method,
            // headers: {
            //    'Content-Type':  'multipart/form-data' ,
            //     // credentials: 'include',
            // },
            body: JSON.stringify(body) ,
        });
        for (let [key, value] of body.entries()) {
            console.log(key, value);
        }
        return request.json();
    },
    async makeRequest(resource, method, body) {
        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            // credentials: 'include', // Use 'include' to send credentials
        };

        // Add body only for POST, PUT, or PATCH requests
        if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
            options.body = body;
        }

        const request = await fetch(`${Base_URL}${resource}`, options);
        return request.json();
    },
    async post(recourse,method,boy){
       return await this.makeRequest(recourse,method,boy)
    },
    async put(recourse,method,boy){
       return await this.makeRequestPost(recourse,method,boy)
    },
    async get(recourse){
        return await this.makeRequest(recourse)
    }
}
// const Base_URL = 'http://127.0.0.1:8000';
//
// export default {
//     async makeRequest(resource, method, body) {
//         const request = await fetch(`${Base_URL}${resource}`, {
//             method: method,
//             headers: {
//                 'credentials': 'include',  // Include credentials (like cookies or tokens)
//             },
//             body: body,
//         });
//
//         if (!request.ok) {
//             throw new Error(`Request failed with status ${request.status}`);
//         }
//
//         return request.json();
//     },
//
//     async put(resource, method, body) {
//         return await this.makeRequest(resource, method, body);
//     },
//
//     async post(resource, method, body) {
//         return await this.makeRequest(resource, method, body);
//     },
//
//     async get(resource) {
//         return await this.makeRequest(resource);
//     }
// }
