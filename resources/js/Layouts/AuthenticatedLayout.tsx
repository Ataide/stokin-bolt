import { useState, PropsWithChildren, ReactNode } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link } from "@inertiajs/react";
import { User } from "@/types";
import ResponsiveDrawer from "@/Components/ResponsiveDrawer";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";

const drawerWidth = 240;

const settings = ["Profile", "Account", "Dashboard", "Logout"];

export default function Authenticated({
    user,
    title,
    children,
}: PropsWithChildren<{ user: User; title?: string }>) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                <Link href={route("dashboard")} as="div">
                    <ListItem disablePadding>
                        <ListItemButton selected={false}>
                            <ListItemIcon>
                                <InboxIcon
                                    color={
                                        route().current("dashboard")
                                            ? "primary"
                                            : "inherit"
                                    }
                                />
                            </ListItemIcon>
                            <ListItemText
                                primary={"Dashboard"}
                                sx={{ color: "" }}
                            />
                        </ListItemButton>
                    </ListItem>
                </Link>
                <ListItem disablePadding>
                    <ListItemButton selected={false}>
                        <ListItemIcon>
                            <InboxIcon
                                color={
                                    route().current("cadastros")
                                        ? "primary"
                                        : "inherit"
                                }
                            />
                        </ListItemIcon>
                        <ListItemText primary={"Cadastro"} sx={{ color: "" }} />
                    </ListItemButton>
                </ListItem>
            </List>
        </div>
    );

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: "none" } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        {title}
                    </Typography>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton
                                onClick={handleOpenUserMenu}
                                sx={{ p: 0 }}
                            >
                                <Avatar>{user?.name?.charAt(0)}</Avatar>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: "45px" }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <Link href={route("profile.edit")} as="div">
                                <MenuItem onClick={handleCloseUserMenu}>
                                    Profile
                                </MenuItem>
                            </Link>

                            <Link href={route("logout")} method="post" as="div">
                                <MenuItem onClick={handleCloseUserMenu}>
                                    Logout
                                </MenuItem>
                            </Link>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: "block", sm: "none" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: "none", sm: "block" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                }}
            >
                <Toolbar />
                {children}
            </Box>
        </Box>
    );

    // return (

    // <div className="min-h-screen bg-gray-100">
    //     <nav className="bg-white border-b border-gray-100">
    //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    //             <div className="flex justify-between h-16">
    //                 <div className="flex">
    //                     <div className="shrink-0 flex items-center">
    //                         <Link href="/">
    //                             <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
    //                         </Link>
    //                     </div>

    //                     <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
    //                         <NavLink href={route('dashboard')} active={route().current('dashboard')}>
    //                             Dashboard
    //                         </NavLink>
    //                     </div>
    //                 </div>

    //                 <div className="hidden sm:flex sm:items-center sm:ml-6">
    //                     <div className="ml-3 relative">
    //                         <Dropdown>
    //                             <Dropdown.Trigger>
    //                                 <span className="inline-flex rounded-md">
    //                                     <button
    //                                         type="button"
    //                                         className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
    //                                     >
    //                                         {user.name}

    //                                         <svg
    //                                             className="ml-2 -mr-0.5 h-4 w-4"
    //                                             xmlns="http://www.w3.org/2000/svg"
    //                                             viewBox="0 0 20 20"
    //                                             fill="currentColor"
    //                                         >
    //                                             <path
    //                                                 fillRule="evenodd"
    //                                                 d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
    //                                                 clipRule="evenodd"
    //                                             />
    //                                         </svg>
    //                                     </button>
    //                                 </span>
    //                             </Dropdown.Trigger>

    //                             <Dropdown.Content>
    //                                 <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
    //                                 <Dropdown.Link href={route('logout')} method="post" as="button">
    //                                     Log Out
    //                                 </Dropdown.Link>
    //                             </Dropdown.Content>
    //                         </Dropdown>
    //                     </div>
    //                 </div>

    //                 <div className="-mr-2 flex items-center sm:hidden">
    //                     <button
    //                         onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
    //                         className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
    //                     >
    //                         <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
    //                             <path
    //                                 className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
    //                                 strokeLinecap="round"
    //                                 strokeLinejoin="round"
    //                                 strokeWidth="2"
    //                                 d="M4 6h16M4 12h16M4 18h16"
    //                             />
    //                             <path
    //                                 className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
    //                                 strokeLinecap="round"
    //                                 strokeLinejoin="round"
    //                                 strokeWidth="2"
    //                                 d="M6 18L18 6M6 6l12 12"
    //                             />
    //                         </svg>
    //                     </button>
    //                 </div>
    //             </div>
    //         </div>

    //         <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
    //             <div className="pt-2 pb-3 space-y-1">
    //                 <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
    //                     Dashboard
    //                 </ResponsiveNavLink>
    //             </div>

    //             <div className="pt-4 pb-1 border-t border-gray-200">
    //                 <div className="px-4">
    //                     <div className="font-medium text-base text-gray-800">
    //                         {user.name}
    //                     </div>
    //                     <div className="font-medium text-sm text-gray-500">{user.email}</div>
    //                 </div>

    //                 <div className="mt-3 space-y-1">
    //                     <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
    //                     <ResponsiveNavLink method="post" href={route('logout')} as="button">
    //                         Log Out
    //                     </ResponsiveNavLink>
    //                 </div>
    //             </div>
    //         </div>
    //     </nav>

    //     {header && (
    //         <header className="bg-white shadow">
    //             <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
    //         </header>
    //     )}

    //     <main>{children}</main>
    // </div>
    // );
}
