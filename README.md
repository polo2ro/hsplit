# hsplit

split html content using the headers tags

This library accept html input and give back a DOM node for the "article" element.
If the article element does not exists, il will be created.

The content of article is splitted into sections using the html headers as separator.

This has been created to index html documents into the lunr search engine, because
each header can have it's own url, the splitted elements can be indexed as separeted elements.

see [hexo-generator-lunr](https://github.com/polo2ro/hexo-generator-lunr).


## Install

```bash
npm install --save hsplit
```

## Usage example

```javascript
const hsplit = require('hsplit');

hsplit.document('<h2>Title</h2><p>Content</p>')
.then(article => {

});

```
