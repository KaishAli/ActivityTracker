import { Box, Button, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <Box
      px={3}
      py={2}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{ background: '#0d4372' }}
    >
      <Typography fontWeight={700}>Activity Tracker
      </Typography>

      {user && (
        <Button
          color="inherit"
          onClick={() => {
            logout();
            navigate("/");
          }}
        >
          Logout
        </Button>
      )}
    </Box>
  );
};

export default Navbar;
