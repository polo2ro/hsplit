'use strict';

const jsdom = require('jsdom');


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
            section = document.createElement('section');
            article.appendChild(section);
        }
        section.appendChild(node);
    });

    return article;
}


/**
 * hsplit a html document from a string
 *
 * @param {String} html
 * @param {String} rootNodeName optional root nodeName, default is article
 * @return {Promise}
 */
function hsplitDocument(html, rootNodeName) {
    if (!rootNodeName) {
        rootNodeName = 'article';
    }

    return new Promise((resolve, reject) => {

        jsdom.env(
            html,
            [],
            (err, window) => {
                if (err) {
                    return reject(err);
                }
                let document = window.document;
                let article = document.getElementsByTagName(rootNodeName)[0];
                createSections(window.document, article);
            }
        );

    });
}



exports = module.exports = {
    document: hsplitDocument
};
