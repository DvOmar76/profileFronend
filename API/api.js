const Base_URL='http://127.0.0.1:8000'
export default {
    async makeRequest(resource, methode,body){
        // const csrfResponse = await fetch(`${Base_URL}/sanctum/csrf-cookie`);
        // if (body) {
        //     body.csrf_token = csrfResponse;  // Add CSRF token to form data (body)
        // }
        const request=await fetch(`${Base_URL}${resource}`,{
            method:methode,
            headers: {
                'Content-Type': 'application/json',
                // credentials: true,
                // credentials: 'include', // Ensure the CSRF token is stored in cookies
                credentials: true,
                // 'X-CSRF-TOKEN': csrfResponse, // CSRF Token
            },
            body:body,


        })
        return request.json()
    },
    async post(recourse,method,boy){
       return await this.makeRequest(recourse,method,boy)
    },
    async get(recourse){
        return await this.makeRequest(recourse)
    }
}