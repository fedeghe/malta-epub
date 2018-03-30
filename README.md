---
[![npm version](https://badge.fury.io/js/malta-epub.svg)](http://badge.fury.io/js/malta-epub)
[![Dependencies](https://david-dm.org/fedeghe/malta-epub.svg)](https://david-dm.org/fedeghe/malta-epub)
[![npm downloads](https://img.shields.io/npm/dt/malta-epub.svg)](https://npmjs.org/package/malta-epub)
[![npm downloads](https://img.shields.io/npm/dm/malta-epub.svg)](https://npmjs.org/package/malta-epub)  
---  

This plugin can be used on: **.json**

This plugin expects the template to contain a json like the following:  
``` json
{
    "title": "Alice's Adventures in Wonderland",
    "author": "Lewis Carroll",
    "publisher": "Macmillan & Co.",
    "cover": "https://vignette.wikia.nocookie.net/villains/images/d/d3/How-to-draw-a-rhino-step-11_1_000000050163_5.jpg/revision/latest/scale-to-width-down/640?cb=20140901173830",
    "content": [
        {
            "title": "About the author",
            "author": "John Doe",
            "data": "epubcontent/chapter1.md"
        },
        {
            "title": "Down the Rabbit Hole",
            "data": "epubcontent/chapter2.md"
        },
        {
            "title": "The world outside the cradle what",
            "data": "epubcontent/chapter3.md"
        }
    ]
}
```
and this is exaclty as specified in the [npm epub-gen package][0] but for the data fileds which do not contain html but the path of md files relative to the template folder.

Sample usage:  
```
malta app/source/myebook.json public/docs -plugins=malta-epub
```
or in the .json file :
```
"app/source/myebook.json" : "public/docs -plugins=malta-epub"
```
or in a script : 
``` js
var Malta = require('malta');
Malta.get().check([
    'app/source/myebook.json',
    'public/docs',
    '-plugins=malta-epub',
    '-options=showPath:false,watchInterval:500,verbose:0'
     ]).start(function (o) {
        var s = this;
        console.log('name : ' + o.name)
        console.log("content : \n" + o.content);
        'plugin' in o && console.log("plugin : " + o.plugin);
        console.log('=========');
    });
```

[0]: https://www.npmjs.com/package/epub-gen