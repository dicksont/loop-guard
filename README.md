Loop Guard guards against loops during tree/graph traversal.


## Usage

```javascript

var createGuard = require('loop-guard');

var guard = createGuard();

function visitNode(node) {
  guard.visit(node);

  for (var i=0; i < node.children.length; i++) {
    var child = node.children[i];

    if (guard.canVisit(child)) {
      visitNode(child);
    }
  }

  guard.leave(node);
}

```
