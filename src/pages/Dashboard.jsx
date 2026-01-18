import ActivityTimeline from "../component/ActivityTimeline";
import { getUserEvents } from "../services/githubApi";
import LanguageChart from "../component/LanguageChart";
import { getRepoStats } from "../utils/productivity";

import { useCallback, useState } from "react";
import {
    Box,
    Typography,
    Grid,
    Paper,
    TextField,
    Button,
    Avatar
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import {
    getUserProfile,
    getUserRepos
} from "../services/githubApi";

const Dashboard = () => {
    const { user } = useAuth();

    const [username, setUsername] = useState("KaishAli");
    const [profile, setProfile] = useState(null);
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const stats = repos.length ? getRepoStats(repos) : null;
    const [events, setEvents] = useState([]);

    const fetchGitHubData = useCallback(async () => {
        try {
            setLoading(true);
            setError("");

            const userData = await getUserProfile(username);
            const repoData = await getUserRepos(username);
            const eventData = await getUserEvents(username);

            setProfile(userData);
            setRepos(repoData);
            setEvents(eventData);
        } catch (err) {
            setError("Failed to load GitHub data");
        } finally {
            setLoading(false);
        }
    }, [username]);


    return (
        <Box p={3}>
            <Typography variant="h5" fontWeight={700} mb={1}>
                Welcome, {user?.name}
            </Typography>

            <Typography sx={{ opacity: 0.7 }} mb={3}>
                Developer Productivity Dashboard
            </Typography>

            <Box display="flex" gap={2} mb={4}>
                <TextField
                    label="GitHub Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    size="small"
                />
                <Button
                    variant="contained"
                    onClick={fetchGitHubData}
                    disabled={loading}
                >
                    Load
                </Button>
            </Box>

            {error && (
                <Typography color="error" mb={2}>
                    {error}
                </Typography>
            )}

            {profile && (
                <Paper sx={{ p: 3, mb: 4 }}>
                    <Box display="flex" alignItems="center" gap={2}>
                        <Avatar
                            src={profile.avatar_url}
                            sx={{ width: 64, height: 64 }}
                        />
                        <Box>
                            <Typography variant="h6" fontWeight={700}>
                                {profile.name || profile.login}
                            </Typography>
                            <Typography sx={{ opacity: 0.7 }}>
                                @{profile.login}
                            </Typography>
                        </Box>
                    </Box>
                </Paper>
            )}

            {/* Stats */}
            {profile && (
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Paper sx={{ p: 2 }}>
                            <Typography variant="body2">Repositories</Typography>
                            <Typography variant="h6" fontWeight={700}>
                                {profile.public_repos}
                            </Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <Paper sx={{ p: 2 }}>
                            <Typography variant="body2">Followers</Typography>
                            <Typography variant="h6" fontWeight={700}>
                                {profile.followers}
                            </Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <Paper sx={{ p: 2 }}>
                            <Typography variant="body2">Following</Typography>
                            <Typography variant="h6" fontWeight={700}>
                                {profile.following}
                            </Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <Paper sx={{ p: 2 }}>
                            <Typography variant="body2">Public Gists</Typography>
                            <Typography variant="h6" fontWeight={700}>
                                {profile.public_gists}
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>

            )}
            {stats && (
                <Grid container spacing={2} mt={3}>
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 2 }}>
                            <Typography variant="body2">Total Stars</Typography>
                            <Typography variant="h6" fontWeight={700}>
                                ⭐ {stats.totalStars}
                            </Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 2 }}>
                            <Typography variant="body2">Total Forks</Typography>
                            <Typography variant="h6" fontWeight={700}>
                                🍴 {stats.totalForks}
                            </Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 2 }}>
                            <Typography variant="body2">Active Repos</Typography>
                            <Typography variant="h6" fontWeight={700}>
                                {stats.activeRepos}
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            )}
            <Grid container spacing={3} mt={3}>
                <Grid item xs={12} md={6} sx={{ width: '100%' }}>
                    <LanguageChart repos={repos} />
                </Grid>
            </Grid>
            <Box mt={5}>
                <ActivityTimeline events={events} />
            </Box>
            {repos.length > 0 && (
                <Box mt={6}>
                    <Typography variant="h6" fontWeight={800} mb={3}>
                        Recent Repositories
                    </Typography>

                    <Grid container spacing={3}>
                        {repos.slice(0, 5).map((repo) => (
                            <Grid item xs={12} md={6} key={repo.id}>
                                <Paper
                                    sx={{
                                        p: 2.5,
                                        height: "100%",
                                        borderRadius: 3,
                                        cursor: "pointer",
                                        transition: "all 0.3s ease",
                                        "&:hover": {
                                            transform: "translateY(-4px)",
                                            boxShadow: "0 12px 30px rgba(0,0,0,0.25)"
                                        }
                                    }}
                                    onClick={() => window.open(repo.html_url, "_blank")}
                                >
                                    {/* Repo Name */}
                                    <Typography fontWeight={700} mb={0.5}>
                                        {repo.name}
                                    </Typography>

                                    {/* Description */}
                                    {repo.description && (
                                        <Typography
                                            variant="body2"
                                            sx={{ opacity: 0.7, mb: 1 }}
                                        >
                                            {repo.description}
                                        </Typography>
                                    )}

                                    {/* Footer */}
                                    <Box
                                        display="flex"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        mt={1.5}
                                    >
                                        {/* Language */}
                                        {repo.language && (
                                            <Box
                                                sx={{
                                                    px: 1.2,
                                                    py: 0.3,
                                                    borderRadius: 2,
                                                    fontSize: 12,
                                                    background: "rgba(56,189,248,0.15)",
                                                    color: "#38bdf8",
                                                    fontWeight: 500
                                                }}
                                            >
                                                {repo.language}
                                            </Box>
                                        )}

                                        {/* Stats */}
                                        <Box display="flex" gap={2}>
                                            <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                                ⭐ {repo.stargazers_count}
                                            </Typography>
                                            <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                                🍴 {repo.forks_count}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            )}

        </Box>
    );
};

export default Dashboard;
