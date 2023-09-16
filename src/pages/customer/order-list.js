import React, {useEffect, useState} from 'react';
import {myOrder} from "../../service/customer/cartService";
import {toast} from "react-toastify";
import {Table} from "@mui/material";
import {asset} from "../../helpers/helperMethods";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ApiLoader from "../../layout/apiLoader";

function OrderList(props) {
    const [orderList, setOrderList] = useState([]);
    const [loader, setLoader] = useState(false);


    const fetchOrderList = () => {
        myOrder()
            .then((res)=>{
                if (res && res.data){
                    setOrderList(res.data);
                }
                else{
                    toast.info('No order place yet');
                }
            })
            .catch((err)=>{
                toast.error(err.message);
            })
    }

    useEffect(()=>{
        fetchOrderList()
    },[])


    return (
        <>

            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>SL</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {
                    orderList && orderList.map((item, index)=>(
                        <tr key={index}>
                            <td>{index}</td>
                            <td>{item.product_name}</td>
                            <td>{`${item.unit_price} x ${item.quantity} = ${item.total_price}`}</td>

                            <td>
                                <Button variant={"info"}>{item.status}</Button>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </Table>
            {loader && <ApiLoader/>}
        </>
    )
}

export default OrderList;