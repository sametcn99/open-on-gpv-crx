/**
* Callback function that is called when the browser action is clicked.
* Gets the GitHub username from the current tab URL, constructs a GitHub
* Profile Viewer URL with that username, and opens that URL in a new tab.
* Logs messages to console for status and any errors.
*/
chrome.action.onClicked.addListener(async (tab) => {

    let username;

    // Check if URL is a normal GitHub URL
    if (isGitHubURL(tab.url)) {
        username = getGitHubUsername(tab.url);
    }
    // Check if URL is a Gist URL
    else if (isGistURL(tab.url)) {
        username = getGistUsername(tab.url);
    } else if (isGitLabURL(tab.url)) {
        username = getGitLabUsername(tab.url);
    }

    if (!username) {
        console.log("Could not get GitHub username from URL");
        return;
    }

    const gpvURL = `https://githubprofileviewer.com/${username}`;
    await chrome.tabs.create({ url: gpvURL });
    console.log("Redirected to GPV");

});


/**
 * Checks if the given URL is a GitHub URL.
 * Returns true if the URL matches the GitHub URL pattern, false otherwise.
 */
function isGitHubURL(url) {
    return /^https?:\/\/github\.com\/.+/.test(url);
}

/**
 * Checks if the given URL is a Gist URL.
 * Returns true if the URL matches the Gist URL pattern, false otherwise.
*/
function isGistURL(url) {
    return /^https?:\/\/gist\.github\.com\/.+/.test(url) || /^[a-fA-F0-9]{32}$/.test(url);
}

/**
* Extracts the GitHub username from a normal GitHub URL.
* Matches a GitHub URL pattern like github.com/username and returns
* the username or undefined if no match.
*/
function getGitHubUsername(url) {
    const matches = url.match(/github\.com\/([^/]+)\/?/);
    return matches?.[1];
}

/**
* Extracts the GitHub username from a Gist URL.
* Matches a Gist URL pattern and returns the username.
*/
function getGistUsername(url) {
    const matches = url.match(/gist\.github\.com\/([^/]+)\//);
    return matches?.[1];
}

function isGitLabURL(url) {
    return /^https?:\/\/gitlab\.com\/.+/.test(url);
}

function getGitLabUsername(url) {
    const matches = url.match(/gitlab\.com\/([^/]+)\/?/);
    return matches?.[1];
}