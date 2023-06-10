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

// Listen for messages
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.command === 'extractText') {
        const text = extractText(document.body);
        // get the url of the current tab
        const url = window.location.href;
        // get the title of the current tab
        const title = document.title;


        console.log(text); // or you can send this data back using sendResponse

        function img_find() {
            var imgs = document.getElementsByTagName("img");
            var imgSrcs = [];
        
            for (var i = 0; i < imgs.length; i++) {
                imgSrcs.push(imgs[i].src);
            }
        
            return imgSrcs;
        }

        const image_urls = img_find()

        // console.log(text); // or you can send this data back using sendResponse

        return fetch('http://localhost:8000/store', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // body: JSON.stringify({ raw_text: text, url: url, UID: request.UID, title: title, image_urls: image_urls })
            body: JSON.stringify({ raw_text: text, url: url, UID: request.UID, title: title, image_urls: image_urls })

        })
        .then(response => response.json())
        .then(data => {
            // Process the response from the POST request
            console.log(data);
        })
        .catch(error => {
            // Handle any errors
            console.error(error);
        });

}});

