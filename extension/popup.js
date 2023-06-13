document.getElementById('extractButton').addEventListener('click', async () => {
  // if button is already added, do nothing
  if (document.getElementById('extractButton').classList.contains('added')) {
    return
  }
  var button = document.getElementById('extractButton');
  button.classList.add('added');
  button.textContent = 'Added to Bookmarks!';
  uid = await getUID()
  // Send a message to the active tab
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    let activeTab = tabs[0];
    let selectBtn_text = document.getElementById('sBtn-text');
    chrome.tabs.sendMessage(activeTab.id, { "command": "extractText", "UID": uid, "folder": selectBtn_text.textContent});
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
  const cookies = await getCookies('localhost');

  const user_cookies = cookies
    .filter(cookie => cookie.name === 'userCookie')
    .map(cookie => JSON.parse(decodeURIComponent(cookie.value)))
    .filter(cookie => cookie.uid !== null);

    
    if (user_cookies.length === 0) {
      message.hidden = true;
      signin.hidden = false;
      return 'null'
    }
    const user = user_cookies[0];
    
  // if user is signed out, show sign in button and hide message
  if (user.uid == null) {
    message.hidden = true;
    signin.hidden = false;
    return 'null'
  }
  return await user.uid
}

async function getCurFolder() {
  const cookies = await getCookies('localhost');

  const folder_cookies = cookies
    .filter(cookie => cookie.name === 'current_folder')
    .map(cookie => cookie.value)
    .filter(cookie => cookie.value !== null);

    
    if (folder_cookies.length === 0) {
      return 'Unsorted'
    }
    const folder = folder_cookies[0];

  return await folder
}

// you cant console.log from popup.js, so we have to send a message to content.js to console.log
function consoleLog(message) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    let activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, { "command": "consoleLog", 'message': message });
  });
}

async function setUser() {
  // reads in a list of json cookies
  const cookies = await getCookies('localhost');

  const user_cookies = cookies
    .filter(cookie => cookie.name === 'userCookie')
    .map(cookie => JSON.parse(decodeURIComponent(cookie.value)))
    .filter(cookie => cookie.uid !== null);

  if (user_cookies.length === 0) {
    return false
  }
  const user = user_cookies[0];
  if (user.uid == null) {
    return false
  }
  return user
}

function log_current_folder_cookie(folder) {
  chrome.cookies.set({
    url: "http://localhost:3000",
    name: "current_folder",
    value: folder,

  })
  consoleLog("current folder cookie set")
  consoleLog(folder)
  consoleLog("current folder cookie set")

}

async function setFoldersAndCurUrl(user) {
  // first we want to grab the uid and the current url
  // then we want to send a post request to the backend to get the folders and a status of whether the current url is in the user's bookmarks
  // then we want to update the popup.html with the folders and the status
  // const obj = {
  //   uid: ,
  //   : 
  // }
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    let activeTab = tabs[0];
    consoleLog("cururl")
    consoleLog(window.location.href)
    consoleLog("cururl")
    chrome.tabs.sendMessage(activeTab.id, { "command": "getFoldersAndCurUrlStatus", 'uid': user.uid }, async function (response) {
      updatePopupGivenFolders(response);
    }
    );
  }
  );
}

async function updatePopupGivenFolders(response) {
  consoleLog(response)

  const curUrlStatus = response.bookmarked;
  if (curUrlStatus == true) {
    extractButton.classList.add('added');
    extractButton.textContent = 'Added to Bookmarks!';
  }
  // response is a list of folders and a boolean of whether the current url is in the user's bookmarks
  // we want to update the popup.html with the folders and the status
  const cur_folder = await getCurFolder()
  const options = response.folders.filter(folder => folder !== cur_folder);
  const options_element = document.getElementById('options');
  const selectBtn_text = document.getElementById('sBtn-text');

  selectBtn_text.textContent = cur_folder;
//   const svgCode = `
// <svg role="img" viewBox="0 0 512 512">
//   <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/>
// </svg>`;
// // add svg as child of select button
// selectBtn.insertAdjacentHTML('beforeend', svgCode);

  for (let i = 0; i < options.length; i++) {      
    const folder = options[i];
    const option = document.createElement('li');
    option.classList.add("option");
    option.classList.add("text-black");
    option.textContent = folder;
    option.value = String(i);

    // add an event listener to the option that calls log_current_folder_cookie(folder)


    options_element.appendChild(option);
  }

  dropdown_logic()
}

function dropdown_logic() {
  
  const optionMenu = document.querySelector(".select-menu")

  const selectBtn_text = document.getElementById('sBtn-text');
  const selectBtn = document.getElementById('select-btn');
  const options_element_array = optionMenu.querySelectorAll(".option")

  selectBtn.addEventListener("click", () =>
    {optionMenu.classList.toggle("active")
    body.classList.toggle("active")}
  );


  options_element_array.forEach((option) => {

    option.addEventListener("click", () => {
      // consoleLog("option/")
      // consoleLog(option.textContent)
      // consoleLog("option/")

      // when an option is clicked, we want to set the button text to the option text
      // then replace the option text with the button text, then log the current folder cookie
      const temp = selectBtn_text.textContent;
      selectBtn_text.textContent = option.textContent;
      
      option.textContent = temp;

      log_current_folder_cookie(selectBtn_text.textContent)
      // remove current_folder cookie

      optionMenu.classList.toggle("active")
      body.classList.toggle("active")


    });

  });

}



async function init() {

  const user = await setUser()

  if (user != false) {
    container.style.justifyContent = "start";
    signin.hidden = true;
    message.textContent = 'Hello, ' + user.displayName
    message.hidden = false;
    extractButton.hidden = false;


    prompt.hidden = false;
    select_menu.hidden = false;
    setFoldersAndCurUrl(user)

  } else {
    // if user is signed out
    signin.hidden = false;
    message.hidden = true;
    extractButton.hidden = true;
    container.style.justifyContent = "center";

  }
}

// async function test() {
//   var temp = await getCurFolder()
//   consoleLog("folder|")
//   consoleLog(temp)
// }
// test()
init()
