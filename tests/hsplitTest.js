/*global describe: false, it: false */

'use strict';

const assert = require('assert');
const hsplit = require('../index');

describe('hsplit', () => {

    it('split text in 2', (done) => {
        let html = '<article>main<h2>section 2 title</h2>section 2 content</article>';
        hsplit.document(html).then(article => {
            assert.equal(2, article.getElementsByTagName('section').length);
            done();
        })
        .catch(done);

    });


    it('split text in 3 with prefix content', (done) => {
        let html = '<article>main<h2>section 2 title</h2>section 2 content<h2>section 3 title</h2>section 3 content</article>';
        hsplit.document(html).then(article => {
            assert.equal(3, article.getElementsByTagName('section').length);
            done();
        })
        .catch(done);

    });


    it('ignore empty prefix', (done) => {
        let html = '<article> <h2>section 2 title</h2>section 2 content<h2>section 3 title</h2>section 3 content</article>';
        hsplit.document(html).then(article => {
            assert.equal(2, article.getElementsByTagName('section').length);
            done();
        })
        .catch(done);

    });

    it('gest multiples nodes', (done) => {
        let html = '<article><h1>t1</h1><p>l1</p><p>l2</p></article>';
        hsplit.document(html).then(article => {
            let sections = article.getElementsByTagName('section');
            assert.equal(1, sections.length);
            assert.equal(2, sections[0].getElementsByTagName('p').length);
            done();
        })
        .catch(done);

    });


});
