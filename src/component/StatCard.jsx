import { Paper, Typography } from "@mui/material";

const StatBox = ({ label, value }) => (
  <Paper sx={{ p: 2, textAlign: "center" }}>
    <Typography variant="body2" sx={{ opacity: 0.7 }}>
      {label}
    </Typography>
    <Typography variant="h6" fontWeight={700}>
      {value}
    </Typography>
  </Paper>
);

export default StatBox;
