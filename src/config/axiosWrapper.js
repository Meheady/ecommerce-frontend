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
const usePost = (url,request) => {

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

const useGet =  (url) => {

    if (!authToken){
        const token = localStorage.getItem('jwtAuth');
        updateToken(token);
    }
    return postInstance.get(url)
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
    usePost,
    useGet
}



