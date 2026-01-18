const BASE_URL = "https://api.github.com";

const headers = {
  Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
};

export const getUserProfile = async (username) => {
  const res = await fetch(`${BASE_URL}/users/${username}`, { headers });
  if (!res.ok) throw new Error("User not found");
  return res.json();
};

export const getUserRepos = async (username) => {
  const res = await fetch(
    `${BASE_URL}/users/${username}/repos?sort=updated`,
    { headers }
  );
  if (!res.ok) throw new Error("Repos not found");
  return res.json();
};

export const getUserEvents = async (username) => {
  const res = await fetch(
    `${BASE_URL}/users/${username}/events?per_page=20`,
    { headers }
  );
  if (!res.ok) throw new Error("Events not found");
  return res.json();
};
