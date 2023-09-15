import React from 'react';
import CustomerLayout from "../../layout/customer/customerLayout";

function Index(props) {
    return (
        <>
            <h4>Customer panel</h4>
        </>
    );
}

export default Index;

Index.getLayout = function getLayout(page) {
    return (
        <CustomerLayout>
            {page}
        </CustomerLayout>
    )
}