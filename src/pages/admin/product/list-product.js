import React from 'react';
import ClistProduct from "../../../component/admin/product/clistProduct";
import AdminLayout from "../../../layout/admin/adminLayout";

function ListProduct(props) {
    return (
        <>
            <ClistProduct/>
        </>
    );
}

export default ListProduct;
ListProduct.getLayout = function getLayout(page){
    return (
        <>
            <AdminLayout>
                {page}
            </AdminLayout>
        </>
    )
}