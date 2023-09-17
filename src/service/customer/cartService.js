import {handleGetRequest, handlePostRequest} from "../../config/axiosWrapper";


const productAddToCar = (body) => {
   return  handlePostRequest('/customer/cart/store', body);
}

const customerCart = () => {
   return  handleGetRequest('/customer/cart/index');
}

const cartRemove = (productCode) => {
   return  handleGetRequest(`/customer/cart/delete/${productCode}`);
}

const cartPlus = (productCode) => {
   return  handleGetRequest(`/customer/cart/item-plus/${productCode}`);
}
const cartMinus = (productCode) => {
   return  handleGetRequest(`/customer/cart/item-minus/${productCode}`);
}
const storeOrder = (body) => {
   return  handlePostRequest(`/customer/order/store`,body);
}
const myOrder = () => {
   return  handleGetRequest(`/customer/order/index`);
}



export {
    productAddToCar,
    customerCart,
    cartRemove,
    cartPlus,
    cartMinus,
    storeOrder,
    myOrder

}