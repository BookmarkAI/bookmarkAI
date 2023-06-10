document.getElementById('extractButton').addEventListener('click', async () => {
  var button = document.getElementById('extractButton');
  console.log("TEST2")
  button.classList.add('added');
  button.textContent = 'Added to Bookmarks!';
  uid = await getUID()
  // Send a message to the active tab
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    let activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, { "command": "extractText", "UID": uid });
  });
});

async function getCookies(domain) {
  try {
    const cookies = await chrome.cookies.getAll({ domain });
    return cookies
  } catch (error) {
    return `Unexpected error: ${error.message}`;
  }
}

async function getUID() {
  // reads in a list of json cookies
  var cookies = await getCookies('localhost')
  // if no cookies, show sign in button
  if (cookies.length == 0) {
    message.hidden = true;
    signin.hidden = false;
    return 'null'
  }
  // filter out the user cookie
  // consoleLog((cookies))
  checkUserCookie = (cookie) => {
    return cookie.name == 'userCookie'
  }
  user = JSON.parse(decodeURIComponent(cookies.filter(checkUserCookie)[0].value))
  // if user is signed out, show sign in button and hide message
  if (user.uid == null) {
    message.hidden = true;
    signin.hidden = false;
    return 'null'
  }
  return await user.uid
}

// you cant console.log from popup.js, so we have to send a message to content.js to console.log
function consoleLog(message) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    let activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, { "command": "consoleLog", 'message': message });
  });
}

async function setFrontend() {
  // reads in a list of json cookies
  var cookies = await getCookies('localhost')

  // if no cookies, show sign in button
  if (cookies.length == 0) {
    message.hidden = true;
    signin.hidden = false;
    return
  }
  // filter out the user cookie
  // consoleLog((cookies))
  checkUserCookie = (cookie) => {
    return cookie.name == 'userCookie'
  }
  user = JSON.parse(decodeURIComponent(cookies.filter(checkUserCookie)[0].value))

  // if user is signed out, show sign in button and hide message
  if (user.uid == null) {
    message.hidden = true;
    signin.hidden = false;
    return
  }

  // if we get here, the user is signed in
  signin.hidden = true;
  message.textContent = 'Hello, ' + user.displayName
  message.hidden = false;
  extractButton.hidden = false;
}

setFrontend()