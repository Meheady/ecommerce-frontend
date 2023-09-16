import React from 'react';
import {useEffect, useRef, useState} from "react";
import {useRouter} from "next/router";
import {toast} from "react-toastify";
import {Button, ButtonGroup, Card, CardContent, CardHeader, Grid} from "@mui/material";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {storeProduct, updateProduct} from "../../../service/admin/productService";
import ApiLoader from "../../../layout/apiLoader";
import {asset} from "../../../helpers/helperMethods";

function CaddProduct({editData}) {

    console.log(editData)

    const [formData, setFormData] = useState({});
    const [fileData, setFileData] = useState({});
    const [isPublish, setIsPublish] = useState(false);
    const formRef = useRef(null);
    const router = useRouter();
    const [loader, setLoader] = useState(false);

    const handleFormData = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setFormData((prevState)=>{
            return {
                ...prevState,
                [name]:value
            }
        })
    }
    const handleFile = (event) => {
        const name = event.target.name;
        const file = event.target.files[0];

        setFileData((prevState)=>{
            return {
                ...prevState,
                [name]:file
            }
        })
    }

    const handleIsPublish = (event) => {
        setIsPublish(event.target.checked);
    }



    const handleReset = () => {
        formRef.current.reset()
        setFormData({})
    }

    useEffect(()=>{

        if (editData){
            setFormData(editData);

            if (editData.status == '0'){
                setIsPublish(false)
            }
            else {
                setIsPublish(true);
            }
        }

    },[editData])

    const handleSubmit = (event) => {
        event?.preventDefault();

        const confirm  = window.confirm("Are you sure ?")
        if (!confirm) return false;
        setLoader(true);
        const payload = {
            id: editData && editData.id,
            productName: formData.product_name,
            color: formData.color,
            size: formData.size,
            price: formData.price,
            qty: formData.qty,
            discount: formData.discount,
            productImage: fileData.product_image,
            shortDesc: formData.short_desc,
            longDesc: formData.long_desc,
            status: isPublish ? '1':'0'
        }

        if (!editData){
            storeProduct(payload)
                .then((res)=>{
                    toast.success(res.message);
                })
                .catch((err)=>{
                    toast.error(err.message);
                    handleReset()
                })
                .finally(()=>setLoader(false))
        }
        else{
            updateProduct(payload)
                .then((res)=>{
                    router.push('/admin/product/list-product')
                    toast.success(res.message);
                })
                .catch((err)=>{

                    toast.error(err.message);
                })
                .finally(()=>setLoader(false))
        }

    }


    return (
        <>
            <Card>
                <CardHeader
                    title= {editData?"Updated Product":"Add Product"}
                />
                <CardContent>
                    <form ref={formRef} onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item md={2}>
                                <TextField fullWidth={true}  type={"text"} value={formData.product_name ? formData.product_name:''} onChange={handleFormData} required name="product_name" label="Product name" variant="outlined" />
                            </Grid>
                            <Grid item md={2}>
                                <TextField fullWidth={true} type={"text"} required value={formData.color ? formData.color:''} onChange={handleFormData} name="color" label="Product color" placeholder="separate by comma(,)" variant="outlined" />
                            </Grid>
                            <Grid item md={2}>
                                <TextField fullWidth={true} type={"text"} required value={formData.size ? formData.size:''} onChange={handleFormData} name="size" label="Product size" placeholder="separate by comma(,) " variant="outlined" />
                            </Grid>
                            <Grid item md={2}>
                                <TextField fullWidth={true} type={"text"} required value={formData.price ? formData.price:''} onChange={handleFormData} name="price" label="Product Price" variant="outlined" />
                            </Grid>
                            <Grid item md={2}>
                                <TextField fullWidth={true}  type={"text"} required value={formData.discount ? formData.discount:''} onChange={handleFormData} name="discount" label="Discount Price" variant="outlined" />
                            </Grid>
                            <Grid item md={2}>
                                <TextField fullWidth={true}  type={"text"} required value={formData.qty ? formData.qty:''} onChange={handleFormData} name="qty" label="Quantity" variant="outlined" />
                            </Grid>
                            <Grid item md={6}>
                                <TextField fullWidth={true}  type={"text"} required value={formData.short_desc ? formData.short_desc:''} onChange={handleFormData} name="short_desc" label="Short Description" variant="outlined" />
                            </Grid>
                            <Grid item md={6}>
                                <TextField fullWidth={true}  type={"text"} required value={formData.long_desc ? formData.long_desc:''} onChange={handleFormData} name="long_desc" label="Long Description" variant="outlined" />
                            </Grid>
                            <Grid container sx={{mt: 1}}>
                                <Grid item md={2}>
                                    <FormControlLabel control={<Checkbox checked={isPublish} onChange={handleIsPublish} name="status" />} label="Is Publish" />
                                </Grid>
                            </Grid>
                            <Grid item md={2}>
                                <TextField fullWidth={true} required={editData ? false:true} type={"file"} onChange={handleFile} focused={true} name="product_image" label="Product Photo" variant="outlined" />
                            </Grid>
                            {editData && <Grid item md={2}>
                                <img src={asset(formData.product_image)} width={100} height={100} alt=""/>
                            </Grid>}

                        </Grid>
                        <Grid container sx={{mt: 1}}>
                            <Grid item md={2}>
                                <ButtonGroup>
                                    <Button type={"submit"} sx={{mr:2}} variant={"contained"} color={"success"}>Submit</Button>
                                    <Button onClick={handleReset} type={"reset"} variant={"contained"} color={"info"}>Reset</Button>
                                </ButtonGroup>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
            {loader && <ApiLoader/>}
        </>
    );
}

export default CaddProduct;