import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import {
  Paper,
  Typography,
  Box,
  Stack
} from "@mui/material";

const COLORS = [
  "#38bdf8",
  "#6366f1",
  "#22c55e",
  "#f97316",
  "#e11d48",
  "#a855f7",
  "#14b8a6"
];

const LanguageChart = ({ repos }) => {
  const languageCount = {};

  repos.forEach((repo) => {
    if (repo.language) {
      languageCount[repo.language] =
        (languageCount[repo.language] || 0) + 1;
    }
  });

  const data = Object.entries(languageCount).map(
    ([name, value]) => ({ name, value })
  );

  const total = data.reduce((acc, cur) => acc + cur.value, 0);

  if (data.length === 0) return null;

  return (
    <Paper
      sx={{
        p: 3,
        height: 360,
        borderRadius: 3,
        background:
          "linear-gradient(180deg, rgba(30,41,59,0.9), rgba(15,23,42,0.9))",
        boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
      }}
    >
      {/* Header */}
      <Box mb={2}>
        <Typography fontWeight={700}>
          Language Usage
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.7 }}>
          Distribution across repositories
        </Typography>
      </Box>

      {/* Chart */}
      <Box sx={{ height: 200 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={65}
              outerRadius={95}
              paddingAngle={3}
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            {/* Tooltip */}
            <Tooltip
              contentStyle={{
                background: "#020617",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 8
              }}
              itemStyle={{ color: "#e5e7eb" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </Box>

      {/* Center Info */}
      <Box
        sx={{
          position: "relative",
          top: "-120px",
          textAlign: "center"
        }}
      >
        <Typography variant="h5" fontWeight={800}>
          {total}
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.7 }}>
          Repositories
        </Typography>
      </Box>

      {/* Legend */}
      <Stack spacing={1} mt={-6}>
        {data.slice(0, 5).map((item, index) => (
          <Box
            key={item.name}
            display="flex"
            justifyContent="space-between"
          >
            <Box display="flex" alignItems="center" gap={1}>
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  backgroundColor:
                    COLORS[index % COLORS.length]
                }}
              />
              <Typography variant="body2">
                {item.name}
              </Typography>
            </Box>

            <Typography
              variant="body2"
              sx={{ opacity: 0.7 }}
            >
              {item.value}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Paper>
  );
};

export default LanguageChart;
