import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Appbar from "./appbar";
import Head from "next/head";
import Sidebar from "./sidebar";
import {useEffect} from "react";
import {useRouter} from "next/router";


const drawerWidth = 240;
export default function Layout(Props) {
    const { window, children } = Props;
    const router = useRouter();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isAuthenticate, setAuthenticate] = React.useState(false);


    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };


    useEffect(()=>{
        const token = localStorage.getItem('jwtAuth');
        if (!token){
            setAuthenticate(false)
            router.push('/login')
        }
        else{
            setAuthenticate(true);
        }

    },[router.events])


    if (!isAuthenticate){
        return null;
    }

    return (
        <>

                <Box sx={{ display: 'flex' }}>
                    <Appbar handleDrawerToggle={handleDrawerToggle}/>
                    <Sidebar window={window} mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle}/>
                    <Box
                        component="main"
                        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
                    >
                        <Toolbar />
                        {children}
                    </Box>
                </Box>

        </>
    );
}

