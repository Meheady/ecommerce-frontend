import React, {useState} from 'react';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {Col, Row, Container, ListGroup} from "react-bootstrap";
import {asset} from "../../../helpers/helperMethods";
import Form from 'react-bootstrap/Form';
import Link from "next/Link";
import {productAddToCar} from "../../../service/customer/cartService";
import ApiLoader from "../../../layout/apiLoader";
import {toast} from "react-toastify";
import Header, {fetchCartTotal} from "../../../layout/website/header";
function ProductDetails({product}) {

    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState('');
    const [color, setColor] = useState('');
    const [loader, setLoader] = useState(false);

    const incrementQuantity = () => {
        setQuantity(quantity + 1);
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleAddToCart = (e) => {
      e?.preventDefault();

      if (size === "" || color === ""){
          toast.info('Select color and size');
          return false;
      }

      const payload = {
          product_name: product.product_name,
          product_code: product.product_code,
          product_image: product.product_image,
          size: size,
          color: color,
          quantity: quantity,
          unit_price: product.save_amount,
      };

      setLoader(true);

    productAddToCar(payload)
        .then((res)=>{
            toast.success(res.message);
        })
        .catch((err)=>{
            toast.error(err.message);
        })
        .finally(()=>setLoader(false))
    }

    return (
        <>
            <Container>
                <Row className="py-3">
                    <Link className="btn btn-outline-success mb-2"  href="/products">Back To shop</Link>
                    <Col md={4}>
                        <Card>
                            <Card.Body>
                                <img src={asset(product.product_image)} style={{width:'100%'}} alt=""/>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={8}>
                        <Card>
                            <Card.Body>
                                <form>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>{product.product_name}</ListGroup.Item>
                                        <ListGroup.Item>
                                            <del>{`TK ${product.regular_price}`}</del><br/>
                                            <span style={{color:'green', fontWeight:'bolder'}}>{`TK ${product.save_amount} save (${product.discount})`}</span>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col md={3}>
                                                    <Form.Select required={true} onChange={(e)=>{
                                                        setColor(e.target.value);
                                                    }} aria-label="Select Color">
                                                        <option disabled selected >Select Color</option>
                                                        {product.color && product.color.map((item, index)=>(
                                                            <option value={item}>{item}</option>
                                                        ))}
                                                    </Form.Select>
                                                </Col>
                                                <Col md={3}>
                                                    <Form.Select required={true} onChange={(e)=>{
                                                        setSize(e.target.value);
                                                    }} aria-label="Select Size">
                                                        <option disabled selected>Select Size</option>
                                                        {product.size && product.size.map((item, index)=>(
                                                            <option value={item}>{item}</option>
                                                        ))}
                                                    </Form.Select>
                                                </Col>
                                                <Col md={3}>
                                                    <Form.Group>
                                                        <div className="d-flex align-items-center">
                                                            <Button variant="outline-danger" onClick={decrementQuantity}>-</Button>
                                                            <Form.Control disabled={true} type="number" value={quantity} readOnly />
                                                            <Button variant="outline-success" onClick={incrementQuantity}>+</Button>
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <Button type={"submit"} onClick={handleAddToCart} className="mt-3" variant={"success"}>Add To Cart</Button>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </form>

                            </Card.Body>
                        </Card>
                    </Col>

                    <h6 className="mt-3 justify-content-center">{product.short_desc}</h6> <hr/>


                    <p>{product.long_desc}</p>
                </Row>
            </Container>
            {loader && <ApiLoader/>}
        </>
    );
}

export default ProductDetails;