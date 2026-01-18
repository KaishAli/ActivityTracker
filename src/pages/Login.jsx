import {
  Box,
  Button,
  Container,
  Paper,
  Typography
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  localStorage.setItem('theme', 'dark');

  const handleGuestLogin = () => {
    login({
      name: "Guest Developer",
      email: "guest@dev.com",
      avatar: ""
    });

    navigate('/dashboard');
  };

  return (
    <Box display="flex" justifyContent="center">
      <Container maxWidth="sm">
        <Paper sx={{ p: 4, mt: 6, textAlign: "center" }}>
          <Typography variant="h5" fontWeight={700} mb={2}>
            Developer Login
          </Typography>

          <Typography sx={{ opacity: 0.7, mb: 3 }}>
            Welcome to activity tracker
          </Typography>

          <Button
            fullWidth
            size="large"
            variant="contained"
            onClick={handleGuestLogin}
          >
            Continue as Guest
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
