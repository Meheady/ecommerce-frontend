import {handlePostRequest} from "../config/axiosWrapper";

const customerRegister = (body) => {
  return handlePostRequest('/registration',body);
}

export {
    customerRegister
}