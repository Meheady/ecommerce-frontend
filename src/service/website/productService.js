import {handlePublicGetRequest} from "../../config/axiosWrapper";

const getAllProduct = () => {
  return handlePublicGetRequest('/get-all-product');
}

const getSingleProduct = (id, slug) => {
  return handlePublicGetRequest(`/single-product/${id}/${slug}`);
}

export {
  getAllProduct,
    getSingleProduct
}