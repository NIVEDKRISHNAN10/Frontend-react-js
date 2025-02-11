import React, { useState, useEffect } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Box,
  IconButton,
  Typography,

} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "@mui/icons-material"; // Arrow icons
import Logoimage from "./Logoimge"; // Ensure correct path

const drawerWidth = 260;

const Sidebar = () => {
  const [menuList, setMenuList] = useState([]);
  const [selectedPath, setSelectedPath] = useState("/admin/dashboard");
  const [openMenus, setOpenMenus] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
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

  const handleNavigation = (path) => {
    setSelectedPath(path);
    navigate(path);
  };

  const handleMenuToggle = (menuPath) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuPath]: !prev[menuPath],
    }));
  };

  // Toggle Sidebar Open/Collapse
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        open={isSidebarOpen}
        sx={{
          width: isSidebarOpen ? drawerWidth : 70,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: isSidebarOpen ? drawerWidth : 90,
            transition: "width 0.3s ease-in-out",
            boxSizing: "border-box",
            backgroundColor: "#021c6b",
            color: "#cdd3d4",
            overflowX: "hidden",
            paddingTop: 2,
          },
        }}
      >
        {/* Logo Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 2,
            height: "80px",
          }}
        >
          <Logoimage src="/images/logo.png" alt="Logo" size={isSidebarOpen ? 80 : 50} />
        </Box>

        {/* Toggle Button */}
        <IconButton
          onClick={toggleSidebar}
          sx={{
            color: "#fff",
            backgroundColor: "#1e293b",
            "&:hover": { backgroundColor: "#475569" },
            position: "absolute",
            right: -10,
            top: 20,
            zIndex: 1300,
          }}
        >
          {isSidebarOpen ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>

        {/* Menu List */}
        <List sx={{ marginTop: 4 }}>
          {Array.isArray(menuList) && menuList.length > 0 ? (
            menuList.map((menu) => (
              <React.Fragment key={menu.path}>
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
                    justifyContent: isSidebarOpen ? "initial" : "center",
                  }}
                >
                  <ListItemText
                    primary={menu.title}
                    sx={{ display: isSidebarOpen ? "block" : "none" }}
                  />
                </ListItemButton>

                {/* Render Child Menus */}
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
                      <ListItemText
                        primary={child.title}
                        sx={{ display: isSidebarOpen ? "block" : "none" }}
                      />
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
    </Box>
  );
};

export default Sidebar;
