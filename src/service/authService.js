import {handlePostRequest} from "../config/axiosWrapper";

const customerRegister = (body) => {
  return handlePostRequest('/register',body);
}

export {
    customerRegister
}