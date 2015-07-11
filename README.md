[![Build Status](https://travis-ci.org/dicksont/loop-guard.svg?branch=master)](https://travis-ci.org/dicksont/loop-guard)
[![npm version](https://badge.fury.io/js/loop-guard.svg)](http://badge.fury.io/js/loop-guard)

Loop Guard guards against loops during tree/graph traversal.


## Usage

```javascript

var createGuard = require('loop-guard');

var guard = createGuard();

function visitNode(node) {
  guard.visit(node);

  for (var i=0; i < node.children.length; i++) {
    var child = node.children[i];

    if (!guard.isVisiting(child)) {
      visitNode(child);
    }
  }

  guard.leave(node);
}

```

## License
The MIT License (MIT)

Copyright (c) 2015 Dickson Tam

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
