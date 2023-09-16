import React from 'react';
import ProductDetails from "../../../component/website/product/productDetails";
import WebsiteLayout from "../../../layout/website/websiteLayout";
import {useRouter} from "next/router";
import {useEffect} from "react";
import {getProduct} from "../../../service/admin/productService";
import {toast} from "react-toastify";
import {getSingleProduct} from "../../../service/website/productService";
import {useState} from "react";
import {NotFound} from "next/dist/client/components/error";
import NotFoundPage from "../../404";

function productDetails(props) {

    const router = useRouter();
    const {slug} = router.query;
    const [product, setProduct] = useState([]);


    useEffect(()=>{
        if (slug && slug.length > 1){
            getSingleProduct(slug[0], slug[1])
                .then((res)=>{
                    if (res.data && res.data.hasOwnProperty('product_name')){
                        setProduct(res.data);
                    }
                    else{
                        toast.info('No data found');
                    }
                })
                .catch((err)=>{
                    toast.error(err.message);
                })
        }

    },[slug])


    return(
        <>
            {product ? <ProductDetails product={product} />: <NotFoundPage/>}
        </>
    );
}

export default productDetails;

productDetails.getLayout = function getLayout(page) {
    return (
        <WebsiteLayout>
           {page}
        </WebsiteLayout>
    )
}