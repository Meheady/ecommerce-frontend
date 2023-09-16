import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {Col, Row, Container} from "react-bootstrap";
import {toast} from "react-toastify";
import {useEffect} from "react";
import {getAllProduct} from "../../../service/website/productService";
import {asset} from "../../../helpers/helperMethods";
import {useRouter} from "next/router";

function Product(props) {

    const [products, setProducts] = useState([]);
    const [loader, setLoader] = useState(false);
    const router = useRouter();

    const fetchProducts = () => {
        setLoader(true)
        getAllProduct()
            .then((res)=>{
                if (res && res.data && res.data.length > 0){
                    setProducts(res.data);
                }
                else{
                    toast.info('No product found');
                    setProducts([])
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

    const goProductDetails = (id, slug) => {
        router.push(`/products/details/${id}/${slug}`)
    }



    return (
        <>
            <Container>
                <Row className="py-5">
                    {products && products.map((item, index)=>(
                        <Col md={3} className="mb-2">
                            <Card key={index} className="h-100">
                                <Card.Img variant="top" src={asset(item.product_image)} />
                                <Card.Body>
                                    <Card.Title>{item.product_name.substring(0, 40)}...</Card.Title>
                                    <Card.Text>
                                        <del>{`TK ${item.regular_price}`}</del><br/>

                                        <span style={{color:'green', fontWeight:'bolder'}}>{`TK ${item.save_amount} save (${item.discount})`}</span>
                                    </Card.Text>
                                    <div className="d-flex">
                                        <Button className="me-2" variant="outline-primary">Quick View</Button>
                                        <Button onClick={()=>{
                                            goProductDetails(item.id, item.product_slug)
                                        }} variant="outline-info">Details</Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    )) }

                </Row>
            </Container>
        </>
    );
}

export default Product;