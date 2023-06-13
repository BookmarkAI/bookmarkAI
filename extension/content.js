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


// the extension sends this post req to the backend: 
// { raw_text: str, url: str, UID: str, title: str, image_urls: str[] }
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.command === 'extractText') {
        const text = extractText(document.body);
        // get the url of the current tab
        const url = window.location.href;
        // get the title of the current tab
        const title = document.title;

        function img_find() {
            var imgs = document.getElementsByTagName("img");
            var imgSrcs = [];

            for (var i = 0; i < imgs.length; i++) {
                imgSrcs.push(imgs[i].src);
            }

            return imgSrcs;
        }

        const image_urls = img_find()
        const currentDate = new Date();
        const timestamp = currentDate.getTime();

        // console.log(text); // or you can send this data back using sendResponse
        const obj = {
            raw_text: text,
            url: url,
            UID: request.UID,
            title: title,
            image_urls: image_urls,
            timestamp: Math.round(timestamp / 1000)
        }
        console.log(obj);

        return fetch('http://localhost:8000/store', {
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
});


async function getInit(obj, uid, sendResponse) {

    return fetch('http://127.0.0.1:8000/init', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-UID': uid
        },
        body: JSON.stringify(obj)

    })
    .then(response => response.json())
    .then(data => {
        // Process the response from the POST request
        console.log("RES BACK FROM SERVER");
        console.log("Data", data);
        sendResponse(data);
    })
    .catch(error => {
        // Handle any errors
        console.error(error);
    });
}


// event listener to fetch folders and status of cururl
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.command === 'getFoldersAndCurUrlStatus') {
        const obj = { url: window.location.href };

        getInit(obj, request.uid, sendResponse);
        return true;
    
}}
);

// required endpoints:
// /store POST {'raw_text': stting, 'url': string, 'UID': string, 'title': string, 'image_urls': string[], 'timestamp': int} -> {'status': bool}
// /init POST {'url': string, 'UID': string} -> {'bookmarked': bool, 'folders': string[]}
