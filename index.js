'use strict';

const jsdom = require('jsdom');


/**
 * Move content of article into sections, do not move empty content
 * @param {DOMDocument} document
 * @param {DOMNode} article
 * @returns {DOMNode}
 */
function createSections(document, article) {

    let section = null;
    let nodes = [].slice.call(article.childNodes);

    nodes.forEach(function (node) {
        if (/^h[1-6]$/i.test(node.nodeName)) {
            section = document.createElement('section');
            article.appendChild(section);
        }

        if (!node.textContent.trim()) {
            return;
        }

        if (null === section) {
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

                if (undefined === article) {
                    return resolve(null);
                }

                resolve(createSections(window.document, article));
            }
        );

    });
}



exports = module.exports = {
    document: hsplitDocument
};
