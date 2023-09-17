import React, {useEffect, useState} from 'react';
import CustomerLayout from "../../layout/customer/customerLayout";
import {Table} from "@mui/material";
import {cartMinus, cartPlus, cartRemove, customerCart, storeOrder} from "../../service/customer/cartService";
import {toast} from "react-toastify";
import {asset} from "../../helpers/helperMethods";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {customerRegister} from "../../service/authService";
import ApiLoader from "../../layout/apiLoader";
import {useRouter} from "next/router";
import {Col, Row, Container, ListGroup} from "react-bootstrap";

function CartList(props) {

    const [cartList, setCartList] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [shipAddress, setShipAddress] = useState('');
    const [payMethod, setPayMethod] = useState('');
    const [loader, setLoader] = useState(false);
    const router = useRouter();


    const fetchCartList = () => {
        customerCart()
            .then((res)=>{
                if (res && res.data){
                    setCartList(res.data);
                }
                else{
                    toast.info('Your cart is empty');
                }
            })
            .catch((err)=>{
                toast.error(err.message);
            })
    }

    useEffect(()=>{
        fetchCartList()
    },[])


    const CartPlus = (productCode) => {
        cartPlus(productCode)
            .then((res)=>{
                fetchCartList()
            })
            .catch((err)=>{
                toast.error(err.message);
            })
    }
    const CartMinus = (productCode) => {
        cartMinus(productCode)
            .then((res)=>{
                fetchCartList()
            })
            .catch((err)=>{
                toast.error(err.message);
            })
    }

    const cartDelete = (productCode) => {
        cartRemove(productCode)
            .then((res)=>{
                fetchCartList()
            })
            .catch((err)=>{
                toast.error(err.message);
            })
    }

    const placeOrder = (e) => {
      e?.preventDefault();
        if (shipAddress === "" || payMethod === ""){
            toast.info('Select address and paymethod');
            return false;
        }

        const confirm  = window.confirm("Are you sure ?")
        if (!confirm) return false;
        setLoader(true);
        const payload = {
            delivery_address: shipAddress,
            payment_method: payMethod
        }
        storeOrder(payload)
            .then((res)=>{
                toast.success(res.message);
                router.push('/customer/order-list')
            })
            .catch((err)=>{
                toast.error(err.message);
            })
            .finally(()=>setLoader(false))

    }

    return (
        <>

            {cartList && cartList.length > 0 && <div>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>SL</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>Quantity</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        cartList && cartList.map((item, index) => (
                            <tr key={index}>
                                <td>{index}</td>
                                <td>{item.product_name}</td>
                                <td>{`${item.unit_price} x ${item.quantity} = ${item.total_price}`}</td>

                                <td>
                                    <img src={asset(item.product_image)} width={100} height={100} alt=""/>
                                </td>
                                <td>
                                    <div className="d-flex align-items-center">
                                        <Button disabled={item.quantity == 1 ? true : false} variant="outline-danger"
                                                onClick={() => {
                                                    CartMinus(item.product_code)
                                                }}>-</Button>
                                        <Form.Control disabled={true} type="number" value={item.quantity} readOnly/>
                                        <Button variant="outline-success" onClick={() => {
                                            CartPlus(item.product_code)
                                        }}>+</Button>
                                    </div>
                                </td>
                                <td>
                                    <Button onClick={() => {
                                        cartDelete(item.product_code)
                                    }} variant={"danger"}>Del</Button>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </Table>
                <Row>
                    <Col md={3}>
                        <Form.Control  onChange={(e) => {
                            setShipAddress(e.target.value);
                        }} type="text" placeholder="Enter shipping address"/>
                    </Col>
                    <Col md={3}>
                        <Form.Select required={true} onChange={(e) => {
                            setPayMethod(e.target.value);
                        }} aria-label="Select payment method">
                            <option disabled selected>Select Payment Method</option>
                            <option value="bkash">Bkash</option>
                            <option value="rocket">Rokcet</option>
                        </Form.Select>
                    </Col>
                    <Button onClick={(e) => {
                        placeOrder(e)
                    }} varient={"success"}>Place Order</Button>
                </Row>
                {loader && <ApiLoader/>}
            </div>}

        </>
    );
}

export default CartList;
CartList.getLayout = function getLayout(page) {
    return (
        <CustomerLayout>
            {page}
        </CustomerLayout>
    )
}