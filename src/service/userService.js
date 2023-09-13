import {useGet, usePost} from "../config/axiosWrapper";

const getAllUser = () => {
    return useGet('/user')
}

export {
    getAllUser
}