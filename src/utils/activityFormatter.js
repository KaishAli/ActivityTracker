export const formatEvent = (event) => {
  const repo = event.repo?.name || "unknown repo";

  switch (event.type) {
    case "PushEvent":
      return `Pushed commits to ${repo}`;

    case "PullRequestEvent":
      return `${event.payload.action} pull request in ${repo}`;

    case "IssuesEvent":
      return `${event.payload.action} issue in ${repo}`;

    case "ForkEvent":
      return `Forked ${repo}`;

    case "CreateEvent":
      return `Created ${event.payload.ref_type} in ${repo}`;

    default:
      return `Activity in ${repo}`;
  }
};
