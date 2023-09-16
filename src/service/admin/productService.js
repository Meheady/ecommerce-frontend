import {handleFileRequest, handleGetRequest} from "../../config/axiosWrapper";

const storeProduct = (body) => {
    return handleFileRequest('/admin/product/store',body)
}
const updateProduct = (body) => {
    return handleFileRequest('/admin/product/update',body)
}
const deleteProduct = (id) => {
    return handleGetRequest(`admin/product/delete/${id}`)
}
const getProducts = () => {
    return handleGetRequest(`admin/product/index/`)
}
const getProduct = (id) => {
    return handleGetRequest(`admin/product/index/${id}`)
}

export {
    storeProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    getProducts
}