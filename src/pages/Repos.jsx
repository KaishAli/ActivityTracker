import { useEffect, useMemo, useState } from "react";
import {
  Box,
  TextField,
  MenuItem,
  Typography,
  Paper
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { getUserRepos } from "../services/githubApi";

const Repos = () => {
  const [repos, setRepos] = useState([]);
  const [search, setSearch] = useState("");
  const [language, setLanguage] = useState("all");
  const [loading, setLoading] = useState(true);

  const username = "octocat"; 

  useEffect(() => {
    const fetchRepos = async () => {
      setLoading(true);
      const data = await getUserRepos(username);
      setRepos(data);
      setLoading(false);
    };
    fetchRepos();
  }, []);

  // 🔍 Search + Filter logic
  const filteredRepos = useMemo(() => {
    return repos.filter((repo) => {
      const matchesSearch = repo.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesLanguage =
        language === "all" || repo.language === language;

      return matchesSearch && matchesLanguage;
    });
  }, [repos, search, language]);

  const languages = useMemo(() => {
    return [
      "all",
      ...new Set(repos.map((r) => r.language).filter(Boolean))
    ];
  }, [repos]);

  // 📊 DataGrid columns
  const columns = [
    {
      field: "name",
      headerName: "Repository",
      flex: 1
    },
    {
      field: "language",
      headerName: "Language",
      width: 150
    },
    {
      field: "stargazers_count",
      headerName: "⭐ Stars",
      width: 120
    },
    {
      field: "forks_count",
      headerName: "🍴 Forks",
      width: 120
    },
    {
      field: "updated_at",
      headerName: "Last Updated",
      flex: 1,
      valueFormatter: (params) =>
        new Date(params.value).toLocaleDateString()
    }
  ];

  return (
    <Box>
      <Typography variant="h5" fontWeight={800} mb={2}>
        Repositories
      </Typography>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Box display="flex" gap={2}>
          <TextField
            label="Search repo"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <TextField
            select
            label="Language"
            size="small"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            {languages.map((lang) => (
              <MenuItem key={lang} value={lang}>
                {lang}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </Paper>

      {/* Table */}
      <Paper sx={{ height: 520 }}>
        <DataGrid
          rows={filteredRepos}
          columns={columns}
          getRowId={(row) => row.id}
          loading={loading}
          pageSizeOptions={[5, 10, 20]}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } }
          }}
          disableRowSelectionOnClick
        />
      </Paper>
    </Box>
  );
};

export default Repos;
