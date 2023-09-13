import React, {useState} from 'react';
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import Box from '@mui/material/Box';
import Link from "@mui/material/Link";
import {handleLogout} from "../config/axiosWrapper";
import {useRouter} from "next/router";
import {toast} from "react-toastify";

function Appbar(props) {
    const {handleDrawerToggle} = props;
    const router = useRouter();
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const logout = () => {
        handleLogout()
            .then((response)=>{
                if (response != null){
                    toast.success(response.message);
                    localStorage.clear();
                    sessionStorage.clear();
                    router.push('/login')
                }
            })
            .catch((error)=>{
                localStorage.clear();
                sessionStorage.clear();
                router.push('/login')
                toast.error(error.message)
            })
    }

    return (
        <>
            <AppBar
                position="fixed"
                style={{boxShadow:'unset'}}
            >
                <Toolbar>
                    <IconButton
                        color="default"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" style={{width:'100%'}}>
                        School Management System
                    </Typography>

                    <Box sx={{ flexGrow: 0}}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Link href="/">Profile</Link>
                            </MenuItem>
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Link href="/">Change Password</Link>
                            </MenuItem>
                            <MenuItem onClick={logout}>
                                Logout
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    );
}

export default Appbar;