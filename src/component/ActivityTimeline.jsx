import {
  Paper,
  Typography,
  Box,
  Divider
} from "@mui/material";
import { formatEvent } from "../utils/activityFormatter";

const ActivityTimeline = ({ events }) => {
  if (!events || events.length === 0) {
    return (
      <Paper sx={{ p: 3 }}>
        <Typography>No recent activity found</Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" fontWeight={700} mb={2}>
        Recent Activity
      </Typography>

      {events.map((event, index) => (
        <Box key={event.id}>
          <Typography fontWeight={500}>
            {formatEvent(event)}
          </Typography>
          <Typography
            variant="body2"
            sx={{ opacity: 0.6 }}
          >
            {new Date(event.created_at).toLocaleString()}
          </Typography>

          {index !== events.length - 1 && (
            <Divider sx={{ my: 2 }} />
          )}
        </Box>
      ))}
    </Paper>
  );
};

export default ActivityTimeline;
