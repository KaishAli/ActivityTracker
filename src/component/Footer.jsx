import {
  Box,
  Container,
  Typography,
  IconButton,
  Divider,
  Stack
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";

const Footer = () => {
  return (
    <Box
      sx={{
        mt: "auto",
        background: (theme) =>
          theme.palette.mode === "dark"
            ? "linear-gradient(180deg,#020617,#000)"
            : "#f8fafc",
        borderTop: "1px solid",
        borderColor: "divider"
      }}
    >
      <Container maxWidth="lg">
        <Box py={4}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            {/* Brand */}
            <Typography fontWeight={700}>
              Activity<span style={{ color: "#38bdf8" }}>Tracker</span>
            </Typography>

            {/* Social Icons */}
            <Stack direction="row" spacing={1}>
              <IconButton
                href="https://github.com/"
                target="_blank"
              >
                <GitHubIcon />
              </IconButton>

              <IconButton
                href="https://linkedin.com/"
                target="_blank"
              >
                <LinkedInIcon />
              </IconButton>

              <IconButton
                href="https://twitter.com/"
                target="_blank"
              >
                <TwitterIcon />
              </IconButton>
            </Stack>
          </Stack>

          <Divider sx={{ my: 2 }} />

          {/* Copyright */}
          <Typography
            variant="body2"
            align="center"
            sx={{ opacity: 0.7 }}
          >
            © {new Date().getFullYear()} KaishDev. Built with React & Material UI.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
