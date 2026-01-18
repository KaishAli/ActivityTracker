export const getRepoStats = (repos) => {
  let totalStars = 0;
  let totalForks = 0;

  repos.forEach((repo) => {
    totalStars += repo.stargazers_count;
    totalForks += repo.forks_count;
  });

  return {
    totalStars,
    totalForks,
    activeRepos: repos.length
  };
};
