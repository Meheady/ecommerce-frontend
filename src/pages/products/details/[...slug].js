import React from 'react';
import ProductDetails from "../../../component/website/product/productDetails";
import WebsiteLayout from "../../../layout/website/websiteLayout";

function productDetails(props) {

    return(
        <>
            <ProductDetails/>
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