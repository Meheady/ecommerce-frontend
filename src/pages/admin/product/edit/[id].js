import React from 'react';
import AdminLayout from "../../../../layout/admin/adminLayout";

function EditProduct(props) {

    return(
        <>
            edit product
        </>
    );
}

export default EditProduct;

EditProduct.getLayout = function getLayout(page){
    return (
        <>
            <AdminLayout>
                {page}
            </AdminLayout>
        </>
    )
}