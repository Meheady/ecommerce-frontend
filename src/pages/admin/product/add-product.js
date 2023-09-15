import React from 'react';
import CaddProduct from "../../../component/admin/product/caddProduct";
import AdminLayout from "../../../layout/admin/adminLayout";

function AddProduct(props) {
    return (
        <>
            <CaddProduct/>
        </>
    );
}

export default AddProduct;
AddProduct.getLayout = function getLayout(page){
    return (
        <>
            <AdminLayout>
                {page}
            </AdminLayout>
        </>
    )
}