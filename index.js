
/**
 * @param {DOMDocument} document
 * @param {DOMNode} baseNode
 * @returns {DOMNode}
 */
function createSections(document, article) {

    let section;
    let nodes = [].slice.call(article.childNodes);

    nodes.forEach(function (node) {
        if (/^h[1-6]$/i.test(node.nodeName)) {
            section = document.createElement("section");
            article.appendChild(section);
        }
        section.appendChild(node);
    });

    return article;
}
