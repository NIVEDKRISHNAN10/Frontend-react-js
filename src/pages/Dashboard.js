import React, { useState, useEffect } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const Dashboard = () => {
  const [menuList, setMenuList] = useState([]);
  const [selectedPath, setSelectedPath] = useState("/admin/dashboard");
  const [openMenus, setOpenMenus] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state
  const navigate = useNavigate();

  useEffect(() => {
    const storedMenu = localStorage.getItem("menu");

    if (storedMenu) {
      try {
        const parsedMenu = JSON.parse(storedMenu);
        if (parsedMenu.length > 0 && parsedMenu[0].items) {
          setMenuList(parsedMenu[0].items);
        } else {
          console.error("Menu structure is incorrect");
        }
      } catch (error) {
        console.error("Error parsing menu:", error);
      }
    }
  }, []);

  // Handle navigation
  const handleNavigation = (path) => {
    setSelectedPath(path);
    navigate(path);
  };

  // Toggle submenu visibility
  const handleMenuToggle = (menuPath) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuPath]: !prev[menuPath],
    }));
  };

  // Toggle Sidebar Open/Close
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Toggle Button */}
      <IconButton
        onClick={toggleSidebar}
        sx={{
          position: "absolute",
          top: 20,
          left: isSidebarOpen ? drawerWidth + 10 : 10,
          zIndex: 1300,
          color: "#fff",
          backgroundColor: "#1e293b",
          "&:hover": { backgroundColor: "#475569" },
        }}
      >
        {/* <MenuIcon /> */}
      </IconButton>

      {/* Sidebar */}
      <Drawer
        variant="persistent"
        open={isSidebarOpen}
        sx={{
          width: isSidebarOpen ? drawerWidth : 0,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: isSidebarOpen ? drawerWidth : 0,
            transition: "width 0.3s ease-in-out",
            boxSizing: "border-box",
            backgroundColor: "#1e293b",
            color: "#ffffff",
            overflowX: "hidden",
            paddingTop:20,
          },
        }}
      >
        <Box sx={{ padding: 2, textAlign: "center" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "#fff" }}>
            Admin Dashboard
          </Typography>
        </Box>
        <List>
          {Array.isArray(menuList) && menuList.length > 0 ? (
            menuList.map((menu) => (
              <React.Fragment key={menu.path}>
                {/* Parent Menu Item */}
                <ListItemButton
                  selected={selectedPath === menu.path}
                  onClick={() =>
                    menu.children && menu.children.length > 0
                      ? handleMenuToggle(menu.path)
                      : handleNavigation(menu.path)
                  }
                  sx={{
                    backgroundColor:
                      selectedPath === menu.path ? "#334155" : "transparent",
                    "&:hover": { backgroundColor: "#475569" },
                  }}
                >
                  <ListItemText primary={menu.title} />
                </ListItemButton>

                {/* Render Child Menus only when the parent is expanded */}
                {openMenus[menu.path] &&
                  menu.children?.map((child) => (
                    <ListItemButton
                      key={child.path}
                      sx={{
                        pl: 4,
                        backgroundColor:
                          selectedPath === child.path ? "#334155" : "transparent",
                        "&:hover": { backgroundColor: "#475569" },
                      }}
                      selected={selectedPath === child.path}
                      onClick={() => handleNavigation(child.path)}
                    >
                      <ListItemText primary={child.title} />
                    </ListItemButton>
                  ))}
              </React.Fragment>
            ))
          ) : (
            <Typography sx={{ padding: 2, color: "#ffffff" }}>
              No menu items available
            </Typography>
          )}
        </List>
      </Drawer>

      {/* Content Area */}
      <Box
        sx={{
          flexGrow: 1,
          p: 3,
          marginLeft: isSidebarOpen ? `${drawerWidth}px` : "0",
          transition: "margin-left 0.3s ease-in-out",
        }}
      >
        <Typography variant="h4">Dashboard Content</Typography>
        <Typography variant="body1">
          Displaying content for: {selectedPath}
        </Typography>
      </Box>
    </Box>
  );
};

export default Dashboard;
