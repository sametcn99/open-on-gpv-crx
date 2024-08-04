/**
 * Callback function that is called when the browser action is clicked.
 * Gets the GitHub username from the current tab URL, constructs a GitHub
 * Profile Viewer URL with that username, and opens that URL in a new tab.
 * Logs messages to console for status and any errors.
 */
chrome.action.onClicked.addListener(async (tab) => {
  let username;
  const url = new URL(tab.url);
  const hostname = url.hostname;
  const path = url.pathname.split("/");
  const acceptedHostnames = [
    "github.com",
    "www.github.com",
    "gist.github.com",
    "www.gist.github.com",
    "gitlab.com",
    "www.gitlab.com",
  ];

  if (!acceptedHostnames.includes(hostname)) {
    console.log("Not a GitHub URL");
    return;
  }

  if (path.length > 1) {
    username = path[1];
  }

  if (!username) {
    console.log("Could not get GitHub username from URL");
    return;
  }

  const gpvURL = `https://githubprofileviewer.com/p/${username}`;
  await chrome.tabs.create({ url: gpvURL });
  console.log("Redirected to GPV");
});
