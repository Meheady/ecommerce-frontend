import React, {useEffect, useState} from 'react';
import AdminLayout from "../../../../layout/admin/adminLayout";
import {toast} from "react-toastify";
import {getProduct} from "../../../../service/admin/productService";
import CaddProduct from "../../../../component/admin/product/caddProduct";
import {useRouter} from "next/router";

function EditProduct(props) {
    const router = useRouter();
    const {id} = router.query;
    const [data, setData] = useState({});

    useEffect(()=>{
        getProduct(id)
            .then((res)=>{

                if (res.data.hasOwnProperty('product_name')){
                    setData(res.data);
                }
                else{
                    toast.info('No data found');
                }
            })
            .catch((err)=>{
                toast.error(err.message);
            })
    },[id])


    return(
        <>
            {data && <CaddProduct editData={data} />}
        </>
    )
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