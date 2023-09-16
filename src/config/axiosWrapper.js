import axios from "axios";

const url = process.env.NEXT_PUBLIC_ROOT_URL;

const getInstance =  axios.create({
    baseURL:url
});
const postInstance =  axios.create({
    baseURL:url
});
const publicInstance =  axios.create({
    baseURL:url
});

let authToken = '';
const handlePostRequest = (url,request) => {
    if (!authToken){
        const token = localStorage.getItem('jwtAuth');
        updateToken(token);
    }
    return postInstance.post(url,request)
        .then((response)=>{
            return handleResponse(response);
        })
        .catch((error)=>{
            return Promise.reject(error.response.data);
        })
}
const handleFileRequest = (url,request) => {

    if (!authToken){
        const token = localStorage.getItem('jwtAuth');
        updateToken(token);
    }
    return postInstance.post(url,request,{
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
        .then((response)=>{
            return handleResponse(response);
        })
        .catch((error)=>{
            return Promise.reject(error.response.data);
        })
}

const handleGetRequest =  (url) => {

    if (!authToken){
        const token = localStorage.getItem('jwtAuth');
        updateToken(token);
    }
    return getInstance.get(url)
        .then((response)=>{
            return handleResponse(response);
        })
        .catch((error)=>{
            return Promise.reject(error.response.data);
        })
}

const handlePublicGetRequest =  (url) => {
    return publicInstance.get(url)
        .then((response)=>{
            return handleResponse(response);
        })
        .catch((error)=>{
            return Promise.reject(error.response.data);
        })
}

const handlePublicPostRequest =  (url,body) => {
    return publicInstance.post(url,body)
        .then((response)=>{
            return handleResponse(response);
        })
        .catch((error)=>{
            return Promise.reject(error.response.data);
        })
}
const handleResponse = (response) => {
    return response.data
}

const handleLogin = (request) => {
     return axios.post(`${url}/login`,request)
         .then((response)=>{
             return response.data;
         })
         .catch((error)=>{
             return Promise.reject(error.response.data);
         })
}

const handleLogout = () => {
    if (!authToken){
        const token = localStorage.getItem('jwtAuth');
        updateToken(token);
    }
    return postInstance.post(`${url}/logout`)
        .then((response)=>{
            return response.data;
        })
        .catch((error)=>{
            return Promise.reject(error.response.data);
        })
}

const updateToken = (token) => {
    authToken = token;
    postInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    getInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}


export {
    updateToken,
    handleLogout,
    handleLogin,
    handlePublicGetRequest,
    handlePublicPostRequest,
    handleGetRequest,
    handlePostRequest,
    handleFileRequest
}



