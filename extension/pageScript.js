// Create a clone of the document
let docClone = document.cloneNode(true);

// Use the Readability library to parse the clone
let article = new Readability(docClone).parse();
console.log(article)

// Send the readable content back to the content script
window.postMessage({
    type: "FROM_PAGE",
    text: article.content
}, "*");