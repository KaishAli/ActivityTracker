const BASE_URL = "https://api.github.com";

export const getUserProfile = async (username) => {
  const res = await fetch(`${BASE_URL}/users/${username}`);
  if (!res.ok) throw new Error("User not found");
  return res.json();
};

export const getUserRepos = async (username) => {
  const res = await fetch(
    `${BASE_URL}/users/${username}/repos?sort=updated`
  );
  if (!res.ok) throw new Error("Repos not found");
  return res.json();
};
export const getUserEvents = async (username) => {
  const res = await fetch(
    `https://api.github.com/users/${username}/events?per_page=20`
  );
  if (!res.ok) throw new Error("Events not found");
  return res.json();
};
