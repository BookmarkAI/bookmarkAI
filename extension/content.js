// const _BACKEND_URL = 'https://api.supermark.ai/';
const _BACKEND_URL = 'http://localhost:8000';
let readabilityUrl = chrome.runtime.getURL("Readability.js");
let pageScriptUrl = chrome.runtime.getURL("pageScript.js");



function extractText(node) {
    if (['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(node.nodeName.toUpperCase())) {
        return '';
    }

    if (node.nodeType === Node.TEXT_NODE) {
        return node.nodeValue.trim();
    }

    let text = '';
    for (let child of node.childNodes) {
        text += ' ' + extractText(child);
    }

    return text.trim();
}



// this is the listener for the consoleLog function, simply logs req.message
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.command === 'consoleLog') {
        console.log(request.message);
    }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.command === "simplifyArticle") {
      // Code to simplify the webpage goes here...
    
      let script = document.createElement('script');
      script.src = readabilityUrl;
      
      // Function to call when the Readability library is loaded
      script.onload = function() {
          this.remove();
      
          // Create another script element for the new file
          let script2 = document.createElement('script');
          script2.src = pageScriptUrl;
      
          // Function to call when the new file is loaded
          script2.onload = function() {
              this.remove();
          };
      
          // Inject the new file into the page
          (document.head || document.documentElement).appendChild(script2);
      };
      
      // Inject the Readability library into the page
      (document.head || document.documentElement).appendChild(script);

        // Listen for messages from the page
        window.addEventListener("message", function(event) {
            // Only accept messages from the same frame
            if (event.source !== window) {
                return;
            }

            let message = event.data;

            // Only accept messages that we sent to ourselves
            if (typeof message !== "object" || message === null || message.type !== "FROM_PAGE") {
                return;
            }

            // // Clear the current document body
            // document.body.innerHTML = "";

            // // Set the body's innerHTML to the simplified content
            // document.body.innerHTML = message.text;

            // Send the readable content back to the extension
            sendResponse({content: message.text});

            // Send the readable content back to the extension
            console.log(message.text);
        });

        // Indicate that the response will be sent asynchronously
        return true;
    
    }
  });

function fetchPDFBytes(url) {
return fetch(url)
    .then(response => response.arrayBuffer())
    .then(arrayBuffer => new Uint8Array(arrayBuffer));
}

// the extension sends this post req to the backend: 
// { raw_text: str, url: str, UID: str, title: str, image_urls: str[] }
chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    if (request.command === 'extractText') {
        const text = extractText(document.body);
        // get the url of the current tab
        const url = window.location.href;
        // get the title of the current tab
        const title = document.title;
        const currentDate = new Date();
        const timestamp = currentDate.getTime();
        if (url.includes(".pdf")) {
            const pdfBytes = await fetchPDFBytes(url);
            const formattedPDFBytes = Array.from(pdfBytes)
            const title = url.split('/').pop().split('.').slice(0, -1).join('.');
            const obj = {
                pdf_bytes: formattedPDFBytes,
                url: url,
                title: title,
                timestamp: Math.round(timestamp / 1000),
                folder: request.folder,
                content: ''
            }

            return fetch(`${_BACKEND_URL}/storepdf`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-UID': request.UID,
                },
                body: JSON.stringify(obj)

            })
            .then(response => response.json())
            .then(data => {
                // Process the response from the POST request
                console.log("data");
                console.log(data);
            })
            .catch(error => {
                // Handle any errors
                console.error(error);
            });
        } else {

            
            let script = document.createElement('script');
            script.src = readabilityUrl;
            
            // Function to call when the Readability library is loaded
            script.onload = function() {
                this.remove();
            
                // Create another script element for the new file
                let script2 = document.createElement('script');
                script2.src = pageScriptUrl;
            
                // Function to call when the new file is loaded
                script2.onload = function() {
                    this.remove();
                };
            
                // Inject the new file into the page
                (document.head || document.documentElement).appendChild(script2);
            };
            
            // Inject the Readability library into the page


            (document.head || document.documentElement).appendChild(script);

            window.addEventListener("message", function(event) {
                // Only accept messages from the same frame
                if (event.source !== window) {
                    return;
                }
    
                let message = event.data;
    
                // Only accept messages that we sent to ourselves
                if (typeof message !== "object" || message === null || message.type !== "FROM_PAGE") {
                    return;
                }
    
                // // Clear the current document body
                // document.body.innerHTML = "";
    
                // // Set the body's innerHTML to the simplified content
                // document.body.innerHTML = message.text;
    
                // Send the readable content back to the extension
                sendResponse({content: message.text});
    
                // Send the readable content back to the extension
                console.log(message.text);

                const obj = {
                    raw_text: text,
                    url: url,
                    UID: request.UID,
                    title: title,
                    image_urls: [],
                    timestamp: Math.round(timestamp / 1000),
                    folder: request.folder,
                    content: message.text  // Save the simplified content
                }

                return fetch(`${_BACKEND_URL}/store`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-UID': request.UID,
                    },
                    body: JSON.stringify(obj)

                })
                    .then(response => response.json())
                    .then(data => {
                        // Process the response from the POST request
                        console.log("data");
                        console.log(data);
                    })
                    .catch(error => {
                        // Handle any errors
                        console.error(error);
                    });
            });
    
            // Indicate that the response will be sent asynchronously
            return true;  
        }
    }
});

// event listener to fetch folders and status of cururl AKA init
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.command === 'getFoldersAndCurUrlStatus') {
        const obj = { url: window.location.href };

        getInit(obj, request.uid, sendResponse);
        return true;
    
}}
);

// this calls the init endpoint
async function getInit(obj, uid, sendResponse) {

    return fetch(`${_BACKEND_URL}/info?url=${obj.url}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-UID': uid
        },
    })
    .then(response => response.json())
    .then(data => {
        // Process the response from the POST request
        sendResponse(data);
    })
    .catch(error => {
        // Handle any errors
        console.error(error);
    });
}


