import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import RepoIcon from "@mui/icons-material/Source";
import ActivityIcon from "@mui/icons-material/Timeline";
import { NavLink } from "react-router-dom";

const drawerWidth = 240;

const navItems = [
  { label: "Dashboard", icon: <DashboardIcon />, to: "/dashboard" },
  { label: "Repositories", icon: <RepoIcon />, to: "/repos" },
  { label: "Activity", icon: <ActivityIcon />, to: "/activity" }
];

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          background: "rgba(2,6,23,0.9)",
          borderRight: "1px solid rgba(255,255,255,0.08)"
        }
      }}
    >
      <Box sx={{ p: 2, fontWeight: 800 }}>
        Activity<span style={{ color: "#38bdf8" }}>Tracker</span>
      </Box>

      <List>
        {navItems.map((item) => (
          <ListItemButton
            key={item.label}
            component={NavLink}
            to={item.to}
            sx={{
              "&.active": {
                background: "rgba(56,189,248,0.15)",
                borderLeft: "3px solid #38bdf8"
              }
            }}
          >
            <ListItemIcon sx={{ color: "#cbd5f5" }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
