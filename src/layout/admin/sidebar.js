import React from 'react';
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import treeItems from "./menuItem";
import Link from "next/Link";

const drawerWidth = 240;
function Sidebar(props) {
    const {window,mobileOpen,handleDrawerToggle} = props;


    const getTreeItemsFromData = (treeItem) => {
        return treeItem.map(treeItemData => {
            let children = undefined;
            if (treeItemData.children && treeItemData.children.length > 0) {
                children = getTreeItemsFromData(treeItemData.children);
            }
            if(treeItemData.path){
                return (
                    <Link href={treeItemData.path}>
                        <TreeItem
                            key={treeItemData.id}
                            nodeId={treeItemData.id.toString()}
                            label={treeItemData.name}
                            children={children}
                        />
                    </Link>
                );
            }
            return (
                <TreeItem
                    key={treeItemData.id}
                    nodeId={treeItemData.id.toString()}
                    label={treeItemData.name}
                    children={children}
                />
            );
        });
    };

    const drawer = (
        <div>
            <TreeView
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
            >
                {getTreeItemsFromData(treeItems)}
            </TreeView>
        </div>
    );
    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <>
            <Box
                component="nav"
                sx={{ width: { md: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
        </>
    );
}

export default Sidebar;