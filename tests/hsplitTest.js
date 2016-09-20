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

    it('get multiples nodes', (done) => {
        let html = '<article><h1>t1</h1><p>l1</p><p>l2</p></article>';
        hsplit.document(html).then(article => {
            let sections = article.getElementsByTagName('section');
            assert.equal(1, sections.length);
            assert.equal(2, sections[0].getElementsByTagName('p').length);
            done();
        })
        .catch(done);

    });


    it('accept missing article', (done) => {
        let html = '<h2>section 1 title</h2>section 1 content';
        hsplit.document(html).then(article => {
            assert.equal(1, article.getElementsByTagName('section').length);
            done();
        })
        .catch(done);

    });


    it('put all content in sections', (done) => {
        let html = 'section 1 content';
        hsplit.document(html).then(article => {
            assert.equal(1, article.getElementsByTagName('section').length);
            done();
        })
        .catch(done);
    });



    it('multiples nodes in appropriates sections', (done) => {
        let html = '<article><p>l0</p><h1>t1</h1><p>l11</p><p>l12</p><h1>t2</h1><p>l21</p><p>l22</p></article>';
        hsplit.document(html).then(article => {
            let sections = article.getElementsByTagName('section');
            assert.equal(3, sections.length);

            let p0 = sections[0].getElementsByTagName('p');
            let p1 = sections[1].getElementsByTagName('p');
            let p2 = sections[2].getElementsByTagName('p');

            assert.equal(1, p0.length);
            assert.equal(2, p1.length);
            assert.equal(2, p2.length);

            assert.equal('l0', p0[0].textContent);
            assert.equal('l11', p1[0].textContent);
            assert.equal('l12', p1[1].textContent);
            assert.equal('l21', p2[0].textContent);
            assert.equal('l22', p2[1].textContent);

            done();
        })
        .catch(done);

    });
});
