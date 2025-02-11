import React from "react";
import { Box, Grid, Card, CardContent, Typography } from "@mui/material";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  const widgetData = [
    { title: "Total Users", value: 250 },
    { title: "Total Sales", value: "$12,340" },
    { title: "Orders Processed", value: 145 },
    { title: "Active Subscriptions", value: 85 },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />

      <Box
        sx={{
          flexGrow: 1,
          p: 3,
          marginLeft: "70px",
          transition: "margin-left 0.3s ease-in-out",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>

        {/* Widgets Section */}
        <Grid container spacing={3}>
          {widgetData.map((widget, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ backgroundColor: "#1e293b", color: "#fff" }}>
                <CardContent>
                  <Typography variant="h6">{widget.title}</Typography>
                  <Typography variant="h4">{widget.value}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
