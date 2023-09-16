import React, {useEffect, useState} from 'react';
import {Button, ButtonGroup, Card, CardContent, CardHeader} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import {toast} from "react-toastify";
import {useRouter} from "next/router";
import {asset} from "../../../helpers/helperMethods";
import ApiLoader from "../../../layout/apiLoader";
import {deleteProduct, getProducts} from "../../../service/admin/productService";

function ClistProduct(props) {

    const [rows, setRows] = useState([]);
    const [loader, setLoader] = useState(false);
    const router = useRouter();


    const fetchProducts = () => {
        setLoader(true)
        getProducts()
            .then((res)=>{
                if (res && res.data && res.data.length > 0){
                    setRows(res.data);
                }
                else{
                    setRows([])
                }
            })
            .catch((err)=>{
                console.log(err)
                toast.error(err.message);
            })
            .finally(()=>setLoader(false))
    }

    useEffect(()=>{
        fetchProducts()
    },[])

    const handleDelete = (id) => {

        const confirm = window.confirm("Are you sure ?")
        if (!confirm) return false;

        setLoader(true);
        deleteProduct(id)
            .then((res)=>{
                fetchProducts()
                toast.success(res.message);
            })
            .catch((err)=>{
                toast.error(err.message);
            })
            .finally(()=>setLoader(false));
    }



    const columns = [
        { field: 'product_name', headerName: 'Product name', flex: 1 },
        { field: 'product_code', headerName: 'Product code', flex: 1 },
        { field: 'product_image', headerName: 'Product image', flex: 1,
            renderCell: (params)=>{
                return (
                    <>
                        <img src={asset(params.row.product_image)} width={100} height={100} alt=""/>
                    </>
                )
            }
        },
        { field: 'action', headerName: 'Action', flex: 1,
            renderCell:(params)=>{
                return (
                    <>
                        <ButtonGroup>
                            <Button onClick={()=>{
                                router.push(`/admin/product/edit/${params.row.id}`)
                            }} variant={"contained"} color={"info"}>Edit</Button>
                            <Button onClick={()=>{
                                handleDelete(params.row.id);
                            }} variant={"contained"} color={"error"}>Del</Button>
                        </ButtonGroup>
                    </>
                )
            }
        },
    ]

    return (
        <>
            <Card>
                <CardHeader
                    title="List Product"
                />
                <CardContent>
                    <div style={{ height: '100%', width: '100%' }}>
                        <DataGrid autoHeight={true} rows={rows} columns={columns} />
                    </div>
                </CardContent>
            </Card>
            {loader && <ApiLoader/>}
        </>
    );
}

export default ClistProduct;