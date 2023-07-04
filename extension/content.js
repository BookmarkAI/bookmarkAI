const _BACKEND_URL = 'https://api.supermark.ai/';

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

function fetchPDFBytes(url) {
    return fetch(url)
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => new Uint8Array(arrayBuffer));
  }

// this is the listener for the consoleLog function, simply logs req.message
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.command === 'consoleLog') {
        console.log(request.message);
    }
});


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
                folder: request.folder
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
            function img_find() {
                var imgs = document.getElementsByTagName("img");
                var imgSrcs = [];

                for (var i = 0; i < imgs.length; i++) {
                    imgSrcs.push(imgs[i].src);
                }

                return imgSrcs;
            }

            const image_urls = img_find()

            const obj = {
                raw_text: text,
                url: url,
                UID: request.UID,
                title: title,
                image_urls: image_urls,
                timestamp: Math.round(timestamp / 1000),
                folder: request.folder
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


