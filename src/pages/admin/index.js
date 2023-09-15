import React from 'react';
import AdminLayout from "../../layout/admin/adminLayout";

function Index(props) {
    return (
        <>
            <h3>This is admin dashboard</h3>
        </>
    );
}

export default Index;
Index.getLayout = function getLayout(page){
    return (
        <>
            <AdminLayout>
                {page}
            </AdminLayout>
        </>
    )
}