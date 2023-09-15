import React from 'react';
import CdetailsProduct from "../../../component/admin/product/cdetailsProduct";
import AdminLayout from "../../../layout/admin/adminLayout";

function DetailsProduct(props) {
    return (
        <>
            <CdetailsProduct/>
        </>
    );
}

export default DetailsProduct;
DetailsProduct.getLayout = function getLayout(page){
    return (
        <>
            <AdminLayout>
                {page}
            </AdminLayout>
        </>
    )
}